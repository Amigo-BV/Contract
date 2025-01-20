// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserContract {
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
        // 중복 등록 방지
        require(
            bytes(users[msg.sender].username).length == 0,
            "User already registered"
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

    function getUser(address _userAddress) public view returns (User memory) {
        require(
            bytes(users[_userAddress].username).length > 0,
            "User not found"
        );
        return users[_userAddress];
    }
}
