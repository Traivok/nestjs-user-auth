import { Test, TestingModule }              from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request                         from 'supertest';
import { Repository }                       from 'typeorm';
import { User }                             from '../src/user/entities/user.entity';
import { AppModule }                        from '../src/app.module';

describe('Authentication Controller (e2e)', () => {
  let app: INestApplication;
  let repo: Repository<User>;
  let userId: number;
  const user = {
    'email':     'user0old@example.com',
    'firstname': 'John',
    'lastname':  'Doe',
    'username':  'john.doe',
    'password':  'password',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    app = moduleFixture.createNestApplication();

    // app.useLogger(console);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();

    repo = moduleFixture.get('UserRepository');
  });

  it('Should be able to create new users', async () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(user)
      .expect(201)
      .then((res) => {
        const { id, ...resUser } = res.body;

        expect(id).toBeDefined();
        expect(resUser.email).toBe(user.email);
        expect(resUser.username).toBe(user.username);

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

  it('Should be able to login with username', async () => {
    const { username: login, password } = user;
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

    const res: any = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login, password })
      .expect(200);

    expect(res.body).toBeDefined();

    const { access_token } = res.body;

    expect(access_token).toBeDefined();

    const { body } = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${ access_token }`)
      .expect(200);

    expect(body.email).toBe(user.email);
  });

  afterAll(async () => {
    await repo.query('TRUNCATE TABLE users');
  });
});
