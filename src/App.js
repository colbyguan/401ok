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
    let contribPercent = this.state.contrib / this.state.annualSalary * 100;
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
        <p></p>
          <div className="form-card">
            <div className="form">
              <div className="input-field">
                <label htmlFor="salary-annual">($) Annual salary</label>
                <input type="number" className="form-control" id="salary-annual" onChange={this.updateValue('annualSalary')} />
                <small>Your pre-tax salary in your offer letter</small>
              </div>
              <div className="input-field">
                <label htmlFor="contrib-annual">($) Annual 401k contribution (dollar amount)</label>
                <input type="number" className="form-control" id="contrib-annual" onChange={this.updateValue('contrib')} />
                <small>Maximum of $19,000 in 2019. See <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits">here</a> for details</small>
              </div>
              <div className="input-field">
                <label htmlFor="tax-rate">(%) Estimated tax rate</label>
                <input type="number" className="form-control" id="contrib-annual" onChange={this.updateValue('tax')} />
                <small>Out of 100%. See <a href="https://www.google.com/search?q=tax+bracket">here</a> for tax brackets</small>
              </div>
              <div className="input-field">
                <label htmlFor="expenses">($) Total monthly expenses (eg. rent)</label>
                <input type="number" className="form-control" id="expenses" onChange={this.updateValue('expenses')} />
              </div>
            </div>
            <div className="results">
              <div className="row">
                <div className="col s6 labels">
                  <p>Desired contribution percentage</p>
                  <p>Loss to taxes</p>
                  <p>Monthly earnings after tax:</p>
                  <p>Monthly earnings after tax and expenses:</p>
                </div>
                <div className="col s6 numbers">
                  <p>{numbers[0]}%</p>
                  <p>${numbers[1]}</p>
                  <p>${numbers[2]}</p>
                  <p>${numbers[3]}</p>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <small>By contributing more, you may lose less money to taxes with the tradeoff of having less monthly take-home earnings</small>
                  <br /><br />
                  <small><strong>Note: this app does not collect or send any of the entered or calculated data.</strong></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
