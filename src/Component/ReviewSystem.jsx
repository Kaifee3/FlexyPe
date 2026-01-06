import React, { useState } from 'react'

function ReviewSystem({ products, addCoins }) {
  const [reviews, setReviews] = useState({});
  const [selectedProduct, setSelectedProduct] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const submitReview = () => {
    if (!selectedProduct || !reviewText.trim()) {
      alert('Please select a product and write a review!');
      return;
    }

    const productName = products.find(p => p.id === parseInt(selectedProduct))?.name;
    const newReview = {
      productId: selectedProduct,
      productName,
      rating,
      text: reviewText,
      date: new Date().toLocaleDateString(),
      coinsEarned: 5
    };

    setReviews(prev => ({
      ...prev,
      [selectedProduct]: [...(prev[selectedProduct] || []), newReview]
    }));

    addCoins(5, `writing a review for ${productName}`);
    
    // Reset form
    setSelectedProduct('');
    setRating(5);
    setReviewText('');
    
    alert('Review submitted successfully! You earned 5 coins!');
  };

  const renderStarSelector = () => {
    return (
      <div className="star-selector">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= rating ? 'selected' : ''}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const getAllReviews = () => {
    const allReviews = [];
    Object.values(reviews).forEach(productReviews => {
      allReviews.push(...productReviews);
    });
    return allReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <div className="review-system">
      <div className="review-header">
        <h2>Write Product Reviews & Earn Coins!</h2>
        <p>Earn 5 coins for each honest product review</p>
      </div>

      <div className="review-form">
        <h3>Submit a New Review</h3>
        <div className="form-group">
          <label>Select Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="product-select"
          >
            <option value="">Choose a product to review...</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - Rs {product.price}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Your Rating:</label>
          {renderStarSelector()}
          <span className="rating-text">{rating} out of 5 stars</span>
        </div>

        <div className="form-group">
          <label>Your Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your honest opinion about this product..."
            className="review-textarea"
            rows="4"
          />
          <div className="char-count">{reviewText.length}/500 characters</div>
        </div>

        <button 
          className="submit-review-btn"
          onClick={submitReview}
        >
          Submit Review & Earn 5 Coins
        </button>
      </div>

      <div className="review-tips">
        <h4>Review Tips:</h4>
        <ul>
          <li>Be honest and detailed in your reviews</li>
          <li>Mention product quality, fit, and value for money</li>
          <li>Include both pros and cons</li>
          <li>Help other shoppers make informed decisions</li>
          <li>Each quality review earns you 5 coins!</li>
        </ul>
      </div>

      <div className="reviews-list">
        <h3>Your Recent Reviews</h3>
        {getAllReviews().length === 0 ? (
          <p className="no-reviews">No reviews yet. Start writing reviews to earn coins!</p>
        ) : (
          <div className="reviews-container">
            {getAllReviews().map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header-item">
                  <h4>{review.productName}</h4>
                  <div className="review-meta">
                    <div className="star-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <span className="review-date">{review.date}</span>
                    <span className="coins-earned">+{review.coinsEarned} coins</span>
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="review-stats">
        <h3>Review Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{getAllReviews().length}</span>
            <span className="stat-label">Total Reviews</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getAllReviews().length * 5}</span>
            <span className="stat-label">Coins Earned</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {getAllReviews().length > 0 
                ? (getAllReviews().reduce((sum, r) => sum + r.rating, 0) / getAllReviews().length).toFixed(1)
                : '0'
              }
            </span>
            <span className="stat-label">Average Rating Given</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewSystem