// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserContract {
    struct User {
        address userAddress;
        string username;
        string profileImageCID;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed userAddress, string username);

    function register(
        string memory _username,
        string memory _profileImageCID
    ) public {
        require(
            bytes(users[msg.sender].username).length == 0,
            "User already registered"
        );
        users[msg.sender] = User(msg.sender, _username, _profileImageCID);
        emit UserRegistered(msg.sender, _username);
    }

    function isUserRegistered(address _userAddress) public view returns (bool) {
        return bytes(users[_userAddress].username).length > 0;
    }

    function getUser(address _userAddress) public view returns (User memory) {
        require(
            bytes(users[_userAddress].username).length > 0,
            "User not found"
        );
        return users[_userAddress];
    }
}
