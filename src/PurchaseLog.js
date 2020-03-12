import React from 'react';
import axios from 'axios';

class PurchaseLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      date: Date.now(),
      category: 'restaurants/bars'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  //handles change to input form
  handleChange(e, stateProp) {
    let value = e.target.value;
    if (stateProp === 'price') {
      value = Number(value);
    }
    let stateObj = {};
    stateObj[stateProp] = value;
    this.setState(stateObj);
    console.log(this.state);
  }
  //handles change to drop down select element
  handleSelect(event) {
    this.setState({ category: event.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="purchase">Purchase Log</div>
        <form>
          <label>{'Name:  '}</label>
          <input onChange={event => this.handleChange(event, 'name')}></input>
          <br />
          <label>Cost: </label>
          <input
            type="number"
            onChange={event => this.handleChange(event, 'price')}
          ></input>
          <br />
          <label for="category">Category: </label>
          <select
            onChange={e => this.handleSelect(e)}
            id="category"
            name="category"
          >
            <option value="restaurants/bars">Restaurants/Bars</option>
            <option value="groceries">Groceries</option>
            <option value="transportation">Transportation</option>
            <option value="recreation">Recreation</option>
            <option value="other">Other</option>
          </select>
          <br />
          <button onClick={event => this.props.handler(event, this.state)}>
            Submit Purchase
          </button>
        </form>
      </div>
    );
  }
}

export default PurchaseLog;
