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
  }

  async componentDidMount(): any {
    // load contracts on react initialization
    const { contracts } = await fetchContracts(this.props.network, ['Account']);
    const acc = new Account(contracts.Account);
    await acc.setAccount('0x7D47deeCAa36A64927c4569F0b091424e4AB3B57');
    const bal = await acc.getBalance();
    this.setState({ Account: acc, balance: bal });
  }

  getBal = () => async () => {
    const bal = await this.state.Account.getBalance();
    console.log(bal);
    this.setState({ balance: bal.toString() });
  };

  render() {
    return (
      <Container>
        <h1>Hello World DeFi!</h1>
        <p>{this.state.balance}</p>
        <button onClick={this.getBal}>Get Balance</button>
      </Container>
    );
  }
}

export default App;
