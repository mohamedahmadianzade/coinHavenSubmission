import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
@Entity('activity')
export class UserActivityEntity {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  createdAt: Date;
  @Column()
  microServiceName: string;
  @Column()
  moduleName: string;
  @Column()
  serviceName: string;
  @Column()
  functionName: string;
  @Column()
  userId: string;
  @Column()
  url: string;
  @Column()
  params: string;
  @Column()
  httpVerb: string;
  @Column()
  ipAddress: string;
  @Column()
  description: string;
  @Column()
  requestResult: string;
  @Column()
  requestErrorMessage: string;
}
