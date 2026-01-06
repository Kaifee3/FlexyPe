import React from 'react'

function RecentActivity({ userData }) {
  return (
    <div className="profile-card recent-activity">
      <h3>This Month's Progress</h3>
      <div className="activity-list">
        {userData.recentPurchases.map((purchase, index) => (
          <div key={index} className="activity-item">
            <div className="activity-date">{purchase.date}</div>
            <div className="activity-details">
              <span className="item-name">{purchase.item}</span>
              <span className="item-amount">Rs {purchase.amount}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="month-summary">
        <p>Total this month: Rs {userData.monthlyProgress.current}</p>
        <p>Orders this month: {userData.recentPurchases.length}</p>
        <p>Coins earned: {userData.recentPurchases.length * 5} coins</p>
      </div>
    </div>
  )
}

export default RecentActivity