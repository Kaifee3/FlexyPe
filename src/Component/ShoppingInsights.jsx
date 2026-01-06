import React from 'react'

function ShoppingInsights({ userData }) {
  return (
    <div className="profile-card insights">
      <h3>Smart Shopping Insights</h3>
      <div className="insights-grid">
        <div className="insight-item">
          <label>Favorite Category:</label>
          <span>{userData.achievements.favoriteCategory}</span>
        </div>
        <div className="insight-item">
          <label>Average Order Value:</label>
          <span>Rs {userData.achievements.avgOrderValue}</span>
        </div>
        <div className="insight-item">
          <label>Return Rate:</label>
          <span>6% (Excellent!)</span>
        </div>
        <div className="insight-item">
          <label>Best Shopping Day:</label>
          <span>Saturday Evening</span>
        </div>
      </div>
      <div className="recommendations">
        <h4>Personalized Recommendations:</h4>
        <ul>
          <li>You typically replace jeans every 8 months</li>
          <li>Winter boots needed based on seasonal patterns</li>
          <li>Size Medium in Brand X fits you perfectly</li>
        </ul>
      </div>
    </div>
  )
}

export default ShoppingInsights