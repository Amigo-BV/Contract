const { ethers } = require("hardhat");

async function main() {
  const UserContractMeta = await ethers.getContractFactory("UserContractMeta");
  const contract = await UserContractMeta.deploy();
  await contract.deploymentTransaction().wait();

  console.log("Deployed to:", contract.target); // Ethers v6 기준
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
