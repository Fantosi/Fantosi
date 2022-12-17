import { Module } from '@nestjs/common';
import { OnchainController } from './onchain.controller';
import { OnchainService } from './onchain.service';

@Module({
  controllers: [OnchainController],
  providers: [OnchainService],
})
export class OnchainModule {}
