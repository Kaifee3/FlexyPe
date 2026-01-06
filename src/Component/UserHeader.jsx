import React from 'react'

function UserHeader({ userData }) {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="profile-header">
      <div className="user-info">
        <div className="avatar">{getInitials(userData.name)}</div>
        <div className="user-details">
          <h1>Welcome Back, {userData.name}</h1>
          <p>Member since {userData.memberSince}</p>
        </div>
      </div>
      <div className="quick-stats">
        <div className="stat">
          <span className="stat-number">{userData.currentCoins}</span>
          <span className="stat-label">Coins</span>
        </div>
        <div className="stat">
          <span className="stat-number">{userData.shoppingScore}/100</span>
          <span className="stat-label">Shopping Score</span>
        </div>
      </div>
    </div>
  )
}

export default UserHeader