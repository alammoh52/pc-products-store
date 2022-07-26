import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as mockedItems from './data/items.json';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('items', () => {
    it('returns full items list"', () => {
      expect(appController.getItems('', '')).toStrictEqual(mockedItems);
    });
    it('returns filtered items list"', () => {
      expect(appController.getItems('Home', 'table')).toStrictEqual([
        {
          category: 'Home',
          price: 34.33,
          rating: 3,
          sku: '6',
          title: 'Table',
        },
      ]);
    });
  });
  describe('item', () => {
    it('returns item queried by sku"', () => {
      expect(appController.getItem('5')).toStrictEqual({
        category: 'Home',
        price: 87.34,
        rating: 2,
        sku: '5',
        title: 'Chair',
      });
    });
  });
});
