import React, { useState } from 'react'

function RewardsHistory({ rewardsHistory }) {
  const [filterMonth, setFilterMonth] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [viewMode, setViewMode] = useState('monthly'); // 'monthly' or 'weekly'

  const months = ['All', ...new Set(rewardsHistory.map(reward => reward.month))];
  const weeks = ['All', ...new Set(rewardsHistory.map(reward => reward.week).filter(Boolean))];
  const types = ['All', ...new Set(rewardsHistory.map(reward => reward.type))];

  const filteredRewards = rewardsHistory.filter(reward => {
    const monthMatch = filterMonth === 'All' || reward.month === filterMonth;
    const typeMatch = filterType === 'All' || reward.type === filterType;
    return monthMatch && typeMatch;
  });

  // Get recent rewards (last 7 days)
  const getRecentRewards = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return rewardsHistory.filter(reward => new Date(reward.date) >= sevenDaysAgo);
  };

  const recentRewards = getRecentRewards();

  const getTotalCoinsByWeek = () => {
    const weeklyTotals = {};
    rewardsHistory.forEach(reward => {
      if (reward.week) {
        if (!weeklyTotals[reward.week]) {
          weeklyTotals[reward.week] = { total: 0, count: 0, rewards: [] };
        }
        weeklyTotals[reward.week].total += reward.coins;
        weeklyTotals[reward.week].count += 1;
        weeklyTotals[reward.week].rewards.push(reward);
      }
    });
    return weeklyTotals;
  };

  const getTotalCoinsByMonth = () => {
    const monthlyTotals = {};
    rewardsHistory.forEach(reward => {
      if (!monthlyTotals[reward.month]) {
        monthlyTotals[reward.month] = { total: 0, count: 0, rewards: [] };
      }
      monthlyTotals[reward.month].total += reward.coins;
      monthlyTotals[reward.month].count += 1;
      monthlyTotals[reward.month].rewards.push(reward);
    });
    return monthlyTotals;
  };

  const getTotalCoinsByType = () => {
    const typeTotals = {};
    rewardsHistory.forEach(reward => {
      if (!typeTotals[reward.type]) {
        typeTotals[reward.type] = { total: 0, count: 0 };
      }
      typeTotals[reward.type].total += reward.coins;
      typeTotals[reward.type].count += 1;
    });
    return typeTotals;
  };

  const monthlyTotals = getTotalCoinsByMonth();
  const weeklyTotals = getTotalCoinsByWeek();
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

      {recentRewards.length > 0 && (
        <div className="recent-rewards-section">
          <h3>Recent Rewards (Last 7 Days)</h3>
          <div className="recent-rewards-grid">
            {recentRewards.map(reward => (
              <div key={reward.id} className="recent-reward-card">
                <div className="recent-reward-info">
                  <span className="recent-reward-type">{reward.type}</span>
                  <span 
                    className="recent-reward-coins"
                    style={{ color: getTypeColor(reward.type) }}
                  >
                    +{reward.coins} coins
                  </span>
                </div>
                <div className="recent-reward-details">
                  <span className="recent-reward-desc">{reward.description}</span>
                  {reward.orderId && (
                    <span className="recent-reward-order">Order: {reward.orderId}</span>
                  )}
                </div>
                {reward.timestamp && (
                  <div className="recent-reward-time">
                    {new Date(reward.timestamp).toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="view-mode-toggle">
        <h3>Breakdown Analysis</h3>
        <div className="toggle-buttons">
          <button 
            className={`toggle-btn ${viewMode === 'monthly' ? 'active' : ''}`}
            onClick={() => setViewMode('monthly')}
          >
            Monthly View
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'weekly' ? 'active' : ''}`}
            onClick={() => setViewMode('weekly')}
          >
            Weekly View
          </button>
        </div>
      </div>

      {viewMode === 'monthly' ? (
        <div className="monthly-breakdown">
          <h3>Monthly Coin Earnings</h3>
          <div className="monthly-cards">
            {Object.entries(monthlyTotals).map(([month, data]) => (
              <div key={month} className="monthly-card">
                <h4>{month}</h4>
                <div className="monthly-stats">
                  <span className="coins-earned">{data.total} coins</span>
                  <span className="coins-value">Rs {(data.total * 0.5).toFixed(0)} value</span>
                  <span className="transaction-count">{data.count} transactions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="weekly-breakdown">
          <h3>Weekly Coin Earnings</h3>
          <div className="weekly-cards">
            {Object.entries(weeklyTotals).map(([week, data]) => (
              <div key={week} className="weekly-card">
                <h4>{week}</h4>
                <div className="weekly-stats">
                  <span className="coins-earned">{data.total} coins</span>
                  <span className="coins-value">Rs {(data.total * 0.5).toFixed(0)} value</span>
                  <span className="transaction-count">{data.count} transactions</span>
                </div>
                <div className="weekly-details">
                  {data.rewards.map(reward => (
                    <div key={reward.id} className="weekly-reward-item">
                      <span className="reward-type-small">{reward.type}</span>
                      <span className="reward-coins-small">+{reward.coins}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="earning-sources">
        <h3>Earning Sources Breakdown</h3>
        <div className="sources-grid">
          {Object.entries(typeTotals).map(([type, data]) => (
            <div key={type} className="source-card">
              <div 
                className="source-indicator"
                style={{ backgroundColor: getTypeColor(type) }}
              ></div>
              <div className="source-info">
                <h4>{type}</h4>
                <span className="source-coins">{data.total} coins</span>
                <span className="source-count">{data.count} transactions</span>
                <span className="source-percentage">
                  {Math.round((data.total / totalCoinsEarned) * 100)}% of total
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

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

      <div className="earning-tips">
        <h3>Ways to Earn More Coins</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Monthly Challenge</h4>
            <p>Complete monthly spending target</p>
            <span className="tip-reward">+1000 coins</span>
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