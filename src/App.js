import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Request from './request';
import ExpandableList from './ExpandableList';
class App extends Component {
  constructor(){
    super();

    this.state = {
      products: {}
    };
  }
  async componentDidMount(){
    const products = await Request.fetchAsync("https://api.pro.coinbase.com/products", { forceResolve: true });
    const productObjects = products.reduce((accum, currValue) => {
      const {
        id,
        base_currency: baseCurrency,
        quote_currency: quoteCurrency
      } = currValue;
      return {
        ...accum,
        [baseCurrency]: (accum[baseCurrency] ?
          accum[baseCurrency].concat({ id, baseCurrency, quoteCurrency }) : [ { id, baseCurrency, quoteCurrency }])
      }
    }, {});
    this.setState({ products: productObjects })
    // // const y = await Promise.all(
    // //   products.map(async ({id}) => (
    // //     await Request.fetchAsync(`https://api.pro.coinbase.com/products/${id}/stats`, {forceResolve: true}, 1, id)
    // //   ))
    // // );
    // console.log(products)
    // console.log(y)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <ExpandableList
              items={this.state.products} />
              {Object.keys(items).map((item, i) => (
                (
                  <ListItem>
                    <h2>{item}</h2>
                    <img key={`${item}${i}`} src={require(`../node_modules/cryptocurrency-icons/32/icon/${item.toLowerCase()}.png`)} />
                    <ExpandableList>
                    </ExpandableList>
                  </Listitem>
                )
              ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
