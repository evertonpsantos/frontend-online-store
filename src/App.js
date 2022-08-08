import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Item from './pages/Item';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  addToCart = (info) => {
    this.setState((prev) => {
      const amountChecker = prev.cartItems.some((item) => item.id === info.id);
      if (amountChecker) {
        const previousItems = prev.cartItems;
        const repetedItem = previousItems.find((item) => item.id === info.id);
        const index = previousItems.indexOf(repetedItem);
        previousItems[index].amount += 0.5;
        return ({ cartItems: [...previousItems] });
      }
      return ({ cartItems: [...prev.cartItems, info] });
    });
  }

  render() {
    const { cartItems } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => (<Search
            { ...props }
            handleCardAddition={ this.addToCart }
          />) }
        />
        <Route
          exact
          path="/cart"
          render={ (props) => (<Cart
            { ...props }
            items={ cartItems }
          />) }
        />
        <Route
          exact
          path="/item/:id"
          render={ (props) => (<Item
            { ...props }
            handleCardAddition={ this.addToCart }
          />) }
        />
      </BrowserRouter>
    );
  }
}

export default App;
