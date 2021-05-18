// @flow

// import _ from 'lodash';
import * as React from 'react';
import { Container } from 'reactstrap';
import fetchContracts from '../helpers/fetchContracts';
// import Account from '../helpers/Account';
import './App.css';

type Props = { network: string };

type State = {
  balance: any,
};

class App extends React.Component<Props, State> {
  constructor(props: { network: string }) {
    super(props);
    this.state = {
      Account: null,
      balance: '',
    };

    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.loadContract = this.loadContract.bind(this);
  }

  async loadContract(): any {
    const { contracts } = await fetchContracts(this.props.network, ['Account']);
    this.setState({ Account: contracts.Account, balance: 'loaded' });
  }

  async getData(): any {
    const bal = await this.state.Account.getData();
    this.setState({ balance: bal.toString() });
  }

  async setData(): any {
    await this.state.Account.setData(123);
  }

  render() {
    return (
      <Container>
        <h1>Hello World DeFi!</h1>
        <p>{this.state.balance}</p>
        <button onClick={this.loadContract}>Load Contract</button>
        <button onClick={this.setData}>Set Data</button>
        <button onClick={this.getData}>Get Data</button>
      </Container>
    );
  }
}

export default App;
