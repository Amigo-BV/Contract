const { ethers } = require("ethers");

async function generateLoginSignature(privateKey, address) {
  const wallet = new ethers.Wallet(privateKey);

  // 컨트롤러와 동일한 메시지 형식
  const message = `Register: ${address}`;
  
  const signature = await wallet.signMessage(message); // 서명 생성
  const walletAddress = wallet.address; // 서명자의 주소

  console.log("Generated Data for Login:");
  console.log("Address:", walletAddress);
  console.log("Message:", message);
  console.log("Signature:", signature);

  return { address: walletAddress, message, signature };
}

// 사용 예제
const privateKey = "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba";
const publicKey = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc";
generateLoginSignature(privateKey, publicKey).catch(console.error);
