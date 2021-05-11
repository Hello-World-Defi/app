pragma solidity ^0.8.4;

contract Account {
    function getBalance() public view returns(uint callData) {
        return address(this).balance;
    }
}
