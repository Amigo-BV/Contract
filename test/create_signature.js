const { ethers } = require("ethers");

async function generateSignature() {
  // 전송자의 개인 키 (예제용, 실제로는 안전하게 보관하세요)
//   public key = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
  const privateKey = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"; // Account #1
  const wallet = new ethers.Wallet(privateKey);

  // 메시지 데이터 (JSON 형태로 직렬화된 객체)
  const message = JSON.stringify({
    to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    amount: "10"
  });

  // 서명 생성
  const signature = await wallet.signMessage(message);

  console.log("Message:", message);
  console.log("Signature:", signature);

  return signature;
}

generateSignature().catch((err) => console.error(err));
