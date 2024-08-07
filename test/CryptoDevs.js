const hre = require("hardhat");

async function main() {

    const [addr1] = await hre.ethers.getSigners();

    const deployedAddress = "";
    if (!deployedAddress) {
        console.error("Địa chỉ hợp đồng chưa được cung cấp hoặc không tồn tại");
        return;
    }
    try {
        const cryptodevs = await hre.ethers.getContractAt("CryptoDevs", deployedAddress);
        if (!cryptodevs) {
            console.error("Không thể kết nối tới hợp đồng tại địa chỉ:", deployedAddress);
            return;
        }
        console.log("CryptoDevs contract at:", cryptodevs.address);   

        await cryptodevs.connect(addr1).mint();
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
