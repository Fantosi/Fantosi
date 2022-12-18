import { ArtistInfo, PhotoCardInfo, Web3Type } from "./../types";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard, { WalletState } from "@web3-onboard/core";
import { BigNumber, ethers } from "ethers";
import AuctionHouseArtifact from "../contract/abi/FantosiAuctionHouse.json";
import ViewArtifact from "../contract/abi/FantosiView.json";

const AUCTION_HOUSE_ADDR = "0xA659B98a2569c4cD2dD255a16c4f1d8a37420596";
const AUCTION_VIEW_ADDR = "0x8fF60cd85F6c0870C56BF71efe51D25E2BE3deD9";

const useWeb3 = (): Web3Type => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [auctionHouseContract, setAuctionHouseContract] = useState<Contract>();
  const [auctionViewContract, setAuctionViewContract] = useState<Contract>();
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

    if (connectedWallet[0]) {
      const address = connectedWallet[0].accounts[0].address;
      // create an ethers provider with the last connected wallet provider
      const ethersProvider = new ethers.providers.Web3Provider(
        connectedWallet[0].provider,
        "any"
      );

      const signer = ethersProvider.getSigner();

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
  };

  const setContracts = () => {
    getAuctionHouse();
    getViewContract();
  };

  const getAuctionHouse = () => {
    if (!web3) {
      getWeb3();
      return;
    }

    const abi = AuctionHouseArtifact.abi as AbiItem[];
    const ca: string = AUCTION_HOUSE_ADDR;
    const instance = new web3.eth.Contract(abi, ca);
    setAuctionHouseContract(instance);
  };

  const getViewContract = () => {
    if (!web3) {
      getWeb3();
      return;
    }
    const abi = ViewArtifact.abi as AbiItem[];
    const ca: string = AUCTION_VIEW_ADDR;
    const instance = new web3.eth.Contract(abi, ca);
    setAuctionViewContract(instance);
  };

  const createBid = async (photoCardId: number, bidAmount: number) => {
    if (web3 === undefined) {
      throw new Error("createBid ::: not initiated web3");
    }

    if (auctionHouseContract === undefined) {
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
    if (web3 === undefined) {
      throw new Error("getAllArtistInfo ::: not initiated web3");
    }

    if (auctionViewContract === undefined) {
      throw new Error(
        "getAllArtistInfo ::: not initiated auction view contract"
      );
    }

    const res: ArtistInfo[] = [];
    const ls = await auctionViewContract.methods.getAllArtistInfo().call();
    res.push(...ls);
    return res;
  };

  const getAllPhotoCardInfo = async (): Promise<PhotoCardInfo[]> => {
    if (web3 === undefined) {
      throw new Error("getAllPhotoCardInfo ::: not initiated web3");
    }

    if (auctionViewContract === undefined) {
      throw new Error(
        "getAllPhotoCardInfo ::: not initiated auction view contract"
      );
    }

    const res: PhotoCardInfo[] = [];
    const ls = await auctionViewContract.methods.getAllPhotoCardInfo().call();
    if (ls) {
      res.push(...ls);
    }
    return res;
  };

  const getArtistPhotoCardInfo = async (
    artistKey: string
  ): Promise<PhotoCardInfo | null> => {
    if (web3 === undefined) {
      throw new Error("getArtistPhotoCardInfo ::: not initiated web3");
    }

    if (auctionViewContract === undefined) {
      throw new Error(
        "getArtistPhotoCardInfo ::: not initiated auction view contract"
      );
    }

    const photoCard = await auctionViewContract.methods
      .getArtistPhotoCardInfo(artistKey)
      .call();
    return photoCard ? photoCard : null;
  };

  const getArtistPhotoCardHistoryInfo = async (
    artistKey: string
  ): Promise<PhotoCardInfo[]> => {
    if (web3 === undefined) {
      throw new Error("getArtistPhotoCardHistoryInfo ::: not initiated web3");
    }

    if (auctionViewContract === undefined) {
      throw new Error(
        "getArtistPhotoCardHistoryInfo ::: not initiated auction view contract"
      );
    }

    const res: PhotoCardInfo[] = [];
    const ls = await auctionViewContract.methods
      .getArtistPhotoCardHistoryInfo(artistKey)
      .call();

    if (ls) {
      res.push(...ls);
    }

    return res;
  };

  useEffect(() => {
    getWeb3();
  }, [account]);

  useEffect(() => {
    if (web3) {
      setContracts();
    }
  }, [web3]);

  return {
    signInWithWeb3Onboard,
    signOutWithWeb3Onboard,
    account,
    createBid,
    getAllArtistInfo,
    getAllPhotoCardInfo,
    getArtistPhotoCardInfo,
    getArtistPhotoCardHistoryInfo,
    web3Utils: web3?.utils,
  };
};

export default useWeb3;
