pragma solidity ^0.8.4;

contract HelloWorldContract {
    string private data;
    function setData(string memory a) public { data = a; }
    function getData() public view returns(string memory) { return data; }
}
