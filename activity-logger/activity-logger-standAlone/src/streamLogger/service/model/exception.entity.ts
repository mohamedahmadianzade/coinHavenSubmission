import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
@Entity('exception')
export class ExceptionEntity {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  createdAt: Date;
  @Column()
  moduleName: string;
  @Column()
  serviceName: string;
  @Column()
  functionName: string;
  @Column()
  message: string;
  @Column()
  stack: string;
}
