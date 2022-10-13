## Description
This project uses [mark_hoog](https://www.npmjs.com/package/@mark_hoog/redis-streams-transport) to implement
redis stream transporter.
This module should work with nest 8.0.0. so we changed the nest framework version to can work with it.
Also I know that I shouldn't publish .env file in github repository but for easy configure and running project,
I publihed it in git repository.

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



## tests
These project does not have any test

## Description
The module "@mark_hoog/redis-streams-transport" is responsible for getting data from 
redis stream.it will take a consumer name at startup and will create a consumer group  so we can have scalable 
artichecture by running multiple instance of this nest appliation.
Each nest application consumer will connect to same consumer group so each message will processed once
by a consumer in consumer group and it will result scalability and good performance and speed
in getting log data from our client
## Stay in touch

- Author - [Seyed Mohamed Ahmadian]
- Email - [mohamed.ahmadian@hotmail.com](mohamed.ahmadian@hotmail.com)
