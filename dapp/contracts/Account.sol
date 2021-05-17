pragma solidity ^0.8.4;

contract AccountHelp {
    uint private data;
    function setData(uint a) public { data = a; }
    function getData() public view returns(uint) { return data; }
}

contract Account {
    function setData(uint a) public {}
    function getData() public returns(uint) {
        AccountHelp a = new AccountHelp();
        a.setData(10);
        return a.getData();
    }
}
