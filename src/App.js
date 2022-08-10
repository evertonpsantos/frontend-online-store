import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Item from './pages/Item';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0,
    };
  }

  componentDidMount() {
    this.itemVal();
  }

  addToCart = (info) => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems === null) return localStorage.setItem('cart', JSON.stringify([info]));
    localStorage.setItem(
      'cart',
      JSON.stringify([...cartItems, info]),
    );
    this.itemVal();
  }

  itemVal = () => {
    const item = JSON.parse(localStorage.getItem('cart'));
    if (!item) return this.setState({ val: 0 });
    this.setState({ val: item.length });
  }

  render() {
    const { val } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => (<Search
            { ...props }
            handleCartAddition={ this.addToCart }
            quantity={ val }
          />) }
        />
        <Route
          exact
          path="/cart"
          render={ (props) => (<Cart
            { ...props }
          />) }
        />
        <Route
          exact
          path="/item/:id"
          render={ (props) => (<Item
            { ...props }
            handleCartAddition={ this.addToCart }
            quantity={ val }
          />) }
        />
        <Route
          exact
          path="/checkout"
          component={ Checkout }
        />
      </BrowserRouter>
    );
  }
}

export default App;
