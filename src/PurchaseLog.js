import React from "react";
import axios from "axios";

class PurchaseLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      date: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  postPurchase(purchase) {
    axios
      .post("/log")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  handleChange(e, stateProp) {
    let stateObj = {};
    stateObj[stateProp] = e.target.value;
    this.setState(stateObj);
  }

  render() {
    <form>
      <label>Purchase name</label>
      <input onChange={this.handleChange(event, "name")}></input>
      <label>Cost of purchase</label>
      <input onChange={this.handleChange(event, "price")}></input>
      <label>date</label>
      <input onChange={this.handleChange(event, "date")}></input>
      <button onClick={() => this.postPurchase(this.state)}>
        Submit Purchase
      </button>
    </form>;
  }
}

export default PurchaseLog;
