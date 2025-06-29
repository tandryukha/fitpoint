import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { searchProducts, searchByQuickTag } from '../../utils/searchUtils';
import { mockProducts } from '../../data/mockProducts';
import './SmartFinder.css';

interface QuickTag {
  id: 'protein' | 'bcaa' | 'loseWeight' | 'gear';
  labelKey: string;
}

const quickTags: QuickTag[] = [
  { id: 'protein', labelKey: 'quickTags.protein' },
  { id: 'bcaa', labelKey: 'quickTags.bcaa' },
  { id: 'loseWeight', labelKey: 'quickTags.loseWeight' },
  { id: 'gear', labelKey: 'quickTags.gear' }
];

export const SmartFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      const result = searchProducts(searchQuery, mockProducts, language);
      
      // Store search result in sessionStorage for the PLP to use
      sessionStorage.setItem('searchResult', JSON.stringify(result));
      sessionStorage.setItem('searchQuery', searchQuery);
      
      // Navigate to products page
      navigate('/products');
    }
  }, [language, navigate]);

  const handleQuickTag = (tagId: QuickTag['id']) => {
    const products = searchByQuickTag(tagId, mockProducts);
    
    // Store result in sessionStorage
    sessionStorage.setItem('searchResult', JSON.stringify({
      products,
      query: t(`quickTags.${tagId}`)
    }));
    sessionStorage.setItem('searchQuery', t(`quickTags.${tagId}`));
    
    // Navigate to products page
    navigate('/products');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= 3) {
      const result = searchProducts(value, mockProducts, language);
      setSuggestions(result.suggestions || []);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="smart-finder">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={t('smartFinderPlaceholder')}
            className="search-input"
            onClick={(e) => e.stopPropagation()}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
      
      <div className="quick-tags">
        {quickTags.map((tag) => (
          <button
            key={tag.id}
            className="quick-tag"
            onClick={() => handleQuickTag(tag.id)}
          >
            {t(tag.labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}; 