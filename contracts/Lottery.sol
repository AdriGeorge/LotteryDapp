// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.0 < 0.8.0;

contract Lottery{
    address public manager;
    address payable[] public players;
    
    modifier restricter(){
        require(msg.sender == manager);
        _;
    }
    
    constructor() public {
        manager = msg.sender;
    }
    
    // a player enter in the lottery and send the amount to play
    function enter() public payable {
        // amount in wei the value of 0.01 ether
        require(msg.value > .01 ether);
        
        // insert into the lottery
        players.push(msg.sender);
    }
    
    function random() private view returns(uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp ,players)));
    }
    
    // select a random player and reset all
    function pickWinner() public restricter {
        uint256 index = random() % players.length;
        
        // give to the winner all the money with tranfer(this.balance)
        players[index].transfer(address(this).balance);
        
        //reset
        players = new address payable[](0);
        
    }
    
    function getPlayers() public view returns(address payable[] memory) {
        return players;
    }

    function test () public pure returns (string memory) {
        return "Every thing is ok!";
    }
}