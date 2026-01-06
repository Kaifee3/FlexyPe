import React from 'react'

function CoinsRewards({ userData }) {
  const handleRedeem = (coinCost, reward) => {
    if (userData.currentCoins >= coinCost) {
      alert(`Redeemed: ${reward} for ${coinCost} coins!`);
    } else {
      alert(`Insufficient coins! You need ${coinCost - userData.currentCoins} more coins.`);
    }
  };

  return (
    <div className="profile-card coins-rewards">
      <h3>Coins & Rewards Hub</h3>
      <div className="coins-content">
        <div className="balance-section">
          <div className="current-balance">
            <span className="coins-number">{userData.currentCoins}</span>
            <span className="coins-label">Coins Available</span>
          </div>
          <div className="coin-value">
            <small>1 Coin = Rs 0.50 value</small>
          </div>
        </div>
        <div className="earning-rules">
          <h4>How to Earn Coins:</h4>
          <ul>
            <li>Monthly minimum order (Rs 200): +100 coins</li>
            <li>Product review: +5 coins</li>
            <li>Product purchase: +2 coins per Rs 10</li>
            <li>Referral success: +50 coins</li>
            <li>Birthday month bonus: +25 coins</li>
          </ul>
        </div>
        <div className="redeem-options">
          <button 
            className="redeem-btn"
            onClick={() => handleRedeem(10, 'Rs 5 Off')}
          >
            Rs 5 Off (10 coins)
          </button>
          <button 
            className="redeem-btn"
            onClick={() => handleRedeem(20, 'Free Shipping')}
          >
            Free Shipping (20 coins)
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoinsRewards