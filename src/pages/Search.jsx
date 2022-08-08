import React from 'react';
import { PropTypes } from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from '../components/ProductCard';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      input: '',
      items: [],
      check: true,
      validate: false,
    };
  }

  componentDidMount() {
    getCategories().then((categories) => {
      this.setState({ categories });
    });
  }

  handleSelectCategory = ({ target }) => {
    const { categories } = this.state;
    const filter = categories.filter(({ name }) => name.includes(target.value));
    filter
      .map(({ id, name }) => getProductsFromCategoryAndQuery(id, name)
        .then(({ results }) => {
          this.setState({ items: results });
        }));
  }

  handleChange = ({ target }) => {
    this.setState({ input: target.value });
  }

  handleSubmit = () => {
    const { input } = this.state;
    if (!input) return this.setState({ validate: true, check: false });
    getProductsFromCategoryAndQuery(input, input).then(({ results }) => {
      if (results.length === 0) {
        return this.setState({ items: [], validate: true, check: false });
      }
      this.setState({ items: results, check: false, validate: false });
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  }

  render() {
    const { categories, input, items, check, validate } = this.state;
    const { handleCartAddition } = this.props;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          value={ input }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleSubmit }
        >
          Pesquisar
        </button>
        <section>
          {categories.map(({ name }) => (
            <button
              type="button"
              key={ name }
              data-testid="category"
              onClick={ this.handleSelectCategory }
              value={ name }
            >
              { name }
            </button>
          )) }
        </section>
        {validate && <p>Nenhum produto foi encontrado</p>}
        {items.length > 0 && (items
          .map((item) => (
            <ProductCard
              key={ item.id }
              info={ item }
              handleCartAddition={ handleCartAddition }
            />
          )))}
        {check && (
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        )}
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
  handleCartAddition: PropTypes.func.isRequired,
};

export default Search;
