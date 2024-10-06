# Messaging Queue System: Publish and Subscribe

## Overview

This document provides a step-by-step guide on how to use the `Publish` and `Subscribe` methods in the gRPC-based messaging queue system. These methods enable clients to publish messages to specific topics and subscribe to receive messages from those topics. The guide covers both Point-to-Point (P2P) messaging and Fanout (Pub/Sub) messaging modes.

## Prerequisites

- Ensure that the gRPC server for the messaging queue is running and accessible.
- The `messageQueue.proto` file should be available and properly compiled in your client application.
- The client should have necessary packages installed:
    - `@grpc/grpc-js`
    - `@grpc/proto-loader`

File content: `messageQueue.proto`

```proto
syntax = "proto3";

package messageQueue;

// The Message represents a unit of data that will be sent through the message queue
message Message {
    string id = 1;  // The unique identifier of the message
    string body = 2;  // The body of the message
    string topic = 3;  // The topic of the message
    int64 timestamp = 4;  // The timestamp of the message
}

// Point-to-Point mode request and response
message PublishRequest {
    string topic = 1;  // The topic of the message
    Message message = 2;  // The message to be published
}

message PublishResponse {
    bool success = 1;  // The success status of the publish operation
    string message = 2;  // The message of the response
}

message SubscribeRequest {
    string topic = 1;  // The topic to subscribe to
}

message SubscribeResponse {
    bool success = 1;  // The success status of the subscribe operation
    string message = 2;  // The message of the response
}

message UnsubscribeRequest {
    string topic = 1;  // The topic to unsubscribe from
}

message UnsubscribeResponse {
    bool success = 1;  // The success status of the unsubscribe operation
    string message = 2;  // The message of the response
}

// Fanout mode request and response
message FanoutPublishRequest {
    string exchangeName = 1;  // The exchange name for fanout mode
    Message message = 2;  // The message to be published
}

message FanoutPublishResponse {
    bool success = 1;  // The success status of the publish operation
    string message = 2;  // The message of the response
}

message FanoutSubscribeRequest {
    string exchangeName = 1;  // The exchange name to subscribe to
}

message FanoutSubscribeResponse {
    bool success = 1;  // The success status of the subscribe operation
    string message = 2;  // The message of the response
}

message FanoutUnsubscribeRequest {
    string exchangeName = 1;  // The exchange name to unsubscribe from
}

message FanoutUnsubscribeResponse {
    bool success = 1;  // The success status of the unsubscribe operation
    string message = 2;  // The message of the response
}

service MessagingService {
    rpc Publish(PublishRequest) returns (PublishResponse) {}
    rpc Subscribe(SubscribeRequest) returns (stream Message) {}  // Use stream to return multiple messages
    rpc Unsubscribe(UnsubscribeRequest) returns (UnsubscribeResponse) {}
}

service FanoutMessagingService {
    rpc FanoutPublish(FanoutPublishRequest) returns (FanoutPublishResponse) {}
    rpc FanoutSubscribe(FanoutSubscribeRequest) returns (stream Message) {}  // Use stream to return multiple messages
    rpc FanoutUnsubscribe(FanoutUnsubscribeRequest) returns (FanoutUnsubscribeResponse) {}
}
```

- Copy the `messageQueue.proto` file to your client application directory. (e.g., `src/proto/messageQueue.proto`)

## Publish (Point-to-Point Mode)

The `Publish` method in Point-to-Point (P2P) mode allows clients to publish messages to a specific topic in the message queue system.

Example usage:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./src/proto/messageQueue.proto', { // Replace with your proto file path
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const messageQueuePackage = grpc.loadPackageDefinition(packageDefinition).messageQueue;
const client = new messageQueuePackage.MessagingService('api.damchat.com:00000', grpc.credentials.createInsecure()); // Replace with your server address
const message = {
    id: '1',
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
```

## Subscribe (Point-to-Point Mode)

The `Subscribe` method in Point-to-Point (P2P) mode allows clients to subscribe to a specific topic in the message queue system and receive messages from that topic.

Example usage:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./src/proto/messageQueue.proto', { // Replace with your proto file path
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const messageQueuePackage = grpc.loadPackageDefinition(packageDefinition).messageQueue;
const client = new messageQueuePackage.MessagingService('api.damchat.com:00000', grpc.credentials.createInsecure()); // Replace with your server address
const call = client.Subscribe({ topic: 'testTopic' });  // Replace with the topic you want to subscribe to

call.on('data', (message) => {
    console.log('Received message:', message);
});

call.on('error', (error) => {
    console.error('Error receiving message:', error);
});

call.on('end', () => {
    console.log('Subscription ended');
});
```

## Publish (Fanout Mode)

The `FanoutPublish` method allows clients to publish messages to an exchange in Fanout (Pub/Sub) mode. Messages are broadcast to all queues bound to that exchange.

Example usage:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./src/proto/messageQueue.proto', { // Replace with your proto file path
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const messageQueuePackage = grpc.loadPackageDefinition(packageDefinition).messageQueue;
const client = new messageQueuePackage.FanoutMessagingService('api.damchat.com:00000', grpc.credentials.createInsecure()); // Replace with your server address

// Creating a message
const message = {
    id: '1',
    body: 'Hello to all subscribers!',
    topic: 'testTopic',  // Although not used in fanout, topic is part of the message structure
    timestamp: Date.now()
};

// Publishing the message to the exchange
client.FanoutPublish({ exchangeName: 'testExchange', message }, (error, response) => {
    if (error) {
        console.error('Error publishing message:', error);
    } else {
        console.log('Publish response:', response);
    }
});
```

## Subscribe (Fanout Mode)

The `FanoutSubscribe` method allows clients to subscribe to an exchange in Fanout (Pub/Sub) mode and receive all messages broadcasted to that exchange.

Example usage:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./src/proto/messageQueue.proto', { // Replace with your proto file path
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const messageQueuePackage = grpc.loadPackageDefinition(packageDefinition).messageQueue;
const client = new messageQueuePackage.FanoutMessagingService('api.damchat.com:00000', grpc.credentials.createInsecure()); // Replace with your server address

// Subscribing to an exchange
const call = client.FanoutSubscribe({ exchangeName: 'testExchange' });

call.on('data', (message) => {
    console.log('Received message:', message);
});

call.on('error', (error) => {
    console.error('Error receiving message:', error);
});

call.on('end', () => {
    console.log('Subscription ended');
});
```

## Summary

This guide provides the necessary steps to use both Point-to-Point and Fanout (Pub/Sub) messaging modes in a gRPC-based messaging queue system. You can choose the mode that best fits your needs based on whether you require direct messaging to a specific topic or broadcasting messages to multiple subscribers.

Ensure that your gRPC server is correctly configured and running before executing these client scripts, and replace the server address in the examples with your actual server address.