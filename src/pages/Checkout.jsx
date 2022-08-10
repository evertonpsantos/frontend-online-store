import React from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      nameInput: '',
      emailInput: '',
      cpfInput: '',
      phoneInput: '',
      cepInput: '',
      addressInput: '',
      paymentInput: '',
      error: false,
    };
  }

  componentDidMount() {
    const getTheLocal = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cartItems: getTheLocal });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { nameInput, emailInput, cpfInput,
      phoneInput, cepInput, addressInput, paymentInput } = this.state;

    if (!nameInput
      || !emailInput
      || !cpfInput
      || !phoneInput
      || !cepInput
      || !addressInput
      || !paymentInput) return this.setState({ error: true });

    localStorage.removeItem('cart');
    const { history: { push } } = this.props;
    push('/');
  }

  render() {
    const { cartItems, nameInput, emailInput, cpfInput,
      phoneInput, cepInput, addressInput, paymentInput, error } = this.state;

    return (
      <div>
        {cartItems.map((item) => (
          <div key={ item.id }>
            <p>{ item.title }</p>
            <p>{ `R$: ${item.price * item.amount}` }</p>
            <p>{`Quantidade: ${item.amount}`}</p>
          </div>
        ))}

        <form>
          <label htmlFor="checkout-fullname">
            <input
              type="text"
              placeholder="Nome completo"
              value={ nameInput }
              data-testid="checkout-fullname"
              id="checkout-fullname"
              name="nameInput"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="checkout-email">
            <input
              type="email"
              placeholder="E-mail"
              value={ emailInput }
              data-testid="checkout-email"
              id="checkout-email"
              name="emailInput"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="checkout-cpf">
            <input
              type="text"
              placeholder="CPF"
              value={ cpfInput }
              data-testid="checkout-cpf"
              id="checkout-cpf"
              name="cpfInput"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="checkout-phone">
            <input
              type="text"
              placeholder="Telefone"
              value={ phoneInput }
              data-testid="checkout-phone"
              id="checkout-phone"
              name="phoneInput"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="checkout-cep">
            <input
              type="text"
              placeholder="CEP"
              value={ cepInput }
              data-testid="checkout-cep"
              id="checkout-cep"
              name="cepInput"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="checkout-address">
            <input
              type="text"
              placeholder="Endereço"
              value={ addressInput }
              data-testid="checkout-address"
              id="checkout-address"
              name="addressInput"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="ticket-payment">
            <input
              type="radio"
              value="boleto"
              data-testid="ticket-payment"
              id="ticket-payment"
              name="paymentInput"
              checked={ paymentInput === 'boleto' }
              onChange={ this.handleChange }
            />
            Boleto
          </label>
          <label htmlFor="visa-payment">
            <input
              type="radio"
              value="visa"
              data-testid="visa-payment"
              id="visa-payment"
              name="paymentInput"
              checked={ paymentInput === 'visa' }
              onChange={ this.handleChange }
            />
            Visa
          </label>
          <label htmlFor="master-payment">
            <input
              type="radio"
              value="mastercard"
              data-testid="master-payment"
              id="master-payment"
              name="paymentInput"
              checked={ paymentInput === 'mastercard' }
              onChange={ this.handleChange }
            />
            MasterCard
          </label>
          <label htmlFor="elo-payment">
            <input
              type="radio"
              value="elo"
              data-testid="elo-payment"
              id="elo-payment"
              name="paymentInput"
              checked={ paymentInput === 'elo' }
              onChange={ this.handleChange }
            />
            Elo
          </label>

          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.handleSubmit }
          >
            Comprar

          </button>
        </form>
        { error && <p data-testid="error-msg">Campos inválidos</p>}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
