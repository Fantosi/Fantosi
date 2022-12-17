import Contract from './contract';
import FantosiAuctionHouseArtifact from './abi/FantosiAuctionHouse.json';

export class FantosiAuctionHouse extends Contract {
  constructor() {
    super(
      process.env.AUCTION_HOUSE_ADDRESS ?? '',
      FantosiAuctionHouseArtifact.abi,
    );
  }

  async settleCurrentAndCreateNewAuction() {
    const tx = await this.getContract()
      .methods.settleCurrentAndCreateNewAuction()
      .send({ from: this.getSigner().address, gas: 1000000 })
      .on('transactionHash', (hash: string) => {
        console.log('transactionHash', hash);
      })
      .on('receipt', (receipt: any) => {
        console.log('receipt', receipt);
      });
    return tx;
  }
}
