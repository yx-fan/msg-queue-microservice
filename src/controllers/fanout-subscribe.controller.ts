import { ServerWritableStream } from "@grpc/grpc-js";
import { FanoutSubscribeRequest, Message } from "../api/v1/generated/messageQueue";
import messageService from "../services/message.service";
import logger from "../utils/logger";
import GRPCError from "../utils/grpcError";

class FanoutSubscribeController {

    async subscribe(
        // Use the ServerWritableStream type from the grpc package
        call: ServerWritableStream<FanoutSubscribeRequest, Message>
    ) {
        const { exchangeName } = call.request;

        if (!exchangeName) {
            const error = new GRPCError(3, 'Missing required field: exchangeName');
            call.destroy(error);
            return;
        }

        try {
            const channel = await messageService.createChannel();

            // Declare the fanout exchange
            await channel.assertExchange(exchangeName, 'fanout', { durable: false });

            // Declare a queue with a unique name for each subscriber and bind it to the exchange
            const { queue } = await channel.assertQueue('', { exclusive: true });
            await channel.bindQueue(queue, exchangeName, '');

            logger.debug(`Subscribed to exchange ${exchangeName} with queue ${queue}`);

            // Register a callback to consume messages from the queue
            await messageService.consumeMessages(channel, queue, (message) => {
                if (message) {
                    const messageContent = message.content.toString();
                    const sendMessage: Message = Message.fromJSON(JSON.parse(messageContent));
                    
                    call.write(sendMessage);
                }
            });

            call.on('error', async (error) => {
                logger.error(`gRPC connection error: ${error.message}`);
                // Ensure to close the channel to release the exclusive queue
                await channel.close();
                logger.debug(`Closed RabbitMQ channel due to gRPC error.`);
            });

            call.on('cancelled', async () => {
                await channel.close();
                logger.debug(`Unsubscribed from exchange ${exchangeName} with queue ${queue}`);
            });

        } catch (error: any) {
            logger.error(`Failed to subscribe to exchange: ${error.message}`);
            const grpcError = new GRPCError(13, `Failed to subscribe to exchange: ${error.message}`);
            call.destroy(grpcError);
        }
    }
}

export default new FanoutSubscribeController();
