import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './CartPage.css';

const FREE_SHIPPING_THRESHOLD = 69;

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, tf } = useLanguage();
  const { items, removeFromCart, updateQuantity, getSubtotal, getShippingCost, getTotal, clearCart } = useCart();

  const subtotal = getSubtotal();
  const shippingCost = getShippingCost();
  const total = getTotal();
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Group bundle items together
  const groupedItems = items.reduce((acc, item) => {
    if (item.bundleId) {
      if (!acc[item.bundleId]) {
        acc[item.bundleId] = [];
      }
      acc[item.bundleId].push(item);
    } else {
      acc[`single-${item.product.id}`] = [item];
    }
    return acc;
  }, {} as Record<string, typeof items>);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>{t('shoppingCart')}</h1>
          <div className="empty-cart">
            <p>{t('emptyCart')}</p>
            <Link to="/products" className="continue-shopping-btn">
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>{t('shoppingCart')}</h1>
        
        {remainingForFreeShipping > 0 && remainingForFreeShipping < 20 && (
          <div className="free-shipping-banner">
            <p>{tf('freeShippingMessage', { amount: remainingForFreeShipping.toFixed(2) })}</p>
          </div>
        )}
        
        <div className="cart-layout">
          <div className="cart-items">
            {Object.entries(groupedItems).map(([groupId, groupItems]) => {
              const isBundle = groupId.startsWith('bundle-');
              
              return (
                <div key={groupId} className={`cart-item-group ${isBundle ? 'bundle-group' : ''}`}>
                  {isBundle && (
                    <div className="bundle-header">
                      <span className="bundle-label">Bundle Deal</span>
                      <span className="bundle-discount">-{groupItems[0].bundleDiscount}%</span>
                    </div>
                  )}
                  
                  {groupItems.map(item => {
                    const productName = language === 'et' ? item.product.nameEt : item.product.nameEn;
                    const itemPrice = item.product.price * item.quantity;
                    const discountedPrice = item.bundleDiscount 
                      ? itemPrice * (1 - item.bundleDiscount / 100)
                      : itemPrice;
                    
                    return (
                      <div key={item.product.id} className="cart-item">
                        <img 
                          src={item.product.image} 
                          alt={productName}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Product';
                          }}
                        />
                        
                        <div className="item-details">
                          <h3>{productName}</h3>
                          <p className="item-category">{t(`categories.${item.product.category}`)}</p>
                        </div>
                        
                        <div className="quantity-controls">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="item-price">
                          {item.bundleDiscount && (
                            <span className="original-price">€{itemPrice.toFixed(2)}</span>
                          )}
                          <span className="price">€{discountedPrice.toFixed(2)}</span>
                        </div>
                        
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          
          <div className="cart-summary">
            <h2>{t('orderSummary')}</h2>
            
            <div className="summary-row">
              <span>{t('subtotal')}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>{t('shipping')}</span>
              <span>{shippingCost === 0 ? t('freeShipping') : `€${shippingCost.toFixed(2)}`}</span>
            </div>
            
            {shippingCost === 0 && (
              <p className="free-shipping-notice">{t('freeShippingThreshold')}</p>
            )}
            
            <div className="summary-row total">
              <span>{t('total')}</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            
            <button 
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              {t('checkout')}
            </button>
            
            <Link to="/products" className="continue-shopping-link">
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 