import { Test, TestingModule } from '@nestjs/testing';
import { UserModule }          from '../src/user/user.module';
import { TestingLogger }       from '@nestjs/testing/services/testing-logger.service';
import { INestApplication }    from '@nestjs/common';
import { DataSource }          from 'typeorm';
import describe                from 'node:test';

describe('Authentication Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ UserModule ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useLogger(new TestingLogger());

    await app.init();
  });

  afterAll(async () => {
    const conn = app.get(DataSource);
    await conn.dropDatabase();

    await app.close();

  });
});
