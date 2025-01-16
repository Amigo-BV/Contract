const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const amigo = await ethers.getContractAt("Amigo", "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"); // smart contract address

  console.log("Deployer address:", deployer.address);

  // Deployer balance
  const deployerBalance = await amigo.balanceOf(deployer.address);
  console.log("Deployer's initial balance:", ethers.formatUnits(deployerBalance, 18));

  // Transfer tokens
  const recipient = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Hardhat 기본 계정
  const amount = ethers.parseUnits("100", 18); // 100 토큰
  const tx = await amigo.transfer(recipient, amount);
  await tx.wait();

  console.log(`Transferred ${ethers.formatUnits(amount, 18)} tokens to ${recipient}`);
  // Recipient balance
  const recipientBalance = await amigo.balanceOf(recipient);
  console.log("Recipient's balance:", ethers.formatUnits(recipientBalance, 18));
  const senderBalance = await amigo.balanceOf(deployer);
  console.log("Sender's balance:", ethers.formatUnits(senderBalance, 18));

}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
