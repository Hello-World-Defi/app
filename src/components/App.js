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

    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
  }

  async getData(): any {
    const bal = await this.state.Account.getData();
    console.log(bal);
    this.setState({ balance: bal.toString() });
  }

  async setData(): any {
    const { contracts } = await fetchContracts(this.props.network, ['Account']);
    const acc = new Account(contracts.Account);
    await acc.setData(123);
    this.setState({ Account: acc, balance: 'set' });
  }

  render() {
    return (
      <Container>
        <h1>Hello World DeFi!</h1>
        <p>{this.state.balance}</p>
        <button onClick={this.setData}>Set Account</button>
        <button onClick={this.getData}>Get Balance</button>
      </Container>
    );
  }
}

export default App;
