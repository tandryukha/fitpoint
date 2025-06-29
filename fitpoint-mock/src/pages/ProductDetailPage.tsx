import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft } from 'lucide-react';
import { mockProducts, Product } from '../data/mockProducts';
import { BundlePanel } from '../components/BundlePanel/BundlePanel';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getBundleSuggestions, calculateBundlePrice } from '../utils/bundleUtils';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, tf, language } = useLanguage();
  const { addToCart, addBundle } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [showBundlePanel, setShowBundlePanel] = useState(false);
  const [bundleSuggestion, setBundleSuggestion] = useState<ReturnType<typeof getBundleSuggestions>>(null);

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      const bundle = getBundleSuggestions(foundProduct, mockProducts);
      setBundleSuggestion(bundle);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const productName = language === 'et' ? product.nameEt : product.nameEn;
  const productDescription = language === 'et' ? product.descriptionEt : product.descriptionEn;

  const handleAddToCart = () => {
    addToCart(product);
    setShowBundlePanel(true);
  };

  const handleAddBundle = () => {
    if (bundleSuggestion) {
      addBundle(bundleSuggestion.products, bundleSuggestion.discount);
      // Navigate to cart
      navigate('/cart');
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
          Back to products
        </button>
        
        <div className="product-detail-grid">
          <div className="product-image-section">
            <img 
              src={product.image} 
              alt={productName}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x500?text=Product';
              }}
            />
          </div>
          
          <div className="product-info-section">
            <h1 className="product-title">{productName}</h1>
            <p className="product-description">{productDescription}</p>
            
            <div className="product-meta">
              <div className="rating-section">
                <Star size={20} fill="#ff6b35" color="#ff6b35" />
                <span className="rating-value">{product.rating}</span>
                <span className="rating-count">(245 reviews)</span>
              </div>
              
              {product.personalFitScore && (
                <div className="fit-score-section">
                  <span className="fit-score-label">{t('personalFitScore')}:</span>
                  <span className="fit-score-value">{product.personalFitScore}%</span>
                </div>
              )}
            </div>
            
            <div className="price-section">
              <span className="price">€{product.price.toFixed(2)}</span>
              <span className="price-info">Tax included</span>
            </div>
            
            {bundleSuggestion && (
              <div className="bundle-suggestion-strip">
                <h3>{t('bundleSuggestion')}</h3>
                <div className="bundle-products">
                  {bundleSuggestion.products.map((p, index) => (
                    <div key={p.id} className="bundle-product">
                      <img 
                        src={p.image} 
                        alt={language === 'et' ? p.nameEt : p.nameEn}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60x60?text=Product';
                        }}
                      />
                      {index < bundleSuggestion.products.length - 1 && <span className="plus">+</span>}
                    </div>
                  ))}
                </div>
                <div className="bundle-price">
                  <span className="original-price">€{bundleSuggestion.products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</span>
                  <span className="bundle-price-value">€{calculateBundlePrice(bundleSuggestion).toFixed(2)}</span>
                  <span className="savings">{tf('saveAmount', { amount: bundleSuggestion.savings.toFixed(2) })}</span>
                </div>
                <button className="add-bundle-btn" onClick={handleAddBundle}>
                  {t('addBundle')}
                </button>
              </div>
            )}
            
            <button className="add-to-cart-btn primary" onClick={handleAddToCart}>
              {t('addToCart')}
            </button>
            
            {product.nutritionalInfo && (
              <div className="nutritional-section">
                <h3>{t('nutritionalInfo')}</h3>
                <div className="nutritional-grid">
                  {product.nutritionalInfo.protein !== undefined && (
                    <div className="nutritional-item">
                      <span className="label">{t('protein')}</span>
                      <span className="value">{product.nutritionalInfo.protein}g</span>
                    </div>
                  )}
                  {product.nutritionalInfo.carbs !== undefined && (
                    <div className="nutritional-item">
                      <span className="label">{t('carbs')}</span>
                      <span className="value">{product.nutritionalInfo.carbs}g</span>
                    </div>
                  )}
                  {product.nutritionalInfo.fat !== undefined && (
                    <div className="nutritional-item">
                      <span className="label">{t('fat')}</span>
                      <span className="value">{product.nutritionalInfo.fat}g</span>
                    </div>
                  )}
                  {product.nutritionalInfo.calories !== undefined && (
                    <div className="nutritional-item">
                      <span className="label">{t('calories')}</span>
                      <span className="value">{product.nutritionalInfo.calories}</span>
                    </div>
                  )}
                  {product.nutritionalInfo.servings !== undefined && (
                    <div className="nutritional-item">
                      <span className="label">{t('servings')}</span>
                      <span className="value">{product.nutritionalInfo.servings}</span>
                    </div>
                  )}
                </div>
                <p className="per-serving">{t('perServing')}</p>
              </div>
            )}
            
            <div className="tags-section">
              {product.tags.map(tag => (
                <span key={tag} className="product-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="disclaimer-section">
          <p>{t('disclaimer')}</p>
        </div>
      </div>
      
      {showBundlePanel && (
        <BundlePanel
          cartItems={[product]}
          onClose={() => setShowBundlePanel(false)}
        />
      )}
    </div>
  );
}; 