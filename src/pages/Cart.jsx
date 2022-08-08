import React from 'react';
import { PropTypes } from 'prop-types';

export default class Cart extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <div>
        { items.length > 0
          ? (items
            .map((item) => {
              const { price, title, id, amount = 1 } = item;
              return (
                <div key={ id }>
                  <h4 data-testid="shopping-cart-product-name">{ title }</h4>
                  <h5>{ price }</h5>
                  <h5 data-testid="shopping-cart-product-quantity">{ amount }</h5>
                </div>
              );
            }))
          : <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2> }
      </div>
    );
  }
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
    length: PropTypes.number,
    map: PropTypes.func,
  })).isRequired,
};
