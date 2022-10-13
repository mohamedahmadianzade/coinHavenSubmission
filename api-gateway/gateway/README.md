<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> Graphql api-gateway to communicate with grpc server with Authentication and user crud operation service 
    <p align="center">

## Description

Graphql api-gateway communicate with our Authentication service via grpc and can call all service implemented in that serer with related graphql queries and mutations. we are developing the graphql client to can communiate with graphql sever but now we can test these queries via apolo playground. Note that all valid queries for Authentication and user crud operation are listed below or you can find them in file in root project directory.

available queries:

1- create user

2- getAll users and get user By UserId

3- delete and update user by UserId

4- Login by username and passowrd

5- get user profile based jwt token

6- verify token 


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
For test please run the project and nevigate to address http://localhost:3010/graphql and use queries wrote in authentication.grapgh.query file in root project directoryn or use queries below
```


## Graphql Queries


### GetAll users
```
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
```
### Get By UserId  
```
query {
  getByUserId(userId: "0a56b87b-38ae-475d-8770-0b81ccb9f123") {
    data {
      userId,username,email,fullName
    }
    message
  }
}
```

### Insert new user
```
mutation {
  insert(username: "91", password: "91", fullName: "91", email: "a@a.com") {
    message
    data {
      userId
      username
    }
  }
}
```

### Delete user by userId
```
mutation {
  delete(userId:"f6e4ac09-1d90-427d-9469-0577bfe41cdf") {
    message
    data {
      userId
    }
  }
}
```

### Update user by userId
```
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



### Login by username and password
```
query {
  login(username: "2", password: "2") {
    data {
      username
      token
    }
    message
  }
}


```


### verify Token
```
query {
  verifyToken(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIiLCJzdWIiOiIzNTg1ZmNlZi0xNWYzLTQxZjgtOWFjMy04ODAxOTg4YjRlYTkiLCJpYXQiOjE2NjU2Nzk2MjcsImV4cCI6MTY2NTY4MDIyN30.KkFIEa5vA9j7brBeTawnZ03UtALwT6KqjV5hT--uKUE"
  ) {
    message
    data {
      token
      message
    }
  }
}

```


### /me Get user profile based jwt token
```
query {
  me(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIiLCJzdWIiOiIzNTg1ZmNlZi0xNWYzLTQxZjgtOWFjMy04ODAxOTg4YjRlYTkiLCJpYXQiOjE2NjU2Nzk2MjcsImV4cCI6MTY2NTY4MDIyN30.KkFIEa5vA9j7brBeTawnZ03UtALwT6KqjV5hT--uKUE"
  ) {
    message
    data {
      userId
      fullName
      email
      username
    }
  }
}

```





## Stay in touch

- Author - [Seyed Mohamed Ahmadian]()
- Phone  - +989159103070
- email  - mohamed.ahmadian@hotmail.com
