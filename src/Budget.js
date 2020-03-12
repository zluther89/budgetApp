import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: [],
      name: '',
      amount: '',
      total: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBudgetSubmit = this.handleBudgetSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  // need to move to app
  handleBudgetSubmit(e) {
    e.preventDefault();
    let budgetEntry = {
      name: this.state.name,
      amount: this.state.amount
    };
    let total = this.state.total + Number(this.state.amount);
    this.setState({ total: total });
    let tempStorage = this.state.storage.slice();
    tempStorage.push(budgetEntry);
    this.setState({ storage: tempStorage });
    this.state.storage.forEach(entry => (total += entry.amount));
  }

  render() {
    return (
      <div className="box">
        <table className="table" align="center">
          <tr>
            <th className="th" className="title" colSpan="2">
              Monthly Bills
            </th>
          </tr>
          <tr>
            <th className="th">Bill</th>
            <th className="th">Amount($)</th>
          </tr>
          {this.state.storage.map(budgetItem => {
            return (
              <tr>
                <td> {budgetItem.name} </td>
                <td> ${budgetItem.amount}</td>
              </tr>
            );
          })}
        </table>
        <form className="form" onSubmit={this.handleBudgetSubmit}>
          <label className="label">
            Bill
            <input
              className="input"
              type="text"
              id="name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label className="label">
            Amount
            <input
              className="input"
              type="number"
              id="amount"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input className="button is-primary" type="submit" value="Submit" />
        </form>
        <div>
          Note: Please add all bills one at a time before calculating budget
        </div>
        <button
          className="button is-primary"
          onClick={event => {
            this.props.handler(event, this.state);
            this.props.render(event);
          }}
        >
          Calculate Budget
        </button>
      </div>
    );
  }
}

export default Budget;
