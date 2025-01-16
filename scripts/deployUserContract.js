const hre = require("hardhat");

async function main() {
    const UserContract = await ethers.getContractFactory("UserContract");
    const userContract = await UserContract.deploy(); // 컨트랙트 배포
    console.log("Deploying UserContract...");
  
    // 배포 완료될 때까지 대기
    const deployedContract = await userContract.waitForDeployment();
    console.log(`Contract deployed to: ${deployedContract.target}`);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
