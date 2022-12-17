import Web3 from 'web3';

export default abstract class Contract {
  public web3: Web3;
  private contract: any;
  private signer;
  constructor(public address: string, public abi: any) {
    const rpc =
      process.env.NODE_ENV !== 'development'
        ? process.env.TEST_RPC
        : process.env.ALL_THAT_RPC;

    if (!rpc || !process.env.PRIVATE_KEY) {
      throw new Error(
        `rpc and PRIVATE_KEY must be set rpc: ${rpc}, ${process.env.PRIVATE_KEY}`,
      );
    }

    this.web3 = new Web3(rpc);
    this.contract = new this.web3.eth.Contract(abi, address);

    this.signer = this.web3.eth.accounts.privateKeyToAccount(
      process.env.PRIVATE_KEY,
    );

    this.initSigner();

    this.test();
  }

  getContract() {
    return this.contract;
  }

  getSigner() {
    return this.signer;
  }

  async initSigner() {
    await this.web3.eth.accounts.wallet.add(this.signer);
  }

  async test() {
    await this.web3.eth.getBlockNumber().then(console.log);
  }
}
