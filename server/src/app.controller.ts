import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/items?')
  getItems(
    @Query('category') category: string,
    @Query('searchTerm') searchTerm: string,
  ): Array<{}> {
    return this.appService.getItems(category, searchTerm);
  }

  @Get(':sku')
  getItem(@Param('sku') sku: string): {} {
    return this.appService.getItem(sku);
  }
}
