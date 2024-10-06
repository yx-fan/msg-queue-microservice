// publishClient.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 加载 proto 文件
const PROTO_PATH = path.join(__dirname, '../src/api/v1/messageQueue.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const messageQueuePackage = grpc.loadPackageDefinition(packageDefinition).messageQueue;

// 创建 gRPC 客户端
const client = new messageQueuePackage.MessagingService('localhost:50053', grpc.credentials.createInsecure());

// 发送消息
const message = {
    id: '2',
    body: 'Hello from client 1!',
    topic: 'testTopic',
    timestamp: Date.now()
};

client.Publish({ topic: 'testTopic', message }, (error, response) => {
    if (error) {
        console.error('Error publishing message:', error);
    } else {
        console.log('Publish response:', response);
    }
});
