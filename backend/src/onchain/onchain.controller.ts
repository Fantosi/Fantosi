import { Controller } from '@nestjs/common';
import { OnchainService } from './onchain.service';

@Controller('onchain')
export class OnchainController {
  constructor(private readonly onchainService: OnchainService) {
    this.registerAuctionHouse();
  }

  async registerAuctionHouse() {
    await this.onchainService.registerAuctionHouse();
  }
}
