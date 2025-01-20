const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying UserContract...");

  // 컨트랙트 가져오기
  const UserContract = await ethers.getContractFactory("UserContract");

  // 컨트랙트 배포
  const userContract = await UserContract.deploy();
  await userContract.deploymentTransaction().wait();

  // 배포 주소 출력
  console.log("Contract deployed to:", userContract.target); // Ethers.js v6 기준
}

main().catch((error) => {
  console.error("Error in deployment:", error);
  process.exitCode = 1;
});
