import { ArtistInfo } from "./../types";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard, { WalletState } from "@web3-onboard/core";
import { BigNumber, ethers } from "ethers";
import AuctionHouseArtifact from "../contract/abi/FantosiAuctionHouse.json";
import { FantosiAuctionHouse } from "../contract/typechain/FantosiAuctionHouse";

const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [auctionHouseContract, setAuctionHouseContract] = useState<Contract>();
  const [auctionViewContract, setAuctionViewContract] = useState();
  const [account, setAccount] = useState<string>("");
  const [wallets, setWallets] = useState<WalletState[]>([]);

  const getOnboard = async () => {
    if (!web3) {
      await getWeb3();
    }

    const injected = injectedModule();

    const onboard = Onboard({
      wallets: [injected],
      chains: [
        {
          id: "0x38",
          token: "BNB",
          label: "Binance Smart Chain Mainnet",
          rpcUrl: "https://bscrpc.com",
        },
        {
          id: "0x61",
          token: "tBNB",
          label: "Binance Smart Chain Testnet",
          rpcUrl: "https://data-seed-prebsc-2-s2.binance.org:8545",
        },
      ],
      accountCenter: {
        desktop: {
          position: "bottomRight",
          enabled: true,
          minimal: true,
        },
        mobile: {
          position: "bottomRight",
          enabled: true,
          minimal: true,
        },
      },
    });
    return onboard;
  };

  const getWeb3 = async () => {
    try {
      if (window.ethereum) {
        setWeb3(new Web3(window.ethereum as any));
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signInWithWeb3Onboard = async (): Promise<string | undefined> => {
    const onboard = await getOnboard();
    const connectedWallet = await onboard.connectWallet();
    setWallets(connectedWallet);

    console.log(connectedWallet);

    if (connectedWallet[0]) {
      const address = connectedWallet[0].accounts[0].address;
      // create an ethers provider with the last connected wallet provider
      const ethersProvider = new ethers.providers.Web3Provider(
        connectedWallet[0].provider,
        "any"
      );

      const signer = ethersProvider.getSigner();

      console.log("address: ", address);
      console.log("ethersProvider", ethersProvider);
      console.log("signer", signer);
      setAccount(address);
      setContracts();

      return address;
    }
    return undefined;
  };

  const signOutWithWeb3Onboard = async () => {
    const onboard = await getOnboard();

    if (!wallets) {
      return;
    }
    const [primaryWallet] = wallets;
    const result = await onboard.disconnectWallet({
      label: primaryWallet.label,
    });
    console.log("sign out result: ", result);
  };

  const setContracts = () => {
    getAuctionHouse();
    // TODO : add view contract
  };

  const getAuctionHouse = () => {
    if (!web3) {
      getWeb3();
      return;
    }
    const abi = AuctionHouseArtifact.abi as AbiItem[];
    const ca: string = "";
    const instance = new web3.eth.Contract(abi, ca);
    setAuctionHouseContract(instance);
  };

  const createBid = async (photoCardId: number, bidAmount: number) => {
    if (!web3) {
      throw new Error("createBid ::: not initiated web3");
    }

    if (!auctionHouseContract) {
      throw new Error("createBid ::: not initiated auction house contract");
    }

    const weiAmount = web3.utils.toWei(bidAmount.toString(), "ether");
    await auctionHouseContract.methods
      .createBid(photoCardId)
      .send({
        from: account,
        value: weiAmount,
      })
      .on("transactionHash", (hash: string) => {
        console.log(`transactionHash: ${hash}`);
      })
      .on("receipt", (receipt: any) => {
        console.log(`receipt: ${receipt}`);
      })
      .on("confirmation", (confirmationNumber: number, receipt: any) => {
        console.log(`confirmation: ${confirmationNumber}`);
      })
      .on("error", (error: any, receipt: any) => {
        console.log(`error: ${error}`);
      });
  };

  const getAllArtistInfo = async (): Promise<ArtistInfo[]> => {
    const res: ArtistInfo[] = [];
    // TODO

    return res;
  };

  useEffect(() => {
    getWeb3();
  }, []);

  return { signInWithWeb3Onboard, signOutWithWeb3Onboard, account, createBid };
};

export default useWeb3;
