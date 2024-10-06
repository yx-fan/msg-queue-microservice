# Message Queue Microservice

This project is a **message queue microservice** built with **gRPC** and **RabbitMQ** to facilitate message-based communication between services. It supports direct and fanout publish/subscribe models and is designed for scalability and reliability.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **gRPC-based Communication**: The microservice uses gRPC for efficient communication between services.
- **RabbitMQ Integration**: Utilizes RabbitMQ for message queuing and delivery.
- **Direct and Fanout Publish/Subscribe**: Supports both direct and fanout models for publishing and subscribing to messages.
- **Scalable Architecture**: Built to scale horizontally and handle high loads.
- **Error Handling**: Provides robust error handling with custom error classes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install the latest stable version of Node.js from [Node.js official website](https://nodejs.org/).
- **RabbitMQ**: You must have a running RabbitMQ instance.

## Installation

- Clone the repository:

```bash
git clone https://github.com/yx-fan/msg-queue-microservice.git
cd msg-queue-microservice
```

- Install dependencies:

```bash
npm install
```

- Update the `.env` file with the correct RabbitMQ connection details

```bash
LOG_LEVEL=debug
PORT=3011
NODE_ENV=development
GRPC_PORT=50053
RABBITMQ_URL=amqp://rabbitmq:5672
NUM_WORKERS=3
```

Make sure you have a RabbitMQ running on your environment. At this point, you should start the service locally by using `npm run dev`.

- Create docker related files on root

Ensure you have the necessary Docker configuration files such as `Dockerfile`, `docker-compose.yml`, and `.env.docker` in the root directory to build and run the microservice in Docker.

## Usage

For usage of the gRPC calls, please refer to [USAGE](./USAGE.md).
