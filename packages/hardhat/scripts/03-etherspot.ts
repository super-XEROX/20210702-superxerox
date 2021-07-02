// 03-etherspot.ts
// refer to https://try.etherspot.dev/

import { run, ethers, web3 } from "hardhat";
import { Sdk } from 'etherspot';

async function main() {
   let sdk: Sdk

sdk = new Sdk('0x018859e9d693e8da0a48e2196dbbb18ecd9c3de4550b7439e773bf35b914d7cc');

// or

sdk = new Sdk({
  privateKey: '0x018859e9d693e8da0a48e2196dbbb18ecd9c3de4550b7439e773bf35b914d7cc',
});

console.info('SDK created');
// create session
  const output = await sdk.createSession();

  console.log('session object', output);
  console.log('session graphql headers', {
    ['x-auth-token']: output.token,
  });
// sign message
const signature = await sdk.signMessage({
    message: 'dolore ipsum exercitation sit aute sint anim est nisi aliqua',
  });

  console.log('signature', signature);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
