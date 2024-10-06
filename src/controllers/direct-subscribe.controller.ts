import { ServerWritableStream } from "@grpc/grpc-js";
import { SubscribeRequest, Message } from "../api/v1/generated/messageQueue";
import messageService from "../services/message.service";
import logger from "../utils/logger";
import GRPCError from "../utils/grpcError";

class SubscribeController {

    async subscribe(
        call: ServerWritableStream<SubscribeRequest, Message>
    ) {
        const { topic } = call.request;

        if (!topic) {
            const error = new GRPCError(3, 'Missing required field: topic');
            call.destroy(error);
            return;
        }

        try {
            const channel = await messageService.createChannel();
            await messageService.assertQueue(channel, topic);

            channel.prefetch(1);

            logger.debug(`Subscribed to queue ${topic}`);

            // Register a callback to consume messages
            await messageService.consumeMessages(channel, topic, (message) => {
                if (message) {
                    const messageContent = message.content.toString();
                    const sendMessage: Message = Message.fromJSON(JSON.parse(messageContent));
    
                    // Send the message to the client
                    call.write(sendMessage);
                }
            });

            call.on('cancelled', () => {
                channel.close();
                logger.debug(`Unsubscribed from queue ${topic}`);
            });

        } catch (error: any) {
            logger.error(`Failed to subscribe to queue ${topic}: ${error.message}`);
            const grpcError = new GRPCError(13, `Failed to subscribe: ${error.message}`);
            call.destroy(grpcError);
        }
    }
}

export default new SubscribeController();
