import Promise from 'bluebird';

export default class Account {
  constructor(contract) {
    this.contract = contract;

    const getBalance = Promise.promisify(this.contract.getBalance.call, {
      context: this.contract.getBalance,
    });
    const getTransaction = Promise.promisify(
      this.contract._eth.getTransaction,
      { context: this.contract._eth },
    );

    this.methods = {
      getBalance,
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
}
