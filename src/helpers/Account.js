import Promise from 'bluebird';
// import Web3 from 'web3';

export default class Account {
  constructor(contract) {
    this.contract = contract;

    const getData = Promise.promisify(this.contract.getData.call, {
      context: this.contract.getData,
    });

    const setData = Promise.promisify(this.contract.setData.call, {
      context: this.contract.setData,
    });

    const getTransaction = Promise.promisify(
      this.contract._eth.getTransaction,
      { context: this.contract._eth },
    );

    this.methods = {
      getData,
      setData,
      getTransaction,
    };
  }

  async getData() {
    const balance = await this.methods.getData();
    console.log(balance);
    return balance.toString();
  }

  async setData(data) {
    await this.methods.setData(data);
  }
}
