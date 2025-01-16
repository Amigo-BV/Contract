// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Amigo {
    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(uint256 initialSupply) {
        balances[msg.sender] = initialSupply;  // 컨트랙트 배포자에게 초기 공급량 할당
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;  // 송금자에서 금액 차감
        balances[to] += amount;  // 수신자에게 금액 추가
        
        emit Transfer(msg.sender, to, amount);  // 이벤트 발행

        return true;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];  // 특정 주소의 잔액 조회
    }
}
