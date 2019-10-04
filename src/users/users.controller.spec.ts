import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  describe('get', () => {
    it('should return an empty array', async () => {
      const result = [];
      jest.spyOn(usersService, 'find').mockImplementation(() => new Promise(resolve => resolve(result)));

      expect(await usersController.get()).toBe(result);
    });
  });
});
