require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // 환경 변수 사용을 위해 .env 파일 로드

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27", // Solidity 버전 설정
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // 하드햇 로컬 네트워크
    },
    sepolia: {
      url: process.env.API_URL, // Sepolia 네트워크 RPC URL
      accounts: [process.env.PRIVATE_KEY], // .env 파일에서 개인 키 로드
    },
  },
};
