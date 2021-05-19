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
      HelloWorldContract: null,
      status: 'Loading',
    };

    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
  }

  async componentDidMount(): any {
    const { contracts } = await fetchContracts(this.props.network, [
      'HelloWorldContract',
    ]);
    this.setState({
      HelloWorldContract: contracts.HelloWorldContract,
      status: 'Contracts Fetched',
    });
  }

  async getData(): any {
    const bal = await this.state.HelloWorldContract.getData();
    this.getter.value = bal.toString();
  }

  async setData(): any {
    await this.state.HelloWorldContract.setData(this.setter.value);
    this.setter.value = '';
    this.getter.value = '';
  }

  render() {
    return (
      <Container>
        <h1>Hello World DeFi!</h1>
        <p>{this.state.status}</p>
        <input
          ref={el => {
            this.setter = el;
          }}
        ></input>
        <button onClick={this.setData}>Set Data</button>
        <br></br>
        <input
          ref={el => {
            this.getter = el;
          }}
          readOnly
        ></input>
        <button onClick={this.getData}>Get Data</button>
      </Container>
    );
  }
}

export default App;
