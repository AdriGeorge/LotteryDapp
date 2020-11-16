// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.0 < 0.8.0;

contract Lottery{
    address public manager;
    address payable[] public players;
    
    modifier restricter(){
        require(msg.sender == manager, "You are not the owner");
        _;
    }

    event lastWinner(address winner);
    
    constructor() public{
        manager = msg.sender;
    }
    
    // a player enter in the lottery and send the amount to play
    function enter() public payable {
        // amount in wei the value of 0.01 ether
        require(msg.value > .01 ether, "0.1 eth is minimum");
        
        // insert into the lottery
        if (!alreadyInside(msg.sender)){
            players.push(msg.sender);
        }
    }

     function alreadyInside(address player) private view returns(bool){
        if(players.length == 0) return false;
        for (uint i=0; i< players.length; i++) {
            if(players[i] == player){
                return true;
            }
        }
        return false;
    }
    
    function random() private view returns(uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, now , players)));
        
    }
    
    // select a random player and reset all
    function pickWinner() public restricter {
        uint256 index = random() % players.length;
        
        // give to the winner all the money with tranfer(this.balance)
        players[index].transfer(address(this).balance);
        
        emit lastWinner(players[index]);

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