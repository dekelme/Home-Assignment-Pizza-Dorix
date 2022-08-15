import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {Request } from 'express';
import DoughHandler from './dough';
import {ToppingsHandler} from './topping';
import {OvenHandler} from './oven'
import {WaiterHandler} from './waiter'

new ToppingsHandler();
new OvenHandler();
new WaiterHandler();

@Controller('pizza')
export class PizzasController extends DoughHandler {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Post()
  receiveOrders(@Req() req : Request) {
     console.log(req.body)
      this.receiveNewOrders(req.body);
    return "Orders have been registered";
  }
  
}
