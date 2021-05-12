import Promise from 'bluebird';

export default class Account {
  constructor(contract) {
    this.contract = contract;

    const getBalance = Promise.promisify(this.contract.getBalance.call, {
      context: this.contract.getBalance,
    });

    const setAccount = Promise.promisify(this.contract.setAccount.call, {
      context: this.contract.setAccount,
    });

    const getTransaction = Promise.promisify(
      this.contract._eth.getTransaction,
      { context: this.contract._eth },
    );

    this.methods = {
      getBalance,
      setAccount,
      getTransaction,
    };
  }

  async waitForBlock(tx) {
    let elapsed = 0;
    let delay = 1000;
    while (elapsed < 10 * 60 * 1000) {
      let txObject = await this.methods.getTransaction(tx);
      if (txObject && txObject.blockNumber) {
        return txObject;
      } else {
        await Promise.delay(delay);
        elapsed = elapsed + delay;
        delay = Math.floor(1.5 * delay);
      }
    }
    throw new Error('Timed out waiting for votes to be recorded in a block.');
  }

  async getBalance() {
    const balance = await this.methods.getBalance();
    console.log(balance);
    return balance.toString();
  }

  async setAccount(account) {
    try {
      console.log(account);
      const tx = await this.methods.setAccount(account, {
        gas: 100000,
        gasPrice: 3000000000,
      });
      console.log('tx', tx);
      await this.waitForBlock(tx);
    } catch (err) {
      if (!err.message.match(/User denied transaction signature/)) {
        throw err;
      }
    }
    const bal = await this.getBalance();
    console.log(bal);
    return bal;
  }
}
