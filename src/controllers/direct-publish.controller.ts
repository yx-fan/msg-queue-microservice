import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { PublishRequest, PublishResponse } from '../api/v1/generated/messageQueue';
import QueueService from '../services/queue.service';
import logger from '../utils/logger';

class PublishController {
    async publishMessage(
        call: ServerUnaryCall<PublishRequest, PublishResponse>,
        callback: sendUnaryData<PublishResponse>
    ) {

        const { topic, message } = call.request;

        if (!topic || !message) {
            logger.error('Missing required fields: topic and message');
            callback({
                code: 3, // Invalid argument
                message: 'Missing required fields: topic and message'
            });
            return;
        }

        try {
            const messageJson = JSON.stringify(message);

            await QueueService.publishMessage(topic, messageJson);

            const response = PublishResponse.create({
                success: true,
                message: 'Message published successfully'
            });

            callback(null, response);
        } catch (error: any) {
            logger.error(`Failed to publish message to queue ${topic}: ${error.message}`);
            callback({
                code: 13, // Internal error
                message: error.message
            });
        }
    }
}

export default new PublishController();
