import dotenv from 'dotenv';
import createApp from './src/app';
import logger from './src/utils/logger';
import * as grpc from '@grpc/grpc-js';
import getServer from './src/grpcServer';

dotenv.config();

async function startServer() {
    try {
        logger.info('>>> Creating the app <<<');
        const app = await createApp();
        if (!app) {
            throw new Error('Failed to create app');
        }

        logger.info('>>> Starting the server <<<');
        const PORT = process.env.PORT || 3011;
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

        logger.info('>>> Starting gRPC server <<<');
        const server = getServer();
        const GRPC_PORT = process.env.GRPC_PORT || 50053;
        server.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
            logger.info(`gRPC server is running on port ${GRPC_PORT}`);
        });

    } catch (error: any) {
        logger.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }

}

startServer();
