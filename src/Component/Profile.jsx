import React, { useState } from 'react'
import './Profile.css'
import UserHeader from './UserHeader'
import MonthlyChallenge from './MonthlyChallenge'
import ShoppingDNA from './ShoppingDNA'
import CoinsRewards from './CoinsRewards'
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
    monthlyProgress: { current: 1800, target: 9999 },
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
      { date: "Jan 6", item: "Phone Case", amount: 260 },
      { date: "Jan 5", item: "Winter Jacket", amount: 650 },
      { date: "Jan 3", item: "Wireless Headphones", amount: 890 }
    ]
  });

  const [activeSection, setActiveSection] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [products] = useState([
    {
      id: 1,
      name: "Premium Wireless Earbuds",
      price: 99,
      image: "",
      rating: 4.5,
      reviews: 234,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Designer Winter Jacket",
      price: 150,
      image: "",
      rating: 4.8,
      reviews: 456,
      category: "Fashion"
    },
    {
      id: 3,
      name: "Smart Phone Case",
      price: 29,
      image: "",
      rating: 4.2,
      reviews: 189,
      category: "Accessories"
    },
    {
      id: 4,
      name: "Running Sneakers",
      price: 120,
      image: "",
      rating: 4.6,
      reviews: 321,
      category: "Fashion"
    }
  ]);

  const [orders, setOrders] = useState([
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

  const [rewardsHistory, setRewardsHistory] = useState([
    {
      id: 1,
      date: '2026-01-01',
      type: 'Monthly Challenge',
      coins: 1000,
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

  const addCoins = (amount, reason, type = 'Purchase Bonus', orderId = null) => {
    setUserData(prev => ({
      ...prev,
      currentCoins: prev.currentCoins + amount
    }));
    
    // Add reward entry
    addRewardEntry({
      type: type,
      coins: amount,
      description: reason,
      orderId: orderId
    });
    
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

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    const coinsEarned = Math.floor(product.price / 10) * 2;
    addCoins(coinsEarned, `adding ${product.name} to cart`, 'Shopping Action');
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const addNewOrder = (orderData) => {
    const currentDate = new Date();
    const orderId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const newOrder = {
      id: orderId,
      date: currentDate.toISOString().split('T')[0],
      items: orderData.items,
      total: orderData.total,
      status: 'Processing',
      month: monthYear,
      timestamp: currentDate.toLocaleString()
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    // Update total orders count
    setUserData(prev => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        totalOrders: prev.achievements.totalOrders + 1
      }
    }));
    
    return newOrder;
  };

  const addRewardEntry = (rewardData) => {
    const currentDate = new Date();
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const weekRange = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    
    const newReward = {
      id: rewardsHistory.length + 1,
      date: currentDate.toISOString().split('T')[0],
      type: rewardData.type,
      coins: rewardData.coins,
      description: rewardData.description,
      month: monthYear,
      week: weekRange,
      timestamp: currentDate.toLocaleString(),
      orderId: rewardData.orderId || null
    };
    
    setRewardsHistory(prevRewards => [newReward, ...prevRewards]);
    return newReward;
  };

  const progressPercentage = (userData.monthlyProgress.current / userData.monthlyProgress.target) * 100;
  const remainingAmount = userData.monthlyProgress.target - userData.monthlyProgress.current;
  const daysLeft = 25; 

  return (
    <div className="profile-container">
    
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


            <RecentActivity userData={userData} />
            <QuickActions />
          </div>
          <SmartAlerts remainingAmount={remainingAmount} daysLeft={daysLeft} />
        </>
      )}

      {activeSection === 'products' && (
        <ProductStore 
          products={products} 
          cart={cart}
          addToCart={addToCart}
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
          cart={cart}
          updateCart={updateCart}
          clearCart={clearCart}
          addCoins={addCoins}
          updateProgress={updateProgress}
          addNewOrder={addNewOrder}
        />
      )}

      {activeSection === 'rewards' && (
        <RewardsHistory rewardsHistory={rewardsHistory} />
      )}
    </div>
  )
}

export default Profile
