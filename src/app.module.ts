import { Module } from '@nestjs/common';
import { PizzasController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [PizzasController],
  providers: [AppService],
})
export class AppModule {}
