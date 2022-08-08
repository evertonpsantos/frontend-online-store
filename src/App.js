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

  removeFromCart = (info) => {
    this.setState((prev) => {
      const previousItems = prev.cartItems;
      previousItems.forEach((item) => {
        console.log(item.amount);
        if (item.id === info.id) {
          console.log('teste');
          item.amount -= 1;
        }
      });
      return ({ cartItems: [...previousItems] });
    }, () => {
      const { cartItems } = this.state;
      cartItems.forEach((item) => {
        if (item.amount === 0) {
          const newItems = cartItems
            .filter((information) => information.id !== info.id);
          this.setState({ cartItems: [...newItems] });
        }
      });
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
            handleCartAddition={ this.addToCart }
          />) }
        />
        <Route
          exact
          path="/cart"
          render={ (props) => (<Cart
            { ...props }
            items={ cartItems }
            handleCartAddition={ this.addToCart }
            handleCartDecreasse={ this.removeFromCart }
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
