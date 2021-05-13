// @flow

// import _ from 'lodash';
import * as React from 'react';
import { Container } from 'reactstrap';
import fetchContracts from '../helpers/fetchContracts';
import Account from '../helpers/Account';
import './App.css';

type Props = { network: string };

type State = {
  balance: any,
};

class App extends React.Component<Props, State> {
  constructor(props: { network: string }) {
    super(props);
    this.state = {
      balance: '',
    };

    this.getBal = this.getBal.bind(this);
    this.setAcc = this.setAcc.bind(this);
  }

  async componentDidMount(): any {
    // load contracts on react initialization
    const { contracts } = await fetchContracts(this.props.network, ['Account']);
    console.log(contracts.Account);
    const acc = new Account(contracts.Account);
    await acc.setAccount('0x59A9799717481D9485059f406748D7193171c7E9');
    // constconsole.log(acc.getBalance());
    // const bal = await acc.getBalance();
    this.setState({ Account: acc, balance: '' });
  }

  async getBal(): any {
    const bal = await this.state.Account.getBalance();
    console.log(bal);
    this.setState({ balance: bal.toString() });
  }

  async setAcc(): any {
    const { contracts } = await fetchContracts(this.props.network, ['Account']);
    const acc = new Account(contracts.Account);
    const bal = await acc.setAccount(
      '0x59A9799717481D9485059f406748D7193171c7E9',
    );
    console.log(bal);
    this.setState({ Account: acc, balance: bal.toString() });
  }

  render() {
    return (
      <Container>
        <h1>Hello World DeFi!</h1>
        <p>{this.state.balance}</p>
        <button onClick={this.setAcc}>Set Account</button>
        <button onClick={this.getBal}>Get Balance</button>
      </Container>
    );
  }
}

export default App;
