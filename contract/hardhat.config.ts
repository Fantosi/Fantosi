/* eslint-disable node/no-unsupported-features/es-syntax */
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-log-remover";
import "hardhat-contract-sizer";

enum Network {
    hardhat = "hardhat",
    bnb_testnet = "bnb_testnet",
}

enum Command {
    COMPILE = "compile",
    TEST = "test",
}

const {
    NETWORK,
    DEPLOYER_ACCOUNT,
    DEPLOYER_PRIVATE_KEY,
    CHAIN_ID,
    PRIVATE_PROVIDER_URL,
    PUBLIC_PROVIDER_URL,
    PROVIDER_API_ID,
    PROVIDER_API_KEY,
} = process.env;

async function validateENV() {
    const isBuilding = process.argv[2] === Command.COMPILE;
    const isTesting = process.argv[2] === Command.TEST;

    if (isBuilding || isTesting) return;

    if (!NETWORK || !Object.values(Network).includes(NETWORK as Network)) throw new Error("network를 설정해주세요.");

    if (DEPLOYER_ACCOUNT === undefined || DEPLOYER_PRIVATE_KEY === undefined) {
        throw new Error("env is undefined");
    }

    if (NETWORK !== Network.hardhat.toString()) {
        if (!CHAIN_ID || !(PRIVATE_PROVIDER_URL || PUBLIC_PROVIDER_URL)) {
            throw new Error("env is empty");
        }
    }
}

validateENV();

function deployPath(): string {
    return `./deploy_scripts/${NETWORK}/todo`;
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.5.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.8.11",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    namedAccounts: {
        deployer: 0,
    },
    networks: {
        hardhat: {
            live: false,
            tags: ["hardhat", "test"],
            chainId: 1337,
        },
        bnb_testnet: {
            url: PUBLIC_PROVIDER_URL || "",
            chainId: +(CHAIN_ID || 0),
            gasPrice: "auto",
            accounts: [DEPLOYER_PRIVATE_KEY || "0"],
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    paths: {
        sources: "./src",
        tests: "./test/",
        cache: "./cache",
        artifacts: "./artifacts",
        deploy: deployPath(),
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
    },
};

export default config;
