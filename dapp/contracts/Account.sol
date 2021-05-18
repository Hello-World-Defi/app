pragma solidity ^0.8.4;

contract Account {
    uint private data;
    function setData(uint a) public { data = a; }
    function getData() public view returns(uint) { return data; }
}