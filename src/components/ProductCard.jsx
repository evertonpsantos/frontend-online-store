import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { info, handleCartAddition } = this.props;
    const { price, title, thumbnail, id, amount = 1 } = info;
    return (
      <main>
        { info && (

          <div data-testid="product">
            <h4>
              { title }
            </h4>
            <p>{ price }</p>
            <img
              src={ thumbnail }
              alt={ title }
            />
            <Link
              data-testid="product-detail-link"
              to={ `/item/${id}` }
            >
              Detalhes:
            </Link>
            <button
              type="button"
              data-testid="product-add-to-cart"
              onClick={ () => handleCartAddition(({ id, title, price, amount })) }
            >
              Adicionar ao carrinho
            </button>
          </div>
        )}
      </main>
    );
  }
}

ProductCard.propTypes = {
  info: PropTypes.shape({
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    amount: PropTypes.number,
  }).isRequired,
  handleCartAddition: PropTypes.func.isRequired,
};
