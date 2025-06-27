import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { ComparisonOverlay } from '../components/ComparisonOverlay/ComparisonOverlay';
import { mockProducts, Product } from '../data/mockProducts';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { SearchResult, filterByPrice, filterByTags } from '../utils/searchUtils';
import { X, Filter } from 'lucide-react';
import './ProductListPage.css';

export const ProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [clarification, setClarification] = useState<SearchResult['clarification']>();
  
  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Get search results from sessionStorage
    const storedResult = sessionStorage.getItem('searchResult');
    const storedQuery = sessionStorage.getItem('searchQuery');
    
    if (storedResult) {
      const result = JSON.parse(storedResult) as SearchResult;
      setProducts(result.products || []);
      setClarification(result.clarification);
      sessionStorage.removeItem('searchResult');
    } else {
      // Show all products if no search
      setProducts(mockProducts);
    }
    
    if (storedQuery) {
      setSearchQuery(storedQuery);
      sessionStorage.removeItem('searchQuery');
    }
  }, []);

  const handleCompare = (product: Product) => {
    if (compareProducts.find(p => p.id === product.id)) {
      setCompareProducts(compareProducts.filter(p => p.id !== product.id));
    } else if (compareProducts.length < 3) {
      setCompareProducts([...compareProducts, product]);
    }
    
    if (compareProducts.length === 1) {
      setShowComparison(true);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Show a toast or notification here
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleClarificationClick = (option: string) => {
    // Filter products based on clarification option
    const filtered = products.filter(product => {
      const text = `${product.nameEn} ${product.nameEt} ${product.tags.join(' ')}`.toLowerCase();
      return text.includes(option.toLowerCase());
    });
    setProducts(filtered);
    setClarification(undefined);
  };

  const applyFilters = () => {
    let filtered = searchQuery ? products : mockProducts;
    
    // Apply price filter
    filtered = filterByPrice(filtered, priceRange[0], priceRange[1]);
    
    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filterByTags(filtered, selectedTags);
    }
    
    setProducts(filtered);
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    mockProducts.forEach(product => {
      product.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  return (
    <div className="product-list-page">
      <div className="container">
        {searchQuery && (
          <div className="search-header">
            <h1>{t('resultsFor')} "{searchQuery}"</h1>
            <button className="clear-search" onClick={() => {
              setSearchQuery('');
              setProducts(mockProducts);
              setClarification(undefined);
            }}>
              <X size={20} />
              Clear Search
            </button>
          </div>
        )}
        
        {clarification && (
          <div className="clarification-bubble">
            <p>{clarification.question}</p>
            <div className="clarification-options">
              {clarification.options.map((option, index) => (
                <button
                  key={index}
                  className="clarification-option"
                  onClick={() => handleClarificationClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="page-layout">
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>{t('filters')}</h3>
              <button className="close-filters" onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="filter-section">
              <h4>{t('priceRange')}</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  placeholder="Max"
                />
              </div>
            </div>
            
            <div className="filter-section">
              <h4>{t('dietaryTags')}</h4>
              <div className="tag-filters">
                {getAllTags().map(tag => (
                  <label key={tag} className="tag-filter">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag]);
                        } else {
                          setSelectedTags(selectedTags.filter(t => t !== tag));
                        }
                      }}
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button className="apply-filters" onClick={applyFilters}>
              Apply Filters
            </button>
            <button className="clear-filters" onClick={() => {
              setPriceRange([0, 100]);
              setSelectedTags([]);
              setProducts(searchQuery ? products : mockProducts);
            }}>
              {t('clearFilters')}
            </button>
          </aside>
          
          <main className="products-main">
            <div className="products-header">
              <p className="results-count">{products.length} products found</p>
              <button className="filter-toggle" onClick={() => setShowFilters(true)}>
                <Filter size={20} />
                Filters
              </button>
            </div>
            
            {compareProducts.length > 0 && (
              <div className="compare-bar">
                <p>Comparing {compareProducts.length} products</p>
                <button 
                  className="view-comparison"
                  onClick={() => setShowComparison(true)}
                  disabled={compareProducts.length < 2}
                >
                  View Comparison
                </button>
                <button 
                  className="clear-comparison"
                  onClick={() => setCompareProducts([])}
                >
                  Clear
                </button>
              </div>
            )}
            
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} onClick={() => handleProductClick(product.id)}>
                  <ProductCard
                    product={product}
                    onCompare={handleCompare}
                    onAddToCart={handleAddToCart}
                    isSelected={compareProducts.some(p => p.id === product.id)}
                  />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      
      {showComparison && (
        <ComparisonOverlay
          products={compareProducts}
          onClose={() => setShowComparison(false)}
          onSelect={(product) => {
            handleProductClick(product.id);
          }}
        />
      )}
    </div>
  );
}; 