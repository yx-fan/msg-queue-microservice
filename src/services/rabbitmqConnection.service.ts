import amqp, { Connection, Channel } from 'amqplib';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

class RabbitMQConnection {
    private connection: Connection | null = null;

    public async getInstance(): Promise<Connection> {
        // Return the connection if it already exists
        if (this.connection) {
            return this.connection;
        }

        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URL as string, {
                heartbeat: 30, // Set the heartbeat interval to 30 seconds
            });
            
            // Listen for connection close events
            connection.on('close', async () => {
                logger.warn('RabbitMQ connection closed. Reconnecting...');
                this.connection = null; // Reset the connection
                await this.getInstance(); // Reconnect
            });

            connection.on('error', (error) => {
                logger.error(`RabbitMQ connection error: ${error.message}`);
                this.connection = null; // Reset the connection
            });

            this.connection = connection;
            logger.info('Connected to RabbitMQ');
            return connection;
        } catch (error: any) {
            logger.error(`Failed to connect to RabbitMQ: ${error.message}`);
            // Wait for 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
            return this.getInstance();  // Retry
        }
    }

    public async createChannel(): Promise<Channel> {
        try {
            const connection = await this.getInstance();
            return connection.createChannel();
        } catch (error: any) {
            logger.error(`Failed to create channel: ${error.message}`);
            throw error;
        }
    }
}

export default new RabbitMQConnection();
