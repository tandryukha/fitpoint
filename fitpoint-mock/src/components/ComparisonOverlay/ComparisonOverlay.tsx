import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../../data/mockProducts';
import { useLanguage } from '../../context/LanguageContext';
import './ComparisonOverlay.css';

interface ComparisonOverlayProps {
  products: Product[];
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export const ComparisonOverlay: React.FC<ComparisonOverlayProps> = ({
  products,
  onClose,
  onSelect
}) => {
  const { t, language } = useLanguage();

  const attributes = [
    { key: 'price', label: 'Price' },
    { key: 'protein', label: t('protein') },
    { key: 'carbs', label: t('carbs') },
    { key: 'fat', label: t('fat') },
    { key: 'calories', label: t('calories') },
    { key: 'servings', label: t('servings') },
    { key: 'rating', label: t('rating') },
    { key: 'personalFitScore', label: t('personalFitScore') }
  ];

  const getValue = (product: Product, key: string) => {
    switch (key) {
      case 'price':
        return `€${product.price.toFixed(2)}`;
      case 'protein':
        return product.nutritionalInfo?.protein ? `${product.nutritionalInfo.protein}g` : '-';
      case 'carbs':
        return product.nutritionalInfo?.carbs ? `${product.nutritionalInfo.carbs}g` : '-';
      case 'fat':
        return product.nutritionalInfo?.fat ? `${product.nutritionalInfo.fat}g` : '-';
      case 'calories':
        return product.nutritionalInfo?.calories ? `${product.nutritionalInfo.calories}` : '-';
      case 'servings':
        return product.nutritionalInfo?.servings || '-';
      case 'rating':
        return product.rating.toFixed(1);
      case 'personalFitScore':
        return product.personalFitScore ? `${product.personalFitScore}%` : '-';
      default:
        return '-';
    }
  };

  return (
    <div className="comparison-overlay">
      <div className="comparison-content">
        <div className="comparison-header">
          <h2>{t('comparisonTitle')}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="comparison-body">
          <div className="comparison-table">
            <div className="comparison-column">
              <div className="comparison-cell header">Attribute</div>
              {attributes.map(attr => (
                <div key={attr.key} className="comparison-cell attribute">
                  {attr.label}
                </div>
              ))}
            </div>
            
            {products.map((product) => (
              <div key={product.id} className="comparison-column">
                <div className="comparison-cell header product-header">
                  <img 
                    src={product.image} 
                    alt={language === 'et' ? product.nameEt : product.nameEn}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Product';
                    }}
                  />
                  <h4>{language === 'et' ? product.nameEt : product.nameEn}</h4>
                </div>
                {attributes.map(attr => (
                  <div key={attr.key} className="comparison-cell">
                    {getValue(product, attr.key)}
                  </div>
                ))}
                <div className="comparison-cell action">
                  <button className="select-btn" onClick={() => onSelect(product)}>
                    {t('select')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="comparison-footer">
          <p className="disclaimer">{t('disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}; 