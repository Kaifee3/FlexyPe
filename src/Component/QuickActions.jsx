import React from 'react'

function QuickActions() {
  const handleAction = (action) => {
    alert(`${action} feature will be available soon!`);
  };

  return (
    <div className="profile-card quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        <button className="action-btn" onClick={() => handleAction('Track Packages')}>
          Track Packages
        </button>
        <button className="action-btn" onClick={() => handleAction('Reorder Favorites')}>
          Reorder Favorites
        </button>
        <button className="action-btn" onClick={() => handleAction('View Wishlist')}>
          View Wishlist
        </button>
        <button className="action-btn" onClick={() => handleAction('Size Guide')}>
          Size Guide
        </button>
        <button className="action-btn" onClick={() => handleAction('Order History')}>
          Order History
        </button>
        <button className="action-btn" onClick={() => handleAction('Refer Friends')}>
          Refer Friends
        </button>
      </div>
    </div>
  )
}

export default QuickActions