import { Test, TestingModule } from '@nestjs/testing';
import { PizzasController } from './app.controller';
import { AppService } from './app.service';

describe('PizzasController', () => {
  let pizzasController: PizzasController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PizzasController],
      providers: [AppService],
    }).compile();

    pizzasController = app.get<PizzasController>(PizzasController);
  });

  describe('root', () => {
    it('should return array that contain a', () => {
      expect(pizzasController.getOrder()).toContain('a');
    });
  });
});
