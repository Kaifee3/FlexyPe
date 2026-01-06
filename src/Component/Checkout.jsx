import React, { useState } from 'react'

function CheckoutSection({ products, cart, updateCart, clearCart, addCoins, updateProgress, addNewOrder }) {
  const [shippingInfo, setShippingInfo] = useState({
    name: 'Kaifee Azam',
    email: 'kaifee@example.com',
    phone: '+91 9999999999',
    address: '123 Main Street',
    city: 'Mumbai',
    pincode: '400001'
  });
  const [orderStep, setOrderStep] = useState('cart');
  const [orderPlaced, setOrderPlaced] = useState(false); 

  const removeFromCart = (productId) => {
    updateCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      const newCart = cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      );
      updateCart(newCart);
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
    
    const orderData = {
      items: cart.map(item => `${item.name} (x${item.quantity})`),
      total: total
    };
    
    const newOrder = addNewOrder(orderData);
    
    addCoins(coinsEarned, `completing order ${newOrder.id} worth Rs ${total}`, 'Purchase Bonus', newOrder.id);
    updateProgress(total);
    
    setOrderPlaced(true);
    setOrderStep('success');
    
    setTimeout(() => {
      clearCart();
      setOrderStep('cart');
      setOrderPlaced(false);
    }, 5000);
  };

  const renderCartReview = () => (
    <div className="cart-review">
      <h3>Review Your Order</h3>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <p>Go to the <strong>Products</strong> section to add items to your cart!</p>
        </div>
      ) : (
        <>
          <div className="cart-items-review">
            {cart.map(item => (
              <div key={item.id} className="cart-item-review">
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">Rs {item.price} each</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  <span>Rs {item.price * item.quantity}</span>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>Rs {getCartTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Coins to Earn:</span>
              <span>{getCoinsEarned()} coins</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>Rs {getCartTotal()}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="success-message">
      <div className="success-icon">✅</div>
      <h3>Order Placed Successfully!</h3>
      <div className="success-details">
        <p><strong>Order Total:</strong> Rs {getCartTotal()}</p>
        <p><strong>Coins Earned:</strong> {getCoinsEarned()} coins</p>
        <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
      </div>
      <p className="success-note">Check your Order History to track this order!</p>
      <div className="success-animation">
        <p>Redirecting to cart in a few seconds...</p>
      </div>
    </div>
  );

  const renderCartSummary = () => (
    <div className="cart-summary">
      <h3>Your Cart ({cart.length} items)</h3>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <p>Go to the <strong>Products</strong> section to add items to your cart!</p>
        </div>
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

  return (
    <div className="checkout-section">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <div className="checkout-steps">
          <div className={`step ${orderStep === 'cart' ? 'active' : 'completed'}`}>Review Cart</div>
          <div className={`step ${orderStep === 'shipping' ? 'active' : ''}`}>Shipping</div>
          <div className={`step ${orderStep === 'success' ? 'active' : ''}`}>Success</div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          {orderStep === 'cart' && renderCartReview()}
          {orderStep === 'shipping' && renderShippingForm()}
          {orderStep === 'success' && renderSuccessMessage()}
        </div>

        {orderStep !== 'success' && (
          <div className="checkout-sidebar">
            {renderCartSummary()}
            
            <div className="checkout-actions">
              {orderStep === 'cart' && cart.length > 0 && (
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
                    onClick={() => setOrderStep('cart')}
                  >
                    Back to Cart
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
        )}
      </div>
    </div>
  )
}

export default CheckoutSection