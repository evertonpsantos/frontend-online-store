import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartValue extends Component {
  render() {
    const { quantity } = this.props;
    return (
      <div data-testid="shopping-cart-size">{ quantity }</div>
    );
  }
}

CartValue.propTypes = {
  quantity: PropTypes.number.isRequired,
};
