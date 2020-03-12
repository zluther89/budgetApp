import React from 'react';
import axios from 'axios';
import moment from 'moment';

class PurchaseLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      date: moment().format('MMM Do YY'),
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
      <div className="column is-half">
        <div className="title">Purchase Log</div>
        <form>
          <label className="label">{'Name:  '}</label>
          <input
            className="input"
            onChange={event => this.handleChange(event, 'name')}
          ></input>
          <br />
          <label className="label">Cost: </label>
          <input
            className="input"
            type="number"
            onChange={event => this.handleChange(event, 'price')}
          ></input>
          <br />
          <label className="label" for="category">
            Category:{' '}
          </label>
          <div className="select is-primary">
            <select
              className="select is-multiple"
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
          </div>
          <br />
          <button
            className="button is-primary"
            onClick={event => this.props.handler(event, this.state)}
          >
            Submit Purchase
          </button>
        </form>
      </div>
    );
  }
}

export default PurchaseLog;
