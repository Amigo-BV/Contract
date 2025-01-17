const { ethers } = require("ethers");

async function generateLoginSignature(privateKey, address) {
  const wallet = new ethers.Wallet(privateKey);

  // 컨트롤러와 동일한 메시지 형식
  const message = `Login: ${address}`;
  
  const signature = await wallet.signMessage(message); // 서명 생성
  const walletAddress = wallet.address; // 서명자의 주소

  console.log("Generated Data for Login:");
  console.log("Address:", walletAddress);
  console.log("Message:", message);
  console.log("Signature:", signature);

  return { address: walletAddress, message, signature };
}

// 사용 예제
const privateKey = "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6";
generateLoginSignature(privateKey, "0x90F79bf6EB2c4f870365E785982E1f101E93b906").catch(console.error);
