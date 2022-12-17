import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OnchainModule } from './onchain/onchain.module';

@Module({
  imports: [OnchainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
