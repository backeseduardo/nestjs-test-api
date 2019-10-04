import * as request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../src/users/users.module';
import { User } from '../src/users/user.entity';
import userFactory from './factories/user.factory';

describe('Users', () => {
  let app: INestApplication;
  // let connection: Connection;
  // const clearDb = async () => {
  //   const entities = connection.entityMetadatas;

  //   for (const entity of entities) {
  //     const repository = await connection.getRepository(entity.name);
  //     await repository.query(`TRUNCATE TABLE "${entity.tableName}";`);
  //   }
  // };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
      ],
    })
      .compile();

    app = module.createNestApplication();
    await app.init();

    // connection = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    // await clearDb();
    // await connection.synchronize(true);
  });

  it('/GET users', async () => {
    // const users = userFactory(null, 2) as User[];
    // await Promise.all(users.map(user => user.save()));
    const users: User[] = [];
    users.push(await (userFactory.build() as User).save());
    users.push(await (userFactory.build() as User).save());

    const { status, body } = await request(app.getHttpServer())
      .get('/users');

    expect(status).toBe(HttpStatus.OK);
    // expect(body).toBe(JSON.parse(JSON.stringify(users)));

    // await Promise.all(users.map(user => user.remove()));
    await Promise.all(users.map(user => user.remove()));
  });

  it('/POST users', async () => {
    const {
      status,
      body: {
        id,
      },
    } = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Eduardo',
        age: 27,
      })
      .set('Accept', 'application/json');

    expect(status).toBe(HttpStatus.CREATED);

    const { affected } = await User.delete({ id });

    expect(affected).toBe(1);
  });

  it('/DELETE users', async () => {
    const { id } = await (userFactory.build() as User).save();

    const { status } = await request(app.getHttpServer())
      .delete(`/users/${id}`);

    expect(status).toBe(HttpStatus.OK);

    await User.delete({ id });
  });
});
