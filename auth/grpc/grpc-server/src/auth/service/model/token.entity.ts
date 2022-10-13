import {
    Entity,
    Column,
    ObjectID,
    ObjectIdColumn,
  } from 'typeorm';
  @Entity("token")
  export class TokenEntity {
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    createdAt: string;
    @Column()
    userId: string;
    @Column()
    token: string;
    @Column()
    expired: boolean = false;
  }