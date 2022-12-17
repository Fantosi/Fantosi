import { Test, TestingModule } from '@nestjs/testing';
import { OnchainController } from './onchain.controller';

describe('OnchainController', () => {
  let controller: OnchainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnchainController],
    }).compile();

    controller = module.get<OnchainController>(OnchainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
