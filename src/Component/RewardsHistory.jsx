import React, { useState } from 'react'

function RewardsHistory({ rewardsHistory }) {
  const [filterMonth, setFilterMonth] = useState('All');
  const [filterType, setFilterType] = useState('All');

  // Get unique months and types
  const months = ['All', ...new Set(rewardsHistory.map(reward => reward.month))];
  const types = ['All', ...new Set(rewardsHistory.map(reward => reward.type))];

  // Filter rewards
  const filteredRewards = rewardsHistory.filter(reward => {
    const monthMatch = filterMonth === 'All' || reward.month === filterMonth;
    const typeMatch = filterType === 'All' || reward.type === filterType;
    return monthMatch && typeMatch;
  });

  const getTotalCoinsByMonth = () => {
    const monthlyTotals = {};
    rewardsHistory.forEach(reward => {
      if (!monthlyTotals[reward.month]) {
        monthlyTotals[reward.month] = 0;
      }
      monthlyTotals[reward.month] += reward.coins;
    });
    return monthlyTotals;
  };

  const getTotalCoinsByType = () => {
    const typeTotals = {};
    rewardsHistory.forEach(reward => {
      if (!typeTotals[reward.type]) {
        typeTotals[reward.type] = 0;
      }
      typeTotals[reward.type] += reward.coins;
    });
    return typeTotals;
  };

  const monthlyTotals = getTotalCoinsByMonth();
  const typeTotals = getTotalCoinsByType();
  const totalCoinsEarned = rewardsHistory.reduce((sum, reward) => sum + reward.coins, 0);

  const getTypeColor = (type) => {
    switch (type) {
      case 'Monthly Challenge': return '#4facfe';
      case 'Product Review': return '#38a169';
      case 'Purchase Bonus': return '#ed8936';
      case 'Referral': return '#9f7aea';
      case 'Birthday Bonus': return '#f093fb';
      default: return '#4a5568';
    }
  };

  return (
    <div className="rewards-history">
      <div className="rewards-header">
        <h2>Rewards History</h2>
        <p>Track all your coin earnings and spending patterns</p>
      </div>

      {/* Overall Statistics */}
      <div className="rewards-overview">
        <div className="overview-cards">
          <div className="overview-card">
            <span className="overview-number">{totalCoinsEarned}</span>
            <span className="overview-label">Total Coins Earned</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">Rs {(totalCoinsEarned * 0.5).toFixed(0)}</span>
            <span className="overview-label">Total Value</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">{rewardsHistory.length}</span>
            <span className="overview-label">Total Transactions</span>
          </div>
          <div className="overview-card">
            <span className="overview-number">{Math.round(totalCoinsEarned / rewardsHistory.length)}</span>
            <span className="overview-label">Avg Coins per Transaction</span>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="monthly-breakdown">
        <h3>Monthly Coin Earnings</h3>
        <div className="monthly-cards">
          {Object.entries(monthlyTotals).map(([month, coins]) => (
            <div key={month} className="monthly-card">
              <h4>{month}</h4>
              <div className="monthly-stats">
                <span className="coins-earned">{coins} coins</span>
                <span className="coins-value">Rs {(coins * 0.5).toFixed(0)} value</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earning Sources */}
      <div className="earning-sources">
        <h3>Earning Sources Breakdown</h3>
        <div className="sources-grid">
          {Object.entries(typeTotals).map(([type, coins]) => (
            <div key={type} className="source-card">
              <div 
                className="source-indicator"
                style={{ backgroundColor: getTypeColor(type) }}
              ></div>
              <div className="source-info">
                <h4>{type}</h4>
                <span className="source-coins">{coins} coins</span>
                <span className="source-percentage">
                  {Math.round((coins / totalCoinsEarned) * 100)}% of total
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="rewards-filters">
        <div className="filter-group">
          <label>Filter by Month:</label>
          <select 
            value={filterMonth} 
            onChange={(e) => setFilterMonth(e.target.value)}
            className="filter-select"
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Type:</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Rewards List */}
      <div className="rewards-list">
        <h3>Transaction History</h3>
        {filteredRewards.length === 0 ? (
          <div className="no-rewards">
            <p>No rewards found for the selected criteria.</p>
          </div>
        ) : (
          <div className="rewards-container">
            {filteredRewards.map(reward => (
              <div key={reward.id} className="reward-item">
                <div className="reward-info">
                  <div 
                    className="reward-type-indicator"
                    style={{ backgroundColor: getTypeColor(reward.type) }}
                  ></div>
                  <div className="reward-details">
                    <h4>{reward.type}</h4>
                    <p className="reward-description">{reward.description}</p>
                    <span className="reward-date">{new Date(reward.date).toLocaleDateString()}</span>
                    <span className="reward-month">{reward.month}</span>
                  </div>
                </div>
                <div className="reward-coins">
                  <span className="coins-amount">+{reward.coins}</span>
                  <span className="coins-label">coins</span>
                  <span className="coins-value">Rs {(reward.coins * 0.5).toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Earning Tips */}
      <div className="earning-tips">
        <h3>Ways to Earn More Coins</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Monthly Challenge</h4>
            <p>Complete monthly spending target</p>
            <span className="tip-reward">+100 coins</span>
          </div>
          <div className="tip-card">
            <h4>Product Reviews</h4>
            <p>Write detailed product reviews</p>
            <span className="tip-reward">+5 coins each</span>
          </div>
          <div className="tip-card">
            <h4>Purchase Bonus</h4>
            <p>Earn with every purchase</p>
            <span className="tip-reward">2 coins per Rs 10</span>
          </div>
          <div className="tip-card">
            <h4>Refer Friends</h4>
            <p>Invite friends to join</p>
            <span className="tip-reward">+50 coins</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardsHistory