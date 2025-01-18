const { ethers } = require("ethers");

async function generateSignature(from, to, amount, privateKey) {
  const wallet = new ethers.Wallet(privateKey);

  const message = `Transfer: ${from} ${to} ${amount}`;
  const signature = await wallet.signMessage(message);

  const walletAddress = wallet.address; // 서명자의 주소

  console.log("Generated Data for transfer:");
  console.log("from:", walletAddress);
  console.log("to:", to);
  console.log("amount:", amount);
  console.log("Signature:", signature);

  return { address: walletAddress, message, signature };
}

const from = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Account #3
const to = "0x90F79bf6EB2c4f870365E785982E1f101E93b906"; // Account #5
const amount = "100";
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Account #1
generateSignature(from, to, amount, privateKey).catch(console.error);
