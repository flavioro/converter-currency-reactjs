import React, { Component } from 'react';

import './Converter.css';

export default class Converter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currencyValueA: '',
      currencyValueB: 0,
      currencyQuotation: 0
    }

    this.converter = this.converter.bind(this)
  }

  async converter() {
    let fromTo = `${this.props.currencyA}_${this.props.currencyB}`
    const key = '5b812531a7ab457add23'
    let url = `https://free.currconv.com/api/v7/convert?q=${fromTo}&compact=ultra&apiKey=${key}`
    // https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=5b812531a7ab457add23
    // https://free.currconv.com/api/v7/convert?q=USD_BRL&compact=ultra&apiKey=5b812531a7ab457add23

    // fetch(url)
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(json => {
    //     let quatiton = json[fromTo]
    //     let currencyValueB = (parseFloat(this.state.currencyValueA) * quatiton).toFixed(2)
    //     this.setState({currencyValueB})
    //   })

    const response = await fetch(url);
    const currency = await response.json();
    // console.log(currency.USD_BRL)
    console.log(currency[fromTo])
    const currencyQuotation = (currency[fromTo]).toFixed(2)
    this.setState({currencyQuotation})
    
    let quatiton = currency[fromTo]
    const quantity = parseFloat(this.state.currencyValueA)
    // console.log(quantity)
    let currencyValueB = (quantity * quatiton).toFixed(2)
    // console.log(currencyValueB)
    this.setState({currencyValueB})
  }

  render() {
    return (
      <div className='Converter'>
        <h2>{this.props.currencyA} to {this.props.currencyB}</h2>
        <input type='text' onChange={(event) => {this.setState({currencyValueA:event.target.value})}}></input>
        <button type='button' value='Converter' onClick={() => this.converter()}>Converter</button>
        <h2>{this.state.currencyValueB}</h2>
        <h3>quotation now {this.state.currencyQuotation}</h3>
      </div>
    )
  }
}


