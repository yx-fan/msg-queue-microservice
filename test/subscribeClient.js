// subscribeClient.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 加载 proto 文件
const PROTO_PATH = path.join(__dirname, '../src/api/v1/messageQueue.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const messageQueuePackage = grpc.loadPackageDefinition(packageDefinition).messageQueue;

// 创建 gRPC 客户端
const client = new messageQueuePackage.MessagingService('localhost:50053', grpc.credentials.createInsecure());

// 订阅消息
const call = client.Subscribe({ topic: 'testTopic' });

call.on('data', (message) => {
    console.log('Received message:', message);
});

call.on('error', (error) => {
    console.error('Error receiving message:', error);
});

call.on('end', () => {
    console.log('Subscription ended');
});
