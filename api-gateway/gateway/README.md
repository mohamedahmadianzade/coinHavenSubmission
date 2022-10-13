<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> Graphql api-gateway to communicate with grpc server with Authentication and user crud operation service 
    <p align="center">

## Description

This project is under development. Until now , user crud operations are implemented and its queries are available at authentication.grapgh.query file.

available queries:

1- create user

2- getAll users and get user By UserId

3- delete and update user by UserId


these queries can be run on [Apolo Playground](http://localhost:3010/graphql) available at http://localhost:3010/graphql


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
```
For test please run the project and nevigate to address http://localhost:3010/graphql and use queries wrote in authentication.grapgh.query file in root project directory
```


##Graphql Queries
```

### GetAll users
query {
  getAll(id: "1") {
    data {
      userId
      username
      fullName
      email
    }
    message
  }
}


query {
  getByUserId(userId: "0a56b87b-38ae-475d-8770-0b81ccb9f123") {
    data {
      userId,username,email,fullName
    }
    message
  }
}

mutation {
  insert(username: "91", password: "91", fullName: "91", email: "a@a.com") {
    message
    data {
      userId
      username
    }
  }
}


mutation {
  delete(userId:"f6e4ac09-1d90-427d-9469-0577bfe41cdf") {
    message
    data {
      userId
    }
  }
}

mutation {
  update(
    fullName: "hamid akbarnejad"
    email: "test@test.com"
    userId: "3585fcef-15f3-41f8-9ac3-8801988b4ea9"
  ) {
    data {
      userId
    }
    message
  }
}

```



## Stay in touch

- Author - [Seyed Mohamed Ahmadian]()
- Phone  - +989159103070
- email  - mohamed.ahmadian@hotmail.com
