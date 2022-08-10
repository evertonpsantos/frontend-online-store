import React from 'react';
import { PropTypes } from 'prop-types';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      err: true,
    };
  }

  componentDidMount() {
    this.getTheItems();
  }

  addQuantity = (item) => {
    const { cartItems } = this.state;
    cartItems.forEach((val) => {
      if (val.id === item.id && item.amount < val.aQ) {
        val.amount += 1;
      }
      this.setState({ cartItems: [...cartItems] });
      localStorage.setItem('cart', JSON.stringify(cartItems));
    });
  }

  removeFromCart = (item) => {
    const { cartItems } = this.state;
    const getTheItem = cartItems.filter((element) => element.title !== item.title);
    this.setState({ cartItems: [...getTheItem] });
    localStorage.setItem('cart', JSON.stringify(getTheItem));
  }

  filterItems = (param) => {
    const productIdArray = param.reduce((acc, crr) => {
      if (!acc.includes(crr.id)) {
        acc.push(crr.id);
        return acc;
      } return acc;
    }, []);
    return productIdArray.map((itemId) => (
      param.find(({ id }) => id === itemId)
    ));
  }

  getTheItems = () => {
    const getTheLocal = JSON.parse(localStorage.getItem('cart'));
    if (getTheLocal === null) return this.setState({ err: true });
    this.setState({
      cartItems: this.filterItems(getTheLocal),
      err: false,
    });
  }

  decreaseValue = (item) => {
    const { cartItems } = this.state;
    cartItems.forEach((val) => {
      if (val.id === item.id) {
        val.amount -= 1;
        if (val.amount < 2) {
          val.amount = 1;
        }
      }
    });
    const items = cartItems.filter((arr) => arr.amount > 0);
    this.setState({ cartItems: [...items] });
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  checkoutButton = () => {
    const { history: { push } } = this.props;
    push('/checkout');
  }

  render() {
    const { cartItems, err } = this.state;

    return (
      <div>
        { cartItems.length > 0
          && (cartItems
            .map((item) => (
              <div key={ item.id }>
                <h4 data-testid="shopping-cart-product-name">{ item.title }</h4>
                <h5>{ (item.price * item.amount).toFixed(2) }</h5>
                <h5 data-testid="shopping-cart-product-quantity">{ item.amount }</h5>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => this.addQuantity(item) }
                >
                  +
                </button>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => this.removeFromCart(item) }
                >
                  X
                </button>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.decreaseValue(item) }
                >
                  -
                </button>
              </div>
            )))}
        {err
          && <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>}
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.checkoutButton }
        >
          Checkout
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
