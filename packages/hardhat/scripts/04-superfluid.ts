// 04-superfluid.ts

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

import { web3 } from "hardhat";
const { Web3Provider } = require("@ethersproject/providers");
const provider = new Web3Provider(web3.currentProvider)

async function main() {

const sf = new SuperfluidSDK.Framework({
            ethers: provider,
            version: "v1", //RELEASE_VERSION=v1 or "test"
            tokens: ["fDAI"]
        });

const tokenAddress = "0xA9F7beA2e85cEFaDCFeB23f3417B5D2cBc52B63f"
await sf.initialize()
const tokenInfo = await sf.contracts.TokenInfo.at(tokenAddress);
console.log(tokenInfo)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
