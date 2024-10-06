const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 加载 proto 文件
const PROTO_PATH = path.join(__dirname, '../src/api/v1/messageQueue.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const messageQueuePackage = grpc.loadPackageDefinition(packageDefinition).messageQueue;

// 创建 gRPC 客户端
const client = new messageQueuePackage.FanoutMessagingService('localhost:50053', grpc.credentials.createInsecure());

// 创建消息
const message = {
    id: '1',
    body: 'Hello to all subscribers!',
    topic: 'testTopic',  // 虽然在fanout模式下不需要使用topic，但这里仍保留字段以匹配proto定义
    timestamp: Date.now()
};

// 发布消息到指定的 exchange
client.FanoutPublish({ exchangeName: 'testExchange', message }, (error, response) => {
    if (error) {
        console.error('Error publishing message:', error);
    } else {
        console.log('Publish response:', response);
    }
});
