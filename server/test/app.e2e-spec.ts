import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/items (GET)', () => {
    return request(app.getHttpServer())
      .get('/items?searchTerm=Clock&category=Essentials')
      .expect(200)
      .expect([
        {
          sku: '7',
          title: 'Clock',
          price: 15.99,
          category: 'Essentials',
          rating: 5,
        },
      ]);
  });
  it('/sku (GET)', () => {
    return request(app.getHttpServer())
      .get('/2')
      .expect(200)
      .expect({
        sku: '2',
        title: 'Shirt',
        price: 12.49,
        category: 'Essentials',
        rating: 4,
      });
  });
});
