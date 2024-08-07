const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const WhiteList = await hre.ethers.getContractFactory("Whitelist");
    const whitelist = await WhiteList.deploy(10);
    console.log(whitelist.target);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });