import { Test, TestingModule } from '@nestjs/testing';
import { TestingLogger }       from '@nestjs/testing/services/testing-logger.service';
import { INestApplication }    from '@nestjs/common';
import * as request            from 'supertest';
import { Repository }          from 'typeorm';
import { User }                from '../src/user/entities/user.entity';
import { AppModule }           from '../src/app.module';
import * as cookieParser       from 'cookie-parser';

describe('Authentication Controller (e2e)', () => {
  let app: INestApplication;
  let repo: Repository<User>;
  let userId: number;
  const user = {
    'email':     'user@example.com',
    'firstname': 'John',
    'lastname':  'Doe',
    'nickname':  'john.doe',
    'password':  'password',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useLogger(new TestingLogger());
    app.use(cookieParser());

    await app.init();

    repo = moduleFixture.get('UserRepository');
  });

  it('Should be able to create new users', async () => {
    return request(app.getHttpServer())
      .post('/auth/logon')
      .send(user)
      .expect(201)
      .then((res) => {
        const { id, ...resUser } = res.body;

        expect(id).toBeDefined();
        expect(resUser.email).toBe(user.email);
        expect(resUser.nickname).toBe(user.nickname);

        userId = id;
      });
  });

  it('Should be able to login with email', async () => {
    const { email: login, password } = user;
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ login, password })
      .expect(200);
  });

  it('Should be able to login with nickname', async () => {
    const { nickname: login, password } = user;
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ login, password })
      .expect(200);
  });

  it('Should reject wrong passwords', async () => {
    const { email: login, password } = user;
    const wrongPassword              = password + 'wrong';
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ login, password: wrongPassword })
      .expect(404);
  });

  it('Should persist sessions', async () => {
    const { email: login, password } = user;

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login, password })
      .expect(200);

    const cookie = res.get('Set-Cookie');

    expect(cookie).toBeDefined();

    const { body } = await request(app.getHttpServer())
      .post('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toBe(user.email);
  });

  afterAll(async () => {
    await repo.query('TRUNCATE TABLE users');
  });
});
