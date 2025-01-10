const hre = require("hardhat");

async function main() {
    // Amigo 컨트랙트 가져오기
    const Amigo = await hre.ethers.getContractFactory("Amigo");

    // Amigo 컨트랙트 배포
    const amigo = await Amigo.deploy();

    // 배포 완료 대기
    await amigo.deployed();

    console.log("Amigo deployed to:", amigo.address);
}

// 에러 처리 포함 메인 실행
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
