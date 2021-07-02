// 04-superfluid.ts
const { BN, web3tx, toWad, wad4human, round } = require("@decentral.ee/web3-helpers");

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

import { ethers, web3 } from "hardhat";
const { Web3Provider } = require("@ethersproject/providers");
const provider = new Web3Provider(web3.currentProvider)

async function main() {
const signers = await ethers.getSigners()
const signer = await ethers.getSigner(signers[0].address)

const sf = new SuperfluidSDK.Framework({
            ethers: provider,
            version: "test", //"test" or "v1"
            tokens: ["fDAI"]
        });


await sf.initialize()
let daix = sf.tokens.fDAIx;

const xbobx = "0x609683612D80A091C69747a76ec6efE284a7cf46";
const bob = sf.user(
  { address: xbobx, 
  token: sf.tokens.fDAIx.address }
);
const alice = "0x8587eA108898749538372Cd3Df459870C4a1A56F"

// super token
const daiAddress = await sf.resolver.get("tokens.fDAI");
console.log(daiAddress)
const dai = await sf.contracts.TestToken.at(daiAddress);
//console.log(dai)

var x = await dai.balanceOf(bob.address)
console.log(x.toNumber())
    await web3tx(dai.mint, `bob mint many daix`)(
                bob.address,
                1000000000000000,
                {
                    from: bob.address,
                }
            );

    await web3tx(dai.approve, `bob approves daix`)(
                daix.address,
                1000000000000000,
                {
                    from: bob.address,
                }
            );

    await web3tx(daix.upgrade, `bob upgrade many daix`)(
                10000000000000,
                {
                    from: bob.address,
                }
            );

console.log("------")
x = await dai.balanceOf(bob.address)
var a = new BN('dead', 16);
console.log(x.toNumber())
console.log(a.toNumber())

//const daixWrapper = await sf.getERC20Wrapper(dai);
//assert(daixWrapper.created);
//const daix = await sf.contracts.ISuperToken.at(daixWrapper.wrapperAddress);
//console.log(daixWrapper.wrapperAddress)
//console.log(daix)




// flow
// bob flow to  0x5842d94A698d625857993859ac5b380dC3e5C3eA
// or 0x8587eA108898749538372Cd3Df459870C4a1A56F
//const alice = "0x8587eA108898749538372Cd3Df459870C4a1A56F"
//await bob.flow({
//    recipient: alice,
//    flowRate: "38580246913580" // 100 tokens / mo
//});

//const details = await bob.details();
//console.log(details);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
