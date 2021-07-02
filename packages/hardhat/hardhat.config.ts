import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";

require("@nomiclabs/hardhat-etherscan");
const { privateKey, infuraProjectId, etherscanApiKey } = require('./secrets.json');

//
// Select the network you want to deploy to here:
//
const defaultNetwork = "rinkeby"; // test superfluid on rinkeby

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "👩🕵👨🙋👷 Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
console.log("👩🕵   👨🙋👷 these accounts only for localhost network.");
  console.log('To see their private keys🔑🗝"  when you run "npx hardhat node"');
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  defaultNetwork,
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherscanApiKey
  },
  networks: {
  	localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/" + infuraProjectId,
      chainId: 3,
      gasPrice: 20000000000,
      // accounts: {mnemonic: mnemonic}
      accounts: [privateKey]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + infuraProjectId,
      chainId: 4,
      gasPrice: 20000000000,
      accounts: [privateKey]
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + infuraProjectId,
      chainId: 5,
      gasPrice: 20000000000,
      accounts: [privateKey]
    },
    kovan: {
      url: "https://kovan.infura.io/v3/" + infuraProjectId,
      chainId: 42,
      gasPrice: 20000000000,
      accounts: [privateKey]
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 1000000000,
      accounts: [privateKey]
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545/",
      chainId: 97,
      accounts: [privateKey]
    },
    poa: {
      url: "https://core.poanetwork.dev",
      chainId: 99,
      gasPrice: 1000000000,
      accounts: [privateKey]
    },
    poasokol: {
      url: "https://sokol.poa.network",
      chainId: 77,
      gasPrice: 20000000000,
      accounts: [privateKey]
    },
    xdai: {
      url: "https://dai.poa.network/",
      chainId: 100,
      gasPrice: 1000000000,
      accounts: [privateKey]
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      gasPrice: 1000000000,
      accounts: [privateKey]
    },
  },
    solidity: {
    compilers: [
      {
        version: "0.8.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
            {
        version: "0.5.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      ],
   },
};

const DEBUG = false;

function debug(text: string) {
  if (DEBUG) {
    console.log(text);
  }
}
