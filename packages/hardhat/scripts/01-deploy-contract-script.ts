// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  await hre.run('compile');
const contract = await hre.ethers.getContract('Greeter');

const greeter = await hre.ethers.getContract("Greeter")
  // We get the contract to deploy
//  const Greeter = await hre.ethers.getContractFactory("Greeter");
//  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("👻 Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
