import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { FanoutPublishRequest, FanoutPublishResponse } from "../api/v1/generated/messageQueue";
import messageService from "../services/message.service";
import logger from "../utils/logger";
import GRPCError from "../utils/grpcError";

class FanoutPublishController {

    async publish(
        call: ServerUnaryCall<FanoutPublishRequest, FanoutPublishResponse>,
        callback: sendUnaryData<FanoutPublishResponse>
    ) {
        const { exchangeName, message } = call.request;

        if (!exchangeName) {
            const error = new GRPCError(3, 'Missing required field: exchangeName');
            callback(error, null);
            return;
        }

        try {
            const channel = await messageService.createChannel();
            
            // Declare the fanout exchange
            await channel.assertExchange(exchangeName, 'fanout', { durable: false });

            // Publish the message to the fanout exchange
            channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
            logger.debug(`Published message to exchange ${exchangeName}`);

            // Respond with success
            const response: FanoutPublishResponse = { success: true, message: 'Message published successfully' };
            callback(null, response);

        } catch (error: any) {
            logger.error(`Failed to publish message: ${error.message}`);
            const grpcError = new GRPCError(13, `Failed to publish message: ${error.message}`);
            callback(grpcError, null);
        }
    }
}

export default new FanoutPublishController();
