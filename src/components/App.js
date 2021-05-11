// @flow

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
      balance: 'loading',
    };
  }

  async componentDidMount(): any {
    const { contracts } = await fetchContracts(this.props.network, ['Account']);
    // const acc = new Account(contracts.Account);
    const bal = await contracts.Account.getBalance();
    this.setState({ balance: bal.toString() });
  }

  render() {
    return (
      <Container>
        <h1>Hello World DeFi!</h1>
        <p>{this.state.balance}</p>
      </Container>
    );
  }
}

export default App;
