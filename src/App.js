import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Search } />
        <Route exact path="/cart" component={ Cart } />
      </BrowserRouter>
    );
  }
}

export default App;
