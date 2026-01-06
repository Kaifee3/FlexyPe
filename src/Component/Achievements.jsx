import React from 'react'

function Achievements({ userData }) {
  return (
    <div className="profile-card achievements">
      <h3>Achievement Badges</h3>
      <div className="badges-grid">
        <div className="badge achieved">
          <div className="badge-title">Monthly Achiever</div>
          <div className="badge-desc">{userData.achievements.monthlyStreak} months in a row</div>
          <div className="badge-status">UNLOCKED</div>
        </div>
        <div className="badge achieved">
          <div className="badge-title">VIP Shopper</div>
          <div className="badge-desc">{userData.achievements.totalOrders} total orders</div>
          <div className="badge-status">UNLOCKED</div>
        </div>
        <div className="badge in-progress">
          <div className="badge-title">Coin Collector</div>
          <div className="badge-desc">500+ coins earned</div>
          <div className="badge-status">{userData.currentCoins}/500</div>
        </div>
      </div>
      <div className="streak-info">
        <p>Current Streak: {userData.achievements.monthlyStreak} months</p>
        <p>Keep it up! You're earning coins consistently!</p>
      </div>
    </div>
  )
}

export default Achievements