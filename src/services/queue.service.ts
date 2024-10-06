import { Channel } from 'amqplib';
import rabbitmqConnectionService from "./rabbitmqConnection.service";
import logger from '../utils/logger';

class QueueService {

    private channel: Channel | null = null;

    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        try {
            const connection = await rabbitmqConnectionService.getInstance();
            this.channel = await connection.createChannel();
        } catch (error: any) {
            logger.error(`Failed to initialize QueueService: ${error.message}`);
            throw error;
        }
    }

    public async publishMessage(queue: string, message: string): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized');
        }

        try {
            await this.channel.assertQueue(queue, { durable: true });

            this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
            logger.debug(`Published message to queue ${queue}`);
        } catch (error: any) {
            logger.error(`Failed to publish message to queue ${queue}: ${error.message}`);
            throw error;
        }
    }
}

export default new QueueService();