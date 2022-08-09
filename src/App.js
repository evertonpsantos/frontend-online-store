import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Item from './pages/Item';

class App extends React.Component {
  addToCart = (info) => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems === null) return localStorage.setItem('cart', JSON.stringify([info]));
    localStorage.setItem(
      'cart',
      JSON.stringify([...cartItems, info]),
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => (<Search
            { ...props }
            handleCartAddition={ this.addToCart }
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
          />) }
        />
      </BrowserRouter>
    );
  }
}

export default App;
