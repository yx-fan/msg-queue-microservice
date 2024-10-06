## [1.0.5] - 2024-08-28
### Fixed
- **Significant** Added acknowledgement to the message queue system to ensure messages are delivered and processed
- Fixed the issue that the message will be stuck in the queue if the previous message is not acknowledged

### Changed
- Leveraged callback function to handle the process when a message is consumed
- Ensure that the messeages are not lost

### Documentation
- Updated usage.md to include the fanout mode for publishing and subscribing messages

## [1.0.4] - 2024-08-26
### Added
- **Significant** Added the ability to broadcast messages to multiple clients
- Added new proto data structure for broadcasting messages
- Added new controller for broadcasting messages
- Added test cases for broadcasting messages to make sure it works as expected


## [1.0.3] - 2024-08-22
### Added
- Added prefetch to the subscriber to handle multiple messages
- Added ack to the subscriber to acknowledge the receipt of messages
- First deployment of the message queue system using docker on ubuntu
- Tested the message queue system using docker on ubuntu and sucessfully sent and received messages

### Changed
- Cleaned up some code and added comments for better understanding

### Documentation
- Added USAGE.md for detailed instructions on how to use the message queue system
- Created docker example folder to demonstrate how to deploy the message queue system using docker

## [1.0.2] - 2024-08-21
### Added
- **Significant** Added the ability to send messages to the message queue system
- **Significant** Added the ability to receive messages from the message queue system and distribute them to the appropriate clients
- Added appropriate logs for debugging and monitoring
- Added publish and subscribe controllers for the message queue system in grpc
- Binded publish and subscribe services to the grpc server
- Attached the rabbitMq to the message queue system
- Added local publisher and subscriber for testing purposes

### Documentation
- Added system architecture diagram


## [1.0.0] - 2024-08-19
### Added
- **Significant** Designed messaging protocols and implemented input and output data structures
- Added grpc and rest api framework for the msg queue system
- Added docker deployment method
- Added necessary packages for grpc, rest api, and typescript
- Added rabbitMq for message queue system
- Added rxjs to handle the stream of messages
