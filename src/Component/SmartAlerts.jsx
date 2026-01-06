import React from 'react'

function SmartAlerts({ remainingAmount, daysLeft }) {
  return (
    <div className="smart-alerts">
      <h3>Smart Alerts</h3>
      <div className="alert-item priority">
        Only Rs {remainingAmount} more needed for your 100 coin bonus!
      </div>
      <div className="alert-item">
        {daysLeft} days left in January - You've got this!
      </div>
      <div className="alert-item">
        Suggestion: Check out Sale items to reach your goal faster
      </div>
      <div className="alert-item">
        New products added to your favorite category: Fashion
      </div>
    </div>
  )
}

export default SmartAlerts