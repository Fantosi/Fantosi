import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
import { ethers } from "ethers";

let wallets: any[] = [];

const getOnboard = () => {
  const injected = injectedModule();

  const MAINNET_RPC_URL =
    "https://mainnet.infura.io/v3/e7b8f8c302a24b68a8b735be5a647549";
  const onboard = Onboard({
    wallets: [injected],
    chains: [
      {
        id: "0x1",
        token: "ETH",
        label: "Ethereum Mainnet",
        rpcUrl: MAINNET_RPC_URL,
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

export const signInWithWeb3Onboard = async (): Promise<string | undefined> => {
  const onboard = getOnboard();
  wallets = await onboard.connectWallet();

  console.log(wallets);

  if (wallets[0]) {
    const address = wallets[0].accounts[0].address;
    // create an ethers provider with the last connected wallet provider
    const ethersProvider = new ethers.providers.Web3Provider(
      wallets[0].provider,
      "any"
    );

    const signer = ethersProvider.getSigner();

    console.log("address: ", address);
    console.log("ethersProvider", ethersProvider);
    console.log("signer", signer);

    return address;
  }
  return undefined;
};

export const signOutWithWeb3Onboard = async () => {
  const onboard = getOnboard();

  const [primaryWallet] = wallets;
  const result = await onboard.disconnectWallet({ label: primaryWallet.label });
  console.log("sign out result: ", result);
};
