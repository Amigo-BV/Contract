const { ethers } = require("hardhat");

async function main() {
  console.log("Hardhat ethers version:", ethers.version);

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  console.log("Attempting to parse initial supply...");
  const initialSupply = ethers.parseUnits("1000000", 18); // 수정된 부분
  console.log("Initial supply parsed:", initialSupply.toString());

  const Amigo = await ethers.getContractFactory("Amigo");
  const amigo = await Amigo.deploy(initialSupply); // 배포

  // 컨트랙트 주소 확인
  console.log("Amigo contract deployed at:", amigo.target); // .target 사용
}

main().catch((error) => {
  console.error("Error in deployment:", error);
  process.exit(1);
});
