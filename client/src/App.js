import React, { Component } from 'react';
import Lottery from './contracts/Lottery.json';
import getWeb3 from './getWeb3';

import Information from './components/Information';
import Play from './components/Play';
import Manager from './components/Manager';

import './App.css';

class App extends Component {
  state = {
    testContract: '',
    web3: null,
    accounts: null,
    contract: null,
    manager: null,
    players: [],
    lastWinner: '',
    balance: 0,
  };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Lottery.networks[networkId];
      const instance = new web3.eth.Contract(
        Lottery.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);

      const manager = await this.state.contract.methods.manager().call();
      const players = await this.state.contract.methods.getPlayers().call();
      const balance =
        (await web3.eth.getBalance(this.state.contract.options.address)) /
        1000000000000000000;

      this.setState({ manager, players, balance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    const result = await contract.methods.test().call({ from: accounts[0] });
    this.setState({ testContract: result });
  };

  enter = async (e, value) => {
    e.preventDefault();
    console.log('you send: ' + value + 'ETH');
    const { accounts, contract, web3 } = this.state;
    await contract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value.toString(), 'ether'),
    });
    this.updateState();
  };

  pickWinner = async (e) => {
    e.preventDefault();
    const { accounts, contract, web3 } = this.state;
    if (accounts[0] !== this.state.manager) {
      throw Error('You are not the manager');
    }
    try {
      var winner = await contract.methods
        .pickWinner()
        .send({ from: accounts[0] });
      winner = winner.events.lastWinner.returnValues.winner;
      this.setState({ lastWinner: winner });
      //this.setState({ lastWinner: winner });
    } catch (err) {
      console.log(err);
    }
    this.updateState();
  };

  updateState = async () => {
    console.log('update!!');
    const { accounts, contract, web3 } = this.state;
    this.setState({
      players: await this.state.contract.methods.getPlayers().call(),
      balance:
        (await web3.eth.getBalance(this.state.contract.options.address)) /
        1000000000000000000,
    });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <main>
        <div className="info">
          <Information
            you={this.state.accounts[0]}
            manager={this.state.manager}
            lastWinner={this.state.lastWinner}
            players={this.state.players.length}
            balance={this.state.balance}
          />
        </div>
        <div className="game">
          <div className="enter">
            <Play enter={this.enter} />
          </div>
          <div className="winner">
            <Manager pickWinner={this.pickWinner} />
          </div>
        </div>
        <div className="rules">
          <p>
            The rules are simples. In each round of the lottery, anybody can
            send Ether to the smart contract. When enough participants have sent
            their money, the lottery will determine a winner and send him/her a
            prize.
          </p>
        </div>
      </main>
    );
  }
}

export default App;
