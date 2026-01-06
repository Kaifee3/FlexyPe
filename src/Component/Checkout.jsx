import React, { useState } from 'react'

function CheckoutSection({ products, addCoins, updateProgress }) {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: 'Kaifee Azam',
    email: 'kaifee@example.com',
    phone: '+91 9999999999',
    address: '123 Main Street',
    city: 'Mumbai',
    pincode: '400001'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderStep, setOrderStep] = useState('products'); // products, shipping, payment, confirmation

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCoinsEarned = () => {
    return Math.floor(getCartTotal() / 10) * 2;
  };

  const placeOrder = () => {
    const total = getCartTotal();
    const coinsEarned = getCoinsEarned();
    
    addCoins(coinsEarned, `completing order worth Rs ${total}`);
    updateProgress(total);
    
    alert(`Order placed successfully! 
    Order Total: Rs ${total}
    Coins Earned: ${coinsEarned}
    Estimated Delivery: 3-5 business days`);
    
    setCart([]);
    setOrderStep('products');
  };

  const renderProductSelection = () => (
    <div className="checkout-products">
      <h3>Select Products</h3>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="checkout-product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="price">Rs {product.price}</p>
              <p className="category">{product.category}</p>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCartSummary = () => (
    <div className="cart-summary">
      <h3>Your Cart ({cart.length} items)</h3>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add some products!</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Rs {item.price} each</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">
                  Rs {item.price * item.quantity}
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-totals">
            <div className="total-line">
              <span>Subtotal:</span>
              <span>Rs {getCartTotal()}</span>
            </div>
            <div className="total-line">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-line">
              <span>Coins to Earn:</span>
              <span>{getCoinsEarned()} coins</span>
            </div>
            <div className="total-line final">
              <span>Total:</span>
              <span>Rs {getCartTotal()}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderShippingForm = () => (
    <div className="shipping-form">
      <h3>Shipping Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input 
            type="tel" 
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
          />
        </div>
        <div className="form-group full-width">
          <label>Address</label>
          <textarea 
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input 
            type="text" 
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>PIN Code</label>
          <input 
            type="text" 
            value={shippingInfo.pincode}
            onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="payment-form">
      <h3>Payment Method</h3>
      <div className="payment-options">
        <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
          <input 
            type="radio" 
            value="card" 
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Credit/Debit Card</span>
        </label>
        <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
          <input 
            type="radio" 
            value="upi" 
            checked={paymentMethod === 'upi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>UPI Payment</span>
        </label>
        <label className={`payment-option ${paymentMethod === 'wallet' ? 'selected' : ''}`}>
          <input 
            type="radio" 
            value="wallet" 
            checked={paymentMethod === 'wallet'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Digital Wallet</span>
        </label>
        <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
          <input 
            type="radio" 
            value="cod" 
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery</span>
        </label>
      </div>
      {paymentMethod === 'card' && (
        <div className="card-form">
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="text" placeholder="123" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="checkout-section">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <div className="checkout-steps">
          <div className={`step ${orderStep === 'products' ? 'active' : ''}`}>Products</div>
          <div className={`step ${orderStep === 'shipping' ? 'active' : ''}`}>Shipping</div>
          <div className={`step ${orderStep === 'payment' ? 'active' : ''}`}>Payment</div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          {orderStep === 'products' && renderProductSelection()}
          {orderStep === 'shipping' && renderShippingForm()}
          {orderStep === 'payment' && renderPaymentForm()}
        </div>

        <div className="checkout-sidebar">
          {renderCartSummary()}
          
          <div className="checkout-actions">
            {orderStep === 'products' && cart.length > 0 && (
              <button 
                className="checkout-btn primary"
                onClick={() => setOrderStep('shipping')}
              >
                Proceed to Shipping
              </button>
            )}
            
            {orderStep === 'shipping' && (
              <>
                <button 
                  className="checkout-btn secondary"
                  onClick={() => setOrderStep('products')}
                >
                  Back to Products
                </button>
                <button 
                  className="checkout-btn primary"
                  onClick={() => setOrderStep('payment')}
                >
                  Proceed to Payment
                </button>
              </>
            )}
            
            {orderStep === 'payment' && (
              <>
                <button 
                  className="checkout-btn secondary"
                  onClick={() => setOrderStep('shipping')}
                >
                  Back to Shipping
                </button>
                <button 
                  className="checkout-btn primary"
                  onClick={placeOrder}
                >
                  Place Order (Rs {getCartTotal()})
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSection