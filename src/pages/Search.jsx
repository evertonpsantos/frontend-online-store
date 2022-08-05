import React from 'react';
import { PropTypes } from 'prop-types';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name=""
          id=""
        />
        <ul />
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleClick }
        >
          Carrinho
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Search;
