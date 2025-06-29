import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './CheckoutPage.css';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { items, getTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber] = useState(`FP-${Date.now().toString().slice(-8)}`);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  const handleRestartDemo = () => {
    navigate('/');
  };

  if (orderComplete) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="confirmation-container">
            <div className="confirmation-icon">✓</div>
            <h1>{t('orderConfirmed')}</h1>
            <p className="order-number">{t('orderNumber')} {orderNumber}</p>
            <p className="confirmation-message">
              Thank you for trying our demo! In a real scenario, you would receive
              an order confirmation email and tracking information.
            </p>
            <button className="restart-demo-btn" onClick={handleRestartDemo}>
              {t('restartDemo')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>{t('checkoutTitle')}</h1>
        
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="form-section">
              <h2>{t('contactInfo')}</h2>
              <div className="form-group">
                <label htmlFor="email">{t('email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </section>
            
            <section className="form-section">
              <h2>{t('shippingAddress')}</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">{t('firstName')}</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">{t('lastName')}</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">{t('address')}</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">{t('city')}</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">{t('postalCode')}</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{t('phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </section>
            
            <section className="form-section">
              <h2>{t('paymentMethod')}</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" value="card" defaultChecked />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="paypal" />
                  <span>PayPal</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="bank" />
                  <span>Bank Transfer</span>
                </label>
              </div>
            </section>
            
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="processing">Processing...</span>
              ) : (
                t('placeOrder')
              )}
            </button>
          </form>
          
          <aside className="order-summary">
            <h2>{t('orderSummary')}</h2>
            <div className="summary-items">
              {items.map(item => {
                const productName = language === 'et' ? item.product.nameEt : item.product.nameEn;
                return (
                  <div key={item.product.id} className="summary-item">
                    <span className="item-name">{productName} x{item.quantity}</span>
                    <span className="item-price">€{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="summary-total">
              <span>{t('total')}</span>
              <span>€{getTotal().toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}; 