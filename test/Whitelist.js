const hre = require("hardhat");

async function main() {

    const [addr1] = await hre.ethers.getSigners();

    const deployedAddress = "0x2AA6dD64Ff8232f06826E52774caf06C985754D4";
    if (!deployedAddress) {
        console.error("Địa chỉ hợp đồng chưa được cung cấp hoặc không tồn tại");
        return;
    }
    try {
        const whitelist = await hre.ethers.getContractAt("Whitelist", deployedAddress);
        if (!whitelist) {
            console.error("Không thể kết nối tới hợp đồng tại địa chỉ:", deployedAddress);
            return;
        }
        console.log("Whitelist contract at:", whitelist.address);   

        const getwhitelist = await whitelist.getWhitelistedAddresses();
        console.log("whitelisted addresses:", getwhitelist);
        /*const tx = await whitelist.connect(addr1).addAddressToWhitelist();
        await tx.wait();
        console.log("Address added to whitelist:", addr1.address);
        const isWhitelisted = await whitelist.whitelistedAddresses(addr1.address);
        console.log("Is address whitelisted:", isWhitelisted);*/
    } catch (error) {
        console.error("Lỗi khi kết nối hoặc tương tác với hợp đồng:", error);
    }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
