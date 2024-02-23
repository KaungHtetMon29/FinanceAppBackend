import { Test, TestingModule } from '@nestjs/testing';
import { UserHistoryController } from './user_history.controller';
import { UserHistoryService } from './user_history.service';

describe('UserHistoryController', () => {
  let controller: UserHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHistoryController],
      providers: [UserHistoryService],
    }).compile();

    controller = module.get<UserHistoryController>(UserHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
