import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Item from './pages/Item';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Search } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/item/:id" component={ Item } />
      </BrowserRouter>
    );
  }
}

export default App;
