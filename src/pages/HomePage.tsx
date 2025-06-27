import React, { useEffect, useState } from 'react';
import { SmartFinder } from '../components/SmartFinder/SmartFinder';
import { useLanguage } from '../context/LanguageContext';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('fitpoint-visited');
    if (hasVisited) {
      setIsReturningUser(true);
    } else {
      localStorage.setItem('fitpoint-visited', 'true');
    }
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            {isReturningUser ? t('welcomeBack') : 'Fitpoint AI Smart Finder'}
          </h1>
          <p className="hero-subtitle">
            {isReturningUser 
              ? 'Find your supplements faster with AI-powered search'
              : 'Discover the perfect supplements for your fitness goals'}
          </p>
          
          <SmartFinder />
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="features-title">Why Choose Fitpoint?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Recommendations</h3>
              <p>Our AI understands your fitness goals and suggests the perfect products</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Quick Comparison</h3>
              <p>Compare up to 3 products side-by-side to make informed decisions</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>Smart Bundles</h3>
              <p>Save money with AI-curated bundles tailored to your needs</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Get free delivery on orders over €69</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2 className="categories-title">Popular Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-emoji">💪</div>
              <h3>Proteins</h3>
              <p>Build muscle and recover faster</p>
            </div>
            <div className="category-card">
              <div className="category-emoji">⚡</div>
              <h3>Pre-Workouts</h3>
              <p>Boost your energy and focus</p>
            </div>
            <div className="category-card">
              <div className="category-emoji">🔥</div>
              <h3>Fat Burners</h3>
              <p>Achieve your weight loss goals</p>
            </div>
            <div className="category-card">
              <div className="category-emoji">🏋️</div>
              <h3>Gear</h3>
              <p>Essential workout equipment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 