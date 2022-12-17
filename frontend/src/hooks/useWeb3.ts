import { useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard, { WalletState } from "@web3-onboard/core";
import { ethers } from "ethers";

const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [auctionHouseContract, serAuctionHouseContract] = useState<Contract>();
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

  useEffect(() => {
    getWeb3();
  }, []);

  return { signInWithWeb3Onboard, signOutWithWeb3Onboard, account };
};

export default useWeb3;
