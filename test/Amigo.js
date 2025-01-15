// test/Amigo.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Amigo", function () {
  let Amigo, amigo;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // 테스트에 사용될 계정들 가져오기
    [owner, addr1, addr2] = await ethers.getSigners();

    // 컨트랙트 팩토리 얻어오기
    Amigo = await ethers.getContractFactory("Amigo");

    // Amigo 컨트랙트 배포 (예: 초기 공급량 1000)
    amigo = await Amigo.deploy(1000);
  });

  it("배포 시 컨트랙트 배포자에게 초기 공급량이 할당되어야 한다", async function () {
    const ownerBalance = await amigo.balanceOf(owner.address);
    expect(ownerBalance).to.equal(1000);
  });

  it("토큰을 계정 간에 정상적으로 전송할 수 있어야 한다", async function () {
    // owner가 addr1에게 토큰 50개 전송
    await amigo.transfer(addr1.address, 50);
    const addr1Balance = await amigo.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(50);
  });

  it("송금자의 잔액이 부족할 경우 전송이 실패해야 한다", async function () {
    // addr1은 초기 잔액이 없으므로, 전송 시 에러가 발생해야 함
    await expect(
      amigo.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("Insufficient balance");
  });

  it("전송 후 잔액이 정상적으로 갱신되어야 한다", async function () {
    const initialOwnerBalance = await amigo.balanceOf(owner.address);

    // owner -> addr1: 100 토큰 전송
    await amigo.transfer(addr1.address, 100);

    // 잔액 확인
    const finalOwnerBalance = await amigo.balanceOf(owner.address);
    const addr1Balance = await amigo.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);
  });
});
