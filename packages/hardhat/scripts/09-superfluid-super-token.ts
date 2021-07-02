// 09-superfluid-super-token.ts

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

import { ethers, web3 } from "hardhat";
const { Web3Provider } = require("@ethersproject/providers");
const provider = new Web3Provider(web3.currentProvider)

async function main() {
const signers = await ethers.getSigners()
const signer = await ethers.getSigner(signers[0].address)

const sf = new SuperfluidSDK.Framework({
            ethers: provider,
            version: "v1", //"test"
            tokens: ["fDAI"]
        });


await sf.initialize()

// super token
const daiAddress = await sf.resolver.get("tokens.fDAI");
console.log(daiAddress)
const dai = await sf.contracts.TestToken.at(daiAddress);
const daixWrapper = await sf.getERC20Wrapper(dai);
//assert(daixWrapper.created);
const daix = await sf.contracts.ISuperToken.at(daixWrapper.wrapperAddress);
console.log(daixWrapper.wrapperAddress);

console.log(daix)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
