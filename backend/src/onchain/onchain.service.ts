import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { FantosiAuctionHouse } from 'src/contract/FantosiAuctionHouse';

@Injectable()
export class OnchainService {
  private fantosiAuctionHouseContract = new FantosiAuctionHouse();

  async registerAuctionHouse() {
    const job = new CronJob('0 0 * * *', async () => {
      await this.fantosiAuctionHouseContract.settleCurrentAndCreateNewAuction();
    });
    job.start();
  }
}
