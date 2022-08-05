import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { info } = this.props;
    const { price, title, thumbnail } = info;
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
          </div>
        )}
      </main>
    );
  }
}

ProductCard.propTypes = {
  info: PropTypes.shape.isRequired,
};
