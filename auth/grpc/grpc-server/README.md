<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">
  A GRPC version of Authentication system includind authenctication and user crud operation
  </p>

## Description

GRPC vesion of Authentication system including user authentication and crud operation

This version is completely running and has following features:

1- Authentucation ( signin, verifyToken and me services)

2- User crud (insert,delete,getAll,get,update)

These service can be tested via grpc client (a Nestjs Http server with many api which call related grpc server methods)

## GRPC client
A Rest api project which have all methods implemented in GRPC server as rest api service. in this project, there is a postman file which can be imported to test and calling implemented controller methods.


## Authentication
I used jwtModule for (creating,verify,decode) jwt token operation in the system, instead of using third-party module for authentication, I implemented it by storing and query user collection in the database. 

For advanced authentication, the generated token should be save in database and have expiration based on logic and should be checked in authentication process


### token 
All generated tokens are stored in database and with each new token generation,old token related to that user will be expired

In verifing Process, there is 3 step3

1- check the token signature

2- decode the token and extract information from that

3- check the expiration of token stored in database


## Logging
For loggin user activity, we can implement it in many places in the project based our need. for example, it can be implemented in 

1- middleware

2- interceptor

3- Controller file or service file in the project

because I wanted to have logical field in the log table such as modulename , servicename, function name  and I wanted to have the result of the request in log file, I decied to implement it in controller file.

for that, I have a base controller class which all controller in project extend that and have controllerResult and handleError method
which do their jobs and logging too.

we should send some information to these method like request object and function name to can have full details of user activity

implementing log in middleware or inceptor is a good way and can implemented very easy but the problem we can not have logical fields in logging..

with this implemented log system, we can group the log by many fields like module,function,service and extra ....


## Project structure
using Nest js module system pattern including 

 1- controller (handle request, exception handling, validation , transformation)

 2- service ( bussiness logic and data access layer )

 2-1 we could seperate BL and DAL layer and have seperate classes for each one for future use , but for simplicity, in this version we have just 2 Controller and service Layer

using typeOrm as DAL repository for communication with database

using mongo as main database and redis stream for communication with log service



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

## Test

This project can be tested with running GRPC client

## Stay in touch

- Author - Seyed Mohamed Ahmadian
- phone  - +989159103070
- email  - mohamed.ahmadian@gmail.com
