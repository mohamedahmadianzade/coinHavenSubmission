<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">
  A Rest api project for testing GRPC Server project by implementing all grpc server methods as rest api.
  </p>

## Description

In this project, we implemented all grpc methods which are available in GRPC server projects as rest api, so each grpc method can be tested via calling related  rest api.

All api can be tested via postman file in the projct.



## Project structure
using Nest js module system pattern including 

 1- controller (handle request, exception handling, validation , transformation)

 2- service ( bussiness logic and data access layer )

 2-1 we could seperate BL and DAL layer and have seperate classes for each one for future use , but for simplicity, in this version we have just 2 Controller and service Layer

using grpc module  for communication with grpc server



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

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - Seyed Mohamed Ahmadian
- phone  - +989159103070
- email  - mohamed.ahmadian@gmail.com
