import React, { useState } from 'react'

function OrderHistory({ orders }) {
  const [filterMonth, setFilterMonth] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Get unique months from orders
  const months = ['All', ...new Set(orders.map(order => order.month))];

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => filterMonth === 'All' || order.month === filterMonth)
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#38a169';
      case 'Shipped': return '#3182ce';
      case 'Processing': return '#ed8936';
      case 'Cancelled': return '#e53e3e';
      default: return '#4a5568';
    }
  };

  const getTotalsByMonth = () => {
    const monthlyTotals = {};
    orders.forEach(order => {
      if (!monthlyTotals[order.month]) {
        monthlyTotals[order.month] = { total: 0, orders: 0 };
      }
      monthlyTotals[order.month].total += order.total;
      monthlyTotals[order.month].orders += 1;
    });
    return monthlyTotals;
  };

  const monthlyTotals = getTotalsByMonth();

  return (
    <div className="order-history">
      <div className="order-header">
        <h2>Order History</h2>
        <p>Track all your purchases and monthly spending patterns</p>
      </div>

      {/* Monthly Summary Cards */}
      <div className="monthly-summary-cards">
        <h3>Monthly Summary</h3>
        <div className="summary-grid">
          {Object.entries(monthlyTotals).map(([month, data]) => (
            <div key={month} className="summary-card">
              <h4>{month}</h4>
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-number">{data.orders}</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Rs {data.total}</span>
                  <span className="stat-label">Total Spent</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Rs {Math.round(data.total / data.orders)}</span>
                  <span className="stat-label">Avg Order</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="order-filters">
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
          <label>Sort by:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found for the selected criteria.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header-info">
                <div className="order-id-date">
                  <h4>Order #{order.id}</h4>
                  <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                  <span className="order-month">{order.month}</span>
                </div>
                <div className="order-status-total">
                  <span 
                    className="order-status" 
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                  <span className="order-total">Rs {order.total}</span>
                </div>
              </div>
              <div className="order-items">
                <h5>Items:</h5>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="order-actions">
                <button className="order-btn primary">View Details</button>
                <button className="order-btn secondary">Reorder</button>
                <button className="order-btn secondary">Write Review</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Statistics */}
      <div className="order-stats">
        <h3>Your Shopping Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{orders.length}</span>
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">Rs {orders.reduce((sum, order) => sum + order.total, 0)}</span>
            <span className="stat-label">Total Spent</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">Rs {Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length)}</span>
            <span className="stat-label">Average Order</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{orders.filter(order => order.status === 'Delivered').length}</span>
            <span className="stat-label">Delivered Orders</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
