import { Injectable } from '@nestjs/common';

export type Order = string
@Injectable()
export class AppService {
  getOrder(): Array<Order> {
    return ['a',"b","c","d","e","f","g","h","i"];
  }
}
