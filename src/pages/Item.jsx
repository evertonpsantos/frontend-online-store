import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { productsByTheId } from '../services/api';

export default class Item extends Component {
  constructor() {
    super();
    this.state = {
      result: {},
      email: '',
      rate: '',
      review: '',
      savedReviews: undefined,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const reviewsString = localStorage.getItem(`${id}`);
    if (reviewsString !== null) {
      const reviews = JSON.parse(reviewsString);
      this.setState({ savedReviews: reviews });
    }
    productsByTheId(id).then((result) => {
      this.setState({ result });
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submitReview = () => {
    this.setState(({ email, rate, review, savedReviews, result: { id } }) => {
      const data = { email, rate, review };
      if (savedReviews !== undefined) {
        console.log(savedReviews);
        localStorage.setItem(`${id}`, `${JSON.stringify([...savedReviews, data])}`);
      } else {
        localStorage.setItem(`${id}`, `${JSON.stringify([data])}`);
      }
      const reviews = JSON.parse(localStorage.getItem(`${id}`));
      console.log(reviews);
      return ({ email: '', rate: '', review: '', savedReviews: reviews });
    });
  }

  render() {
    const { result: { id, title, price, thumbnail, amount = 1 } } = this.state;
    const { email, rate, review, savedReviews } = this.state;
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
        <form action="">
          { email.length > 0 && !email.includes('@')
           && (
             <div>
               <h2 data-testid="error-msg">Campos inválidos</h2>
             </div>
           )}
          { email.length > 0 && email.includes('@') && rate === ''
           && (
             <div>
               <h2 data-testid="error-msg">Campos inválidos</h2>
             </div>
           )}
          <label htmlFor="emailInput">
            <input
              type="email"
              name="email"
              id="emailInput"
              data-testid="product-detail-email"
              placeholder="email"
              value={ email }
              onChange={ this.handleChange }
              required
            />
          </label>
          <div>
            <label htmlFor="rate">
              Nota:
              <input
                type="checkbox"
                name="rate"
                id=""
                data-testid="1-rating"
                value="1"
                checked={ rate === '1' }
                onChange={ this.handleChange }
                required
              />
              <input
                type="checkbox"
                name="rate"
                id=""
                data-testid="2-rating"
                value="2"
                checked={ rate === '2' }
                onChange={ this.handleChange }
                required
              />
              <input
                type="checkbox"
                name="rate"
                id=""
                data-testid="3-rating"
                value="3"
                checked={ rate === '3' }
                onChange={ this.handleChange }
                required
              />
              <input
                type="checkbox"
                name="rate"
                id=""
                data-testid="4-rating"
                value="4"
                checked={ rate === '4' }
                onChange={ this.handleChange }
                required
              />
              <input
                type="checkbox"
                name="rate"
                id=""
                data-testid="5-rating"
                value="5"
                checked={ rate === '5' }
                onChange={ this.handleChange }
                required
              />
            </label>
          </div>
          <label htmlFor="review">
            <textarea
              name="review"
              data-testid="product-detail-evaluation"
              placeholder="Digite sua avaliação"
              value={ review }
              onChange={ this.handleChange }
              cols="30"
              rows="10"
            />
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.submitReview }
            disabled={ email.length === 0 || rate === '' || !email.includes('@') }
          >
            Enviar
          </button>
        </form>
        <section>
          { savedReviews
          && savedReviews.map((savedReview, index) => (
            <div key={ index }>
              <h3 data-testid="review-card-email">{ savedReview.email }</h3>
              <h3 data-testid="review-card-rating">{ savedReview.rate }</h3>
              <p data-testid="review-card-evaluation">{ savedReview.review }</p>
            </div>
          ))}
        </section>
      </>
    );
  }
}

Item.propTypes = {
  match: PropTypes.object,
}.isRequired;
