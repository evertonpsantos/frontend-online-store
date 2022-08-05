import React from 'react';
import { PropTypes } from 'prop-types';
import { getCategories } from '../services/api';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategories().then((categories) => {
      this.setState({ categories });
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <input
          type="text"
          name=""
          id=""
        />
        <section>
          {categories.map(({ name }) => (
            <button
              type="button"
              key={ name }
              data-testid="category"
            >
              { name }
            </button>
          )) }
        </section>
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
