import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const { getTotalItems } = useCart();
  const location = useLocation();
  const cartItemCount = getTotalItems();

  const toggleLanguage = () => {
    setLanguage(language === 'et' ? 'en' : 'et');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Fitpoint" onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const textLogo = document.createElement('span');
              textLogo.textContent = 'FITPOINT';
              textLogo.className = 'text-logo';
              target.parentElement?.appendChild(textLogo);
            }} />
          </Link>
          
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              {t('home')}
            </Link>
            <Link 
              to="/products" 
              className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
            >
              {t('products')}
            </Link>
          </nav>
          
          <div className="header-actions">
            <button className="lang-toggle" onClick={toggleLanguage}>
              <Globe size={20} />
              <span>{language.toUpperCase()}</span>
            </button>
            
            <Link to="/cart" className="cart-link">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="footer-container">
          <p className="disclaimer">{t('disclaimer')}</p>
          <p className="copyright">© 2024 Fitpoint Demo - Mock Website</p>
        </div>
      </footer>
    </div>
  );
}; 