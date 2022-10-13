<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">
  A Rest vpi version of Authentication system includind authenctication and user crud operation
  </p>

## Description

At the first, I implemented the rest version of server with some  Nest features like below which I couldn't use in grpc version

1- local and jwt strategy of passport module

2- getting extra inforamtion from request for logging (httpVerb,url,ip, ...)

This version is completely running and has following features:

1- Authentucation ( signin, verifyToken and me services)

2- User crud (insert,delete,getAll,get,update)

These service can be tested via running test:e2e file or via postman file which inclued in project root


## Authentication
I used passport module for authentication and verifing using strategies like Local and JWT for /login and /me service.
I could implement it easily as I implemented in grpc version but I wanted to use from this wide-used and popular module for these actions.

JWT token just check in /me service and in another service like user crud operation, it doesn't check.
So in log system, we have userId of the use which called /me service and for other service, we have unknown userId.
We can  restrict user access to another service by adding JWT Guard to thier related actions.


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

Integration test can be run with running following command
# e2e tests
$ npm run test:e2e


## Stay in touch

- Author - Seyed Mohamed Ahmadian
- phone  - +989159103070
- email  - mohamed.ahmadian@gmail.com
