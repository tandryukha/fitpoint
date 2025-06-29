import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../data/mockProducts';
import { mockProducts } from '../../data/mockProducts';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { getUpsellSuggestions } from '../../utils/bundleUtils';
import './BundlePanel.css';

interface BundlePanelProps {
  cartItems: Product[];
  onClose: () => void;
}

export const BundlePanel: React.FC<BundlePanelProps> = ({ cartItems, onClose }) => {
  const { t, tf, language } = useLanguage();
  const { addToCart } = useCart();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const upsellProducts = getUpsellSuggestions(cartItems, mockProducts);
    setSuggestions(upsellProducts);
  }, [cartItems]);

  const handleToggleProduct = (productId: string) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProducts(newSelection);
  };

  const handleAddSelected = () => {
    suggestions.forEach(product => {
      if (selectedProducts.has(product.id)) {
        addToCart(product);
      }
    });
    onClose();
  };

  const calculateSavings = () => {
    // Mock savings calculation - 3% off for adding multiple items
    const selectedCount = selectedProducts.size;
    if (selectedCount >= 2) {
      const total = suggestions
        .filter(p => selectedProducts.has(p.id))
        .reduce((sum, p) => sum + p.price, 0);
      return total * 0.03;
    }
    return 0;
  };

  return (
    <div className="bundle-panel-overlay">
      <div className="bundle-panel">
        <div className="bundle-panel-header">
          <h3>Complete Your Stack</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="bundle-panel-content">
          <p className="suggestion-text">
            Based on your selection, we recommend these products:
          </p>
          
          <div className="suggested-products">
            {suggestions.map(product => (
              <div key={product.id} className="suggested-product">
                <input
                  type="checkbox"
                  id={`product-${product.id}`}
                  checked={selectedProducts.has(product.id)}
                  onChange={() => handleToggleProduct(product.id)}
                />
                <label htmlFor={`product-${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={language === 'et' ? product.nameEt : product.nameEn}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=Product';
                    }}
                  />
                  <div className="product-info">
                    <h4>{language === 'et' ? product.nameEt : product.nameEn}</h4>
                    <p className="price">€{product.price.toFixed(2)}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
          
          {calculateSavings() > 0 && (
            <div className="savings-message">
              <p>{tf('saveAmount', { amount: calculateSavings().toFixed(2) })}</p>
            </div>
          )}
        </div>
        
        <div className="bundle-panel-footer">
          <button className="skip-btn" onClick={onClose}>
            Skip for now
          </button>
          <button 
            className="add-selected-btn"
            onClick={handleAddSelected}
            disabled={selectedProducts.size === 0}
          >
            {t('addSelected')} ({selectedProducts.size})
          </button>
        </div>
      </div>
    </div>
  );
}; 