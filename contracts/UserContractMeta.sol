// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract UserContractMeta {
    using Strings for uint160;

    struct User {
        address userAddress;
        string username;
        string phone;
        string about;
        string profileImageCID;
    }

    mapping(address => User) public users;

    event UserRegistered(
        address indexed userAddress,
        string username,
        string phone,
        string about
    );

    function register(
        string memory _username,
        string memory _phone,
        string memory _about,
        string memory _profileImageCID
    ) public {
        require(
            bytes(users[msg.sender].username).length == 0,
            "Already registered"
        );

        users[msg.sender] = User(
            msg.sender,
            _username,
            _phone,
            _about,
            _profileImageCID
        );
        emit UserRegistered(msg.sender, _username, _phone, _about);
    }

    // 메타트랜잭션용
    function registerWithSig(
        address _user,
        string memory _username,
        string memory _phone,
        string memory _about,
        string memory _profileImageCID,
        bytes memory _signature
    ) public {
        require(
            bytes(users[_user].username).length == 0,
            "User already registered"
        );

        // 메세지 해시
        bytes32 messageHash = _getMessageHash(
            _user,
            _username,
            _phone,
            _about,
            _profileImageCID
        );
        // 이더리움 사인 규격
        bytes32 ethSignedHash = _toEthSignedMessageHash(messageHash);

        // ecrecover
        address signer = _recover(ethSignedHash, _signature);
        require(signer == _user, "Signature invalid or user mismatch");

        // 등록
        users[_user] = User(_user, _username, _phone, _about, _profileImageCID);
        emit UserRegistered(_user, _username, _phone, _about);
    }

    // utils
    function _getMessageHash(
        address _user,
        string memory _username,
        string memory _phone,
        string memory _about,
        string memory _cid
    ) internal pure returns (bytes32) {
        // address -> 0x문자열로 변환
        // Strings.toHexString(uint160(_user), 20)은 '0x' + 40자리 hex string 반환
        return
            keccak256(
                abi.encodePacked(
                    "Register:",
                    Strings.toHexString(uint160(_user), 20),
                    ":",
                    _username,
                    ":",
                    _phone,
                    ":",
                    _about,
                    ":",
                    _cid
                )
            );
    }

    function _toEthSignedMessageHash(
        bytes32 _hash
    ) internal pure returns (bytes32) {
        // "\x19Ethereum Signed Message:\n32" + hash
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash)
            );
    }

    function _recover(
        bytes32 _ethSignedHash,
        bytes memory _signature
    ) internal pure returns (address) {
        require(_signature.length == 65, "Signature length invalid");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }

        if (v < 27) {
            v += 27;
        }
        require(v == 27 || v == 28, "Invalid v");

        return ecrecover(_ethSignedHash, v, r, s);
    }

    function getUser(address _userAddress) public view returns (User memory) {
        require(
            bytes(users[_userAddress].username).length > 0,
            "User not found"
        );
        return users[_userAddress];
    }
}
