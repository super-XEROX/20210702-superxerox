// 08-utils-helpers.ts
// refer to https://github.com/decentral-ee/web3-helpers/blob/master/test/math-utils.test.js

import { ethers } from "hardhat";

const {
  web3tx,
  toWad,
  toBN,
  fromWad,
  wad4human
} = require("@decentral.ee/web3-helpers");

const helpers = require("@decentral.ee/web3-helpers");

async function main() {
// default ethers utils
console.log(ethers.utils)
// simple helpers
console.log(web3tx)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
