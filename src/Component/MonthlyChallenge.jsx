import React from 'react'

function MonthlyChallenge({ userData, progressPercentage, remainingAmount, daysLeft }) {
  return (
    <div className="monthly-challenge">
      <h2>Monthly Shopping Challenge</h2>
      <div className="challenge-content">
        <div className="progress-info">
          <h3>Reach Rs 9999 minimum order this month</h3>
          <p className="reward-text">Reward: 1000 Coins (Worth Rs 500)</p>
          <div className="progress-details">
            <span>Rs {userData.monthlyProgress.current} / Rs {userData.monthlyProgress.target}</span>
            <span className="percentage">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="status-text">
            {remainingAmount > 0 
              ? `Just Rs ${remainingAmount} more to go! ${daysLeft} days left`
              : "Congratulations! Challenge completed!"
            }
          </p>
        </div>
        <button className="shop-button" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Shop Now to Complete Challenge
        </button>
      </div>
    </div>
  )
}

export default MonthlyChallenge