import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {Order} from './app.service'
@Controller('pizza')
export class PizzasController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getOrder():  Array<Order> {
    return this.appService.getOrder();
  }
//TODO adding more routs to create more pipelines
  @Post()
  create(): string {
    return 'This action adds a new pizza';
  }

}