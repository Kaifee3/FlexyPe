import React from 'react'

function ShoppingDNA({ userData }) {
  return (
    <div className="profile-card shopping-dna">
      <h3>Your Shopping DNA</h3>
      <div className="dna-items">
        <div className="dna-item">
          <label>Style Profile:</label>
          <span>{userData.shoppingDNA.style}</span>
        </div>
        <div className="dna-item">
          <label>Budget Range:</label>
          <span>{userData.shoppingDNA.budgetRange}</span>
        </div>
        <div className="dna-item">
          <label>Eco Score:</label>
          <span>{userData.shoppingDNA.ecoScore}/10</span>
        </div>
        <div className="dna-item">
          <label>Size Success Rate:</label>
          <span>{userData.shoppingDNA.sizeSuccessRate}%</span>
        </div>
      </div>
    </div>
  )
}

export default ShoppingDNA