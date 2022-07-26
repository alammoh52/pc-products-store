import { Injectable } from '@nestjs/common';
import * as mockedItems from './data/items.json';

@Injectable()
export class AppService {
  getItem(sku: string): {} {
    return mockedItems.find((item) => item.sku === sku) || {};
  }
  getItems(category: string, searchTerm: string): Array<{}> {
    return mockedItems.filter(
      (item) => (item.title.toUpperCase().includes(searchTerm.toUpperCase())) && (category ? item.category === category : true)
    );
  }
}
