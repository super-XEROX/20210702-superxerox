// 05-signers.ts

import { ethers } from "hardhat";

async function main() {
   const signers = await ethers.getSigners()
   const signer = await ethers.getSigner(signers[0].address)

// All properties on a domain are optional
const domain = {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
};

// The named list of all type definitions
const types = {
    Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' }
    ],
    Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' }
    ]
};

// The data to sign
const value = {
    from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
    },
    to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
    },
    contents: 'Hello, Bob!'
};

const signature = await signers[0]._signTypedData(domain, types, value);
// '0xc65262997d19000afdfbc81f2f8fced5316ddc54d0ad5211c69e6351ff1420fc72fb45a917a097008706e1f5e9e776e6d4702be2256ba69ea1fcfe23c514d0611b'

console.log(signer.address)
console.log(signature)

const g = await signer.getBalance()
console.log(g.toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
