import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { info } = this.props;
    const { price, title, thumbnail, id } = info;
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
          </div>
        )}
      </main>
    );
  }
}

ProductCard.propTypes = {
  info: PropTypes.shape.isRequired,
};
