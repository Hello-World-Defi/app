pragma solidity ^0.8.4;

import "./owned.sol";

contract mortal is owned {
    function kill() public {
        if (msg.sender == owner)
            selfdestruct(payable(owner));
    }
}
