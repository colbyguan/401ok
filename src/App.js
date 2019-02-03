import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annualSalary: 0,
      contrib: 0,
      tax: 0,
      expenses: 0
    }
  }
  updateValue = (key) => {
    return (event) => {
      this.setState({
        [key]: parseFloat(event.target.value)
      });
    };
  }
  numbers() {
    let monthlySalary = this.state.annualSalary / 12;
    let monthlyContrib = this.state.contrib / 12;
    let contribPercent = this.state.contrib / this.state.annualSalary;
    let earningsAfterTax = (100 - this.state.tax)/100 * (monthlySalary - monthlyContrib);
    let lossToTax = this.state.tax/100 * (monthlySalary - monthlyContrib);
    let earningsAfterAll = earningsAfterTax - this.state.expenses;

    let values = [contribPercent, lossToTax, earningsAfterTax, earningsAfterAll];
    return values.map(val => (isNaN(val) || !isFinite(val) ? '--' : this.toTwoDigits(val)));
  }
  toTwoDigits(num) {
    return Math.round(num * 100) / 100
  }
  render() {
    let numbers = this.numbers()
    return (
      <div className="App">
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="salary-annual">Annual salary</label>
              <input type="number" className="form-control" id="salary-annual" placeholder="($)0.00" onChange={this.updateValue('annualSalary')} />
            </div>
            <div className="form-group">
              <label htmlFor="contrib-annual">Annual 401k contribution (dollar amount)</label>
              <input type="number" className="form-control" id="contrib-annual" placeholder="($)0.00" onChange={this.updateValue('contrib')} />
            </div>
            <div className="form-group">
              <label htmlFor="tax-rate">Estimated tax rate</label>
              <input type="number" className="form-control" id="contrib-annual" placeholder="0(%)" onChange={this.updateValue('tax')} />
            </div>
            <div className="form-group">
              <label htmlFor="tax-rate">Total monthly expenses (eg. rent)</label>
              <input type="number" className="form-control" id="expenses" placeholder="($)0.00" onChange={this.updateValue('expenses')} />
            </div>
          </form>
          <ul className="list-group">
            <li className="list-group-item">Contribution percentage: {numbers[0]}</li>
            <li className="list-group-item">Money lost to taxes: {numbers[1]}</li>
            <li className="list-group-item">Monthly earnings after tax: {numbers[2]}</li>
            <li className="list-group-item">Monthly earnings after tax and expenses: {numbers[3]}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
