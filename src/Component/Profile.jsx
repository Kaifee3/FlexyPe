import React, { useState } from 'react'
import './Profile.css'
import UserHeader from './UserHeader'
import MonthlyChallenge from './MonthlyChallenge'
import ShoppingDNA from './ShoppingDNA'
import CoinsRewards from './CoinsRewards'
import Achievements from './Achievements'
import ShoppingInsights from './ShoppingInsights'
import RecentActivity from './RecentActivity'
import QuickActions from './QuickActions'
import SmartAlerts from './SmartAlerts'
import ProductStore from './ProductStore'
import ReviewSystem from './ReviewSystem'
import OrderHistory from './Order'
import CheckoutSection from './Checkout'
import RewardsHistory from './RewardsHistory'

function Profile() {
  const [userData, setUserData] = useState({
    name: "Kaifee Azam",
    memberSince: "March 2024",
    currentCoins: 245,
    monthlyProgress: { current: 180, target: 200 },
    shoppingScore: 85,
    achievements: {
      monthlyStreak: 3,
      totalOrders: 47,
      favoriteCategory: "Fashion",
      avgOrderValue: 125
    },
    shoppingDNA: {
      style: "Casual Chic",
      budgetRange: "Mid-Range",
      ecoScore: 8.2,
      sizeSuccessRate: 94
    },
    recentPurchases: [
      { date: "Jan 6", item: "Phone Case", amount: 26 },
      { date: "Jan 5", item: "Winter Jacket", amount: 65 },
      { date: "Jan 3", item: "Wireless Headphones", amount: 89 }
    ]
  });

  const [activeSection, setActiveSection] = useState('dashboard');
  const [products] = useState([
    {
      id: 1,
      name: "Premium Wireless Earbuds",
      price: 99,
      image: "https://via.placeholder.com/200x200?text=Earbuds",
      rating: 4.5,
      reviews: 234,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Designer Winter Jacket",
      price: 150,
      image: "https://via.placeholder.com/200x200?text=Jacket",
      rating: 4.8,
      reviews: 456,
      category: "Fashion"
    },
    {
      id: 3,
      name: "Smart Phone Case",
      price: 29,
      image: "https://via.placeholder.com/200x200?text=Phone+Case",
      rating: 4.2,
      reviews: 189,
      category: "Accessories"
    },
    {
      id: 4,
      name: "Running Sneakers",
      price: 120,
      image: "https://via.placeholder.com/200x200?text=Sneakers",
      rating: 4.6,
      reviews: 321,
      category: "Fashion"
    }
  ]);

  const [orders] = useState([
    {
      id: 'ORD001',
      date: '2026-01-05',
      items: ['Wireless Earbuds', 'Phone Case'],
      total: 128,
      status: 'Delivered',
      month: 'January 2026'
    },
    {
      id: 'ORD002',
      date: '2025-12-28',
      items: ['Winter Jacket'],
      total: 150,
      status: 'Delivered',
      month: 'December 2025'
    },
    {
      id: 'ORD003',
      date: '2025-12-15',
      items: ['Running Sneakers', 'Smart Watch'],
      total: 245,
      status: 'Delivered',
      month: 'December 2025'
    },
    {
      id: 'ORD004',
      date: '2025-11-22',
      items: ['Laptop Stand'],
      total: 45,
      status: 'Delivered',
      month: 'November 2025'
    }
  ]);

  const [rewardsHistory] = useState([
    {
      id: 1,
      date: '2026-01-01',
      type: 'Monthly Challenge',
      coins: 100,
      description: 'Completed December monthly target',
      month: 'January 2026'
    },
    {
      id: 2,
      date: '2025-12-25',
      type: 'Product Review',
      coins: 5,
      description: 'Reviewed Winter Jacket',
      month: 'December 2025'
    },
    {
      id: 3,
      date: '2025-12-15',
      type: 'Purchase Bonus',
      coins: 49,
      description: 'Earned from order ORD003',
      month: 'December 2025'
    }
  ]);

  const addCoins = (amount, reason) => {
    setUserData(prev => ({
      ...prev,
      currentCoins: prev.currentCoins + amount
    }));
    alert(`Congratulations! You earned ${amount} coins for ${reason}!`);
  };

  const updateProgress = (amount) => {
    setUserData(prev => ({
      ...prev,
      monthlyProgress: {
        ...prev.monthlyProgress,
        current: prev.monthlyProgress.current + amount
      }
    }));
  };

  const progressPercentage = (userData.monthlyProgress.current / userData.monthlyProgress.target) * 100;
  const remainingAmount = userData.monthlyProgress.target - userData.monthlyProgress.current;
  const daysLeft = 25; 

  return (
    <div className="profile-container">
      {/* Enhanced Navigation */}
      <div className="profile-navigation">
        <button 
          className={`nav-btn ${activeSection === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveSection('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-btn ${activeSection === 'products' ? 'active' : ''}`}
          onClick={() => setActiveSection('products')}
        >
          Products
        </button>
        <button 
          className={`nav-btn ${activeSection === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveSection('orders')}
        >
          Order History
        </button>
        <button 
          className={`nav-btn ${activeSection === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveSection('reviews')}
        >
          My Reviews
        </button>
        <button 
          className={`nav-btn ${activeSection === 'checkout' ? 'active' : ''}`}
          onClick={() => setActiveSection('checkout')}
        >
          Checkout
        </button>
        <button 
          className={`nav-btn ${activeSection === 'rewards' ? 'active' : ''}`}
          onClick={() => setActiveSection('rewards')}
        >
          Rewards History
        </button>
      </div>

      {activeSection === 'dashboard' && (
        <>
          <UserHeader userData={userData} />
          <MonthlyChallenge 
            userData={userData} 
            progressPercentage={progressPercentage}
            remainingAmount={remainingAmount}
            daysLeft={daysLeft}
          />
          <div className="profile-grid">
            <ShoppingDNA userData={userData} />
            <CoinsRewards userData={userData} />
            <Achievements userData={userData} />
            <ShoppingInsights userData={userData} />
            <RecentActivity userData={userData} />
            <QuickActions />
          </div>
          <SmartAlerts remainingAmount={remainingAmount} daysLeft={daysLeft} />
        </>
      )}

      {activeSection === 'products' && (
        <ProductStore 
          products={products} 
          addCoins={addCoins} 
          updateProgress={updateProgress}
        />
      )}

      {activeSection === 'orders' && (
        <OrderHistory orders={orders} />
      )}

      {activeSection === 'reviews' && (
        <ReviewSystem 
          products={products} 
          addCoins={addCoins}
        />
      )}

      {activeSection === 'checkout' && (
        <CheckoutSection 
          products={products}
          addCoins={addCoins}
          updateProgress={updateProgress}
        />
      )}

      {activeSection === 'rewards' && (
        <RewardsHistory rewardsHistory={rewardsHistory} />
      )}
    </div>
  )
}

export default Profile
