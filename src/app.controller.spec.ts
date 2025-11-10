import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockAppService = {
  getUsers: jest.fn(() => [{ id: 1, name: 'Usuário Teste' }]),
};
describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService, 
        },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });
  describe('root (getUsers)', () => {
    it('deve retornar um array de usuários', () => {
      mockAppService.getUsers.mockClear();
      expect(mockAppService.getUsers).toHaveBeenCalledTimes(1);
    });
  });
});