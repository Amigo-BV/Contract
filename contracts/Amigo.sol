// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Amigo {
    struct Profile {
        string nickname;
        string ipfsHash;
        string education;
        uint256 nftTokenId;
    }

    struct Like {
        address from;
        address to;
        bool isConfirmed;
    }

    mapping(address => Profile) private profiles;
    mapping(address => Like[]) private likes;

    function createProfile(string memory _nickname, string memory _ipfsHash, string memory _education) public {
        profiles[msg.sender] = Profile(_nickname, _ipfsHash, _education, 0);
    }

    function sendLike(address _to) public {
        likes[_to].push(Like(msg.sender, _to, false));
    }

    function confirmLike(address _from) public {
        for (uint i = 0; i < likes[msg.sender].length; i++) {
            if (likes[msg.sender][i].from == _from) {
                likes[msg.sender][i].isConfirmed = true;
            }
        }
    }
}
