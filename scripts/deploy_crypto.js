const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const CryptoDevs = await hre.ethers.getContractFactory("CryptoDevs");
    const cryptodevs = await CryptoDevs.deploy("0x2AA6dD64Ff8232f06826E52774caf06C985754D4");
    console.log(cryptodevs.target);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });