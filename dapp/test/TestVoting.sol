pragma solidity ^0.8.4;

import "truffle/Assert.sol";
import "../contracts/Voting.sol";

contract TestVoting {

  function stringToBytes32(string memory source) public pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 32))
    }
  }
  
  bytes32 joeBytes = stringToBytes32("joe");
  bytes32 bobBytes = stringToBytes32("bob");
  bytes32[] testNames;
  Voting voting;

  function beforeAll() public {
    testNames.push(joeBytes);
    testNames.push(bobBytes);
  }t

  function beforeEach() public {
    voting = new Voting(testNames);
  }

  function testConstructorSetsInitialNames() public {
    Assert.equal(voting.candidateList(0), joeBytes, "Initial candidate should be joe");
    Assert.equal(voting.candidateList(1), bobBytes, "Initial candidate should be bob");
    Assert.equal(voting.getCandidateListLength(), 2, "List has length 2");
  }

  function testInitialVoteTotal() public {
    Assert.equal(voting.totalVotesFor(bobBytes), uint(0), "Initial votes for bob is 0");
  }

  function testValidCandidate() public {
    bytes32 lisaBytes = stringToBytes32("lisa");
    Assert.isTrue(voting.validCandidate(joeBytes), "joe is a valid candidate");
    Assert.isFalse(voting.validCandidate(lisaBytes), "lisa is an invalid candidate");
  }

  function testVoteForCandidate() public {
    voting.voteForCandidate(joeBytes);
    Assert.equal(voting.totalVotesFor(joeBytes), uint(1), "One vote for joe");
  }
}
