const { expect } = require("chai");

describe("Amigo Contract", function () {
  let amigo;
  let owner, addr1, addr2;

  beforeEach(async function () {
    const Amigo = await ethers.getContractFactory("Amigo");
    [owner, addr1, addr2] = await ethers.getSigners();
    amigo = await Amigo.deploy();
  });

  it("Should create a profile", async function () {
    await amigo.connect(addr1).createProfile("Alice", "QmHash", "Harvard");
    const profile = await amigo.getProfile(addr1.address);
    expect(profile[0]).to.equal("Alice");
    expect(profile[1]).to.equal("QmHash");
    expect(profile[2]).to.equal("Harvard");
  });

  it("Should send a like", async function () {
    await amigo.connect(addr1).sendLike(addr2.address);
    const likes = await amigo.getLikes(addr2.address);
    expect(likes[0].from).to.equal(addr1.address);
    expect(likes[0].to).to.equal(addr2.address);
    expect(likes[0].isConfirmed).to.be.false;
  });

  it("Should confirm a like", async function () {
    await amigo.connect(addr1).sendLike(addr2.address);
    await amigo.connect(addr2).confirmLike(addr1.address);
    const likes = await amigo.getLikes(addr2.address);
    expect(likes[0].isConfirmed).to.be.true;
  });
});
