# Fitpoint AI Smart Finder - Mock E-commerce Demo

A complete mock e-commerce website showcasing AI-powered shopping features for the Estonian fitness supplement market. This project demonstrates intelligent product search, guided shopping experiences, and smart bundle recommendations.

## 🎯 Project Overview

This is a high-fidelity mock clone of the Fitpoint.ee e-commerce site that demonstrates three key AI-powered capabilities:

1. **Smart Finder**: Central search bar with autocomplete and quick-tag chips
2. **Guided Shopping**: AI-powered product ranking, filtering, and comparison tools
3. **Intelligent Bundles**: Smart upsell/cross-sell suggestions with dynamic pricing

## ✨ Key Features Implemented

### Core Shopping Experience
- **Smart Search Bar**: Autocomplete suggestions with quick-tag chips (Protein, BCAA, Lose Weight, Gear)
- **Product Catalog**: 20+ products across 4 categories with mock nutritional data
- **Advanced Filtering**: Price range, brand selection, dietary tags
- **Product Comparison**: Side-by-side comparison of up to 3 products
- **Product Detail Pages**: Complete PDP with bundle suggestions
- **Shopping Cart**: Persistent cart with bundle grouping and discounts
- **Checkout Flow**: Complete mock checkout with order confirmation

### AI-Powered Features
- **Semantic Search**: Fuzzy matching and intelligent product ranking
- **Personal Fit Scoring**: Mock AI scoring system for product recommendations
- **Bundle Logic**: Rule-based suggestions (e.g., protein + creatine + shaker)
- **Cross-sell Recommendations**: Smart suggestions based on cart contents
- **Clarification Bubbles**: AI prompts for ambiguous search queries

### User Experience
- **Internationalization**: Estonian (primary) and English language support
- **Responsive Design**: Optimized for desktop and mobile devices
- **Free Shipping Logic**: Dynamic messaging for orders approaching €69 threshold
- **Modern UI/UX**: Clean, fitness-focused design with smooth interactions

## 🏗️ Technical Implementation

### Tech Stack
- **Frontend**: React 19.1.0 with TypeScript
- **Routing**: React Router DOM 7.6.2
- **Icons**: Lucide React 0.523.0
- **Build Tool**: Create React App with React Scripts
- **State Management**: React Context API + Local Storage

### Project Structure
```
src/
├── components/
│   ├── SmartFinder.tsx         # Central search component
│   ├── ProductCard.tsx         # Product grid item
│   ├── ProductComparison.tsx   # Side-by-side comparison modal
│   ├── BundlePanel.tsx         # Bundle suggestion component
│   └── Layout.tsx              # App layout wrapper
├── pages/
│   ├── HomePage.tsx            # Landing page with Smart Finder
│   ├── ProductListPage.tsx     # Search results and filtering
│   ├── ProductDetailPage.tsx   # Individual product view
│   ├── CartPage.tsx           # Shopping cart management
│   └── CheckoutPage.tsx       # Mock checkout flow
├── context/
│   ├── LanguageContext.tsx    # i18n state management
│   └── CartContext.tsx        # Shopping cart state
├── data/
│   ├── mockProducts.ts        # Product catalog data
│   └── translations.ts        # Estonian/English copy
├── utils/
│   ├── searchUtils.ts         # Search and filtering logic
│   └── bundleUtils.ts         # Bundle recommendation rules
└── App.tsx                    # Main application component
```

### Mock Data & AI Behaviors
- **Product Catalog**: 20+ supplements with Estonian/English names, nutritional info, and mock "Personal Fit Scores"
- **Search Logic**: Semantic matching with autocomplete and clarification prompts
- **Bundle Recommendations**: Rule-based suggestions with 5-7% discounts
- **Ranking Algorithm**: Combines relevance, Personal Fit Score, rating, and price

## 🚀 How to Run the Project

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Quick Start

1. **Navigate to the project directory**:
   ```bash
   cd fitpoint-mock
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm start` - Runs the development server on port 3000
- `npm run build` - Creates an optimized production build
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (not recommended)

### ⚠️ Common Issues

**Error: "Could not read package.json"**
- Make sure you're in the `fitpoint-mock` directory, not the parent `fitpoint` directory
- Run `pwd` to check your current directory
- Use `cd fitpoint-mock` to navigate to the correct folder

## 🛒 Complete User Journey

1. **Home Page**: Visitor sees Smart Finder with quick-tag chips
2. **Search**: Click "Protein" chip or type custom query
3. **Results**: Filtered and ranked products with comparison options
4. **Compare**: Select 2-3 products for side-by-side comparison
5. **Product Detail**: View detailed product info with bundle suggestions
6. **Add to Cart**: Bundle recommendations appear in slide-over panel
7. **Cart**: Review items with free shipping progress indicator
8. **Checkout**: Complete mock checkout flow
9. **Confirmation**: Order summary with demo restart option

## 🌍 Language Support

The application supports both Estonian (primary) and English:
- Toggle language using the language selector in the header
- All product names, descriptions, and UI copy are translated
- Maintains language preference across page navigation

## 📱 Mobile Optimization

- Responsive design works seamlessly on mobile devices
- Touch-optimized interactions for comparison and bundle selection
- Collapsible navigation and search interface
- Mobile-first approach to cart and checkout flows

## 🎨 Design Philosophy

- **Fitness-focused**: Color scheme and imagery aligned with health/fitness branding
- **Clean & Modern**: Minimalist design that doesn't distract from products
- **Trust-building**: Clear pricing, shipping info, and product details
- **Accessibility**: High contrast, readable fonts, and logical navigation

## 📊 Demo Analytics

The application includes mock analytics tracking for:
- Smart Finder usage and search queries
- Product comparison interactions
- Bundle suggestion acceptance rates
- Free shipping banner effectiveness
- Complete conversion funnel metrics

## 🔄 Project Status

**Current State**: ✅ **Complete and Ready to Demo**

All acceptance criteria from the original product requirements have been implemented:
- ✅ Smart Finder bar & chips (desktop & mobile)
- ✅ AI-powered search with personalized results
- ✅ Product comparison overlay (up to 3 items)
- ✅ Bundle suggestions on PDP and after add-to-cart
- ✅ Free shipping logic (€49-€69 threshold)
- ✅ End-to-end user journey
- ✅ Estonian/English internationalization
- ✅ Legal disclaimers and mock AI behaviors

## 👥 Development Notes

This is a **demonstration prototype** designed to showcase AI-powered e-commerce features. It includes:
- Mock data and simulated AI responses
- Local storage for cart persistence
- No backend integrations required
- Responsive design suitable for presentation

For any questions or issues running the project, ensure you're in the correct directory (`fitpoint-mock`) and have Node.js installed.
