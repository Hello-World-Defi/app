const deployInfo = require('../helpers/deployInfo');
const Account = artifacts.require('Account');
const AccountHelp = artifacts.require('AccountHelp');

module.exports = async deployer => {
  await deployer.deploy(Account);
  await deployer.deploy(AccountHelp);
  return deployInfo(deployer, Account);
};
