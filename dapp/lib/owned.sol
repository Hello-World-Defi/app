pragma solidity ^0.8.4;

contract owned {
    address owner;

    modifier onlyowner() {
        if (msg.sender == owner) {
            _;
        }
    }

    constructor() {
        owner = msg.sender;
    }
}
