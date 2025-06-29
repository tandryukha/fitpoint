import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../../data/mockProducts';
import { useLanguage } from '../../context/LanguageContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onCompare?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isSelected?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCompare,
  onAddToCart,
  isSelected = false
}) => {
  const { t, language } = useLanguage();
  const productName = language === 'et' ? product.nameEt : product.nameEn;
  const productDescription = language === 'et' ? product.descriptionEt : product.descriptionEn;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCompare) {
      onCompare(product);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className={`product-card ${isSelected ? 'selected' : ''}`}>
      {product.personalFitScore && product.personalFitScore >= 90 && (
        <div className="ribbon">Top Match</div>
      )}
      
      <div className="product-image">
        <img src={product.image} alt={productName} onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=Product';
        }} />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{productName}</h3>
        <p className="product-description">{productDescription}</p>
        
        <div className="product-stats">
          <div className="rating">
            <Star size={16} fill="#ff6b35" color="#ff6b35" />
            <span>{product.rating}</span>
          </div>
          {product.personalFitScore && (
            <div className="fit-score">
              <span className="score-label">{t('personalFitScore')}:</span>
              <span className="score-value">{product.personalFitScore}%</span>
            </div>
          )}
        </div>
        
        <div className="product-price">€{product.price.toFixed(2)}</div>
        
        <div className="product-actions">
          {onCompare && (
            <button 
              className="compare-btn"
              onClick={handleCompareClick}
            >
              {t('compare')}
            </button>
          )}
          {onAddToCart && (
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCartClick}
            >
              {t('addToCart')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 