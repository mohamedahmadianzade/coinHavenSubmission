<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">
  A Nest stand alone project using redis stream as transport layer with using third-part module (node-redis-streams)
  </p>

### Description
This project uses node-redis-streams to implement
redis stream transporter.
Also I know that I shouldn't publish .env file in github repository but for easy configure and running project,
I publihed it in git repository.
The module "@mark_hoog/redis-streams-transport" is responsible for getting data from 
redis stream.it will take a consumer name at startup and will create a consumer group  so we can have scalable 
artichecture by running multiple instance of this nest appliation.
Each nest application consumer will connect to same consumer group so each message will processed once
by a consumer in consumer group and it will result scalability and good performance and speed
in getting log data from our client


## Redis Streams
There are two redis stream for logging

1- useractivity for log user activity

2- exception for log exception occured in projects

## Database Collection
There are two collcetion in mongo

1- activity : has all user activity records got by activity logger via redis stream ( streamname=useractivity)

2- exception : has all exception records got by activity logger via redis stream ( streamname=exception)


## Scalability and performance
For scalability, consumer group feature of redis stream should be implemented in our project so we can have many consumers related to a consumer group in one or some miroservices. in this pattern, all logs are recieved by consumer group and it will distribute them  between all its consumers for processing. there is no limitition in consumers count so we have great exprience and performance by running multiple instance of this project in on or some machines for processing log informations.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```


## tests
These project does not have any test



## Stay in touch

- Author - [Seyed Mohamed Ahmadian]
- Email - [mohamed.ahmadian@hotmail.com](mohamed.ahmadian@hotmail.com)
