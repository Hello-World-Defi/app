const deployInfo = require('../helpers/deployInfo');
const Account = artifacts.require('Account');

module.exports = async deployer => {
  await deployer.deploy(Account);
  return deployInfo(deployer, Account);
};
