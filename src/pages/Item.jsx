import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { productsByTheId } from '../services/api';

export default class Item extends Component {
  constructor() {
    super();
    this.state = {
      result: {},
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    productsByTheId(id).then((result) => {
      this.setState({ result });
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  }

  render() {
    const { result: { id, title, price, thumbnail, amount = 1 } } = this.state;
    const { handleCartAddition } = this.props;
    return (
      <>
        <div>
          <h3 data-testid="product-detail-name">{ title }</h3>
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt={ title }
          />
          <p data-testid="product-detail-price">{ price }</p>
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => handleCartAddition(({ id, title, price, amount })) }
        >
          Adicionar ao carrinho
        </button>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleClick }
        >
          Carrinho
        </button>
      </>
    );
  }
}

Item.propTypes = {
  match: PropTypes.object,
}.isRequired;
