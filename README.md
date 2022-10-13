<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">
   CoinHaven submission including User Authentication and User Crud opration systems
  </p>

### Description
for better undertanding of projects implemented in this project, please read the read.me file in each project.I wrote a brief description for each one and if you have any question about the projects, please ask me in email. 
Thanks


## Authentication service
Consist of two projects :

1- Rest api vesrion

2- GRPC version

each project implenet following servies:

1- Authenticate user by (username and pass) fields and generate jwt token

2- verify authentication token in /me api to access user information based on usedId stored in token

3- verify token based on its structure,signature and expiration time

4- user crud operation (using typeorm as DAL, using mongo for database)

2-1 GRPC Client 
A Rest api project for testing all grpc server mehods by implementing related service and expose them as api



## activity Logger
Conssist of two project

1- a Nest redis microservice using redis stream as transport layer by third part-module ( redis-stream-transport)

2- a Nest stand alone project using redis stream as transport layer by using third party module (node-redis-streams)



## How to run project
First, please run one version of activity logger.it will listen to redis streams for recieving user activity and exception logs.

Both version(microservice and stand alone), need to connect to mongo and redis. so please set correct values in .evn file.

Second, you can run Authentication service with 2 way.

1- start rest-api-version service which listen on port 3009 and need to edit .evn file for redis and mongo configuration

2- start grpc server which listen on port 5004. it need to set redis,mongo and redis stream information in .env file.

2-1 start grpc client which listen on port 3002.it just need to set grp information on .env file.



## Stay in touch

- Author - [Seyed Mohamed Ahmadian]
- Email  - [mohamed.ahmadian@hotmail.com](mohamed.ahmadian@hotmail.com)
- Phone  - +989159103070
