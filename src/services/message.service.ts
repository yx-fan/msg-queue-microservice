import { Channel } from 'amqplib';
import rabbitmqConnectionService from './rabbitmqConnection.service';
import logger from '../utils/logger';

class MessageService {

    // Create a channel
    public async createChannel(): Promise<Channel> {
        try {
            const connection = await rabbitmqConnectionService.getInstance();
            const channel = await connection.createChannel();
            return channel;
        } catch (error: any) {
            logger.error(`Failed to create channel: ${error.message}`);
            throw error;
        }
    }

    // Assert a queue
    public async assertQueue(channel: Channel, topic: string): Promise<void> {
        try {
            await channel.assertQueue(topic, { durable: true });
            logger.info(`Queue ${topic} asserted successfully`);
        } catch (error: any) {
            logger.error(`Failed to assert queue ${topic}: ${error.message}`);
            throw error;
        }
    }

    // Consume messages from a queue
    public async consumeMessages( channel: Channel, topic: string, onMessage: (msg: any) => void ): Promise<void> {
        try {
            await channel.consume(
                topic,
                (msg) => {
                    if (msg) {
                        try {
                            // Use the callback to process the message
                            onMessage(msg);
    
                            // Acknowledge the message
                            channel.ack(msg);
                            logger.debug(`Message acknowledged from queue ${topic}`);
                        } catch (processingError: any) {
                            logger.error(`Error processing message: ${processingError.message}`);
                        }
                    }
                },
                { noAck: false } // Ensure that messages are not lost
            );
            logger.debug(`Started consuming messages from queue ${topic}`);
        } catch (error: any) {
            logger.error(`Failed to consume messages from queue ${topic}: ${error.message}`);
            throw error;
        }
    }

    // Close a channel
    public closeChannel(channel: Channel): void {
        if (channel) {
            channel.close();
            logger.info(`Channel closed`);
        }
    }
}

export default new MessageService();
