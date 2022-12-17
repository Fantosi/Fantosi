import { Test, TestingModule } from '@nestjs/testing';
import { OnchainService } from './onchain.service';

describe('OnchainService', () => {
  let service: OnchainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnchainService],
    }).compile();

    service = module.get<OnchainService>(OnchainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
