const deployInfo = require('../helpers/deployInfo');
const HelloWorldContract = artifacts.require('HelloWorldContract');

module.exports = async deployer => {
  await deployer.deploy(HelloWorldContract);
  return deployInfo(deployer, HelloWorldContract);
};
