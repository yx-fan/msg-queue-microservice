import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { ReflectionService } from '@grpc/reflection';
import logger from './utils/logger';
import PublishController from './controllers/direct-publish.controller';
import SubscribeController from './controllers/direct-subscribe.controller';
import FanoutPublishController from './controllers/fanout-publish.controller';
import FanoutSubscribeController from './controllers/fanout-subscribe.controller';

// Get the path to the proto file
const PROTO_PATH = path.join(__dirname, './api/v1/messageQueue.proto');

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// Load the package definition
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;

// Get Messaging services from the package
const messageQueuePackage = grpcObject.messageQueue;

// Create a gRPC server
function getServer(): grpc.Server {
    try {
        const server = new grpc.Server();

        // Add the MessagingService (Point-to-Point) to the server
        server.addService(messageQueuePackage.MessagingService.service, {
            Publish: PublishController.publishMessage.bind(PublishController),
            Subscribe: SubscribeController.subscribe.bind(SubscribeController)
        });

        // Add the FanoutMessagingService (Fanout) to the server
        server.addService(messageQueuePackage.FanoutMessagingService.service, {
            FanoutPublish: FanoutPublishController.publish.bind(FanoutPublishController),
            FanoutSubscribe: FanoutSubscribeController.subscribe.bind(FanoutSubscribeController)
        });

        // Add the reflection service to the server
        const reflection = new ReflectionService(packageDefinition);
        reflection.addToServer(server);

        return server;
    } catch (error: any) {
        logger.error(`Failed to create gRPC server: ${error.message}`);
        throw error;
    }
}

export default getServer;
