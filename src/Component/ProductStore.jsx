import React, { useState } from 'react'

function ProductStore({ products, cart, addToCart, addCoins, updateProgress }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Electronics', 'Fashion', 'Accessories'];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(product => product.category === filter);

  const handleAddToCart = (product) => {
    addToCart(product);
    updateProgress(product.price);
    alert(`${product.name} added to cart! Earned ${Math.floor(product.price / 10) * 2} coins!`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(emptyStars)}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  return (
    <div className="product-store">
      <div className="store-header">
        <h2>Product Store - Earn Coins with Every Purchase!</h2>
        <div className="store-info">
          <p>Earn 2 coins for every Rs 10 spent</p>
          <div className="cart-info">
            Cart Items: {cart.reduce((total, item) => total + item.quantity, 0)} | Total: Rs {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
          </div>
        </div>
      </div>

      <div className="store-filters">
        <label>Filter by Category:</label>
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              {renderStars(product.rating)}
              <p className="product-reviews">{product.reviews} reviews</p>
              <div className="product-price">Rs {product.price}</div>
              <div className="coin-earning">
                Earn {Math.floor(product.price / 10) * 2} coins
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Shopping Cart</h3>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.name} x{item.quantity}</span>
                <span>Rs {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: Rs {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</strong>
          </div>
          <button 
            className="checkout-btn"
            onClick={() => {
              alert('Go to Checkout section to complete your order!');
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductStore