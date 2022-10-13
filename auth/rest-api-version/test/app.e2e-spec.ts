import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Application api testing (e2e)', () => {
  let app: INestApplication;
  let userId: string;
  let username: string = Date.now() + '';
  let access_token:string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users (POST) register new user ', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: username,
        password: '1',
        fullName: 'exampleName',
        email: 'email@email.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });

  it('/users/username/value (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/username/' + username)
      .expect(200)
      .then((res) => {
        userId = res.body.data.userId;
      });
  });

  it('/users (POST) register new user again with same UserId and get error', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: username,
        password: '1',
        fullName: 'exampleName',
        email: 'email@email.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/users (put) update user by UserId ', () => {
    return request(app.getHttpServer())
      .put('/users/' + userId)
      .send({
        fullName: 'new fullname',
        email: 'newEmail@a.com',
      })
      .expect(200);
  });

  it('/users/username/1 (GET) get again to see if fullname is updated', () => {
    return request(app.getHttpServer())
      .get('/users/username/1')
      .expect(200)
      .expect((res) => res.body.data.fullName === 'new fullname');
  });

  it('/login Login by username and password and get access-token', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: username, password: '1' })
      .expect(200)
      .expect((res) => {
        if (res.body.data.access_token){
          access_token = res.body.data.access_token
          return true;
        }
        else return false;
      });
  });

  it('/me  show user profile based on access-token got from login', () => {
    return request(app.getHttpServer())
      .get('/me')
      .auth(access_token, { type: 'bearer' })
      .expect(200)
  });


  it('/users (delete) delete user by UserId ', () => {
    return request(app.getHttpServer())
      .delete('/users/' + userId)
      .expect(200);
  });


});
