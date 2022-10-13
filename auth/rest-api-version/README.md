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
