# FitPoint - Fitness Supplement E-Commerce Application

🔗 **Repository**: https://github.com/tandryukha/fitpoint

A modern, AI-powered e-commerce application for fitness supplements with smart product discovery, comparison tools, and multilingual support.

## 🌟 Features

- **Smart Product Finder**: AI-powered search with intelligent filtering
- **Product Comparison**: Side-by-side comparison tool
- **Bundle Recommendations**: Smart suggestions with discounts
- **Multilingual Support**: Estonian ↔ English language toggle
- **Complete E-commerce Flow**: From product discovery to checkout
- **Responsive Design**: Modern, mobile-first UI

## 🚀 Quick Start

**Important**: The main React application is located in the `fitpoint-mock/` directory.

```bash
# Navigate to the React application directory
cd fitpoint-mock

# Install dependencies (if not already installed)
npm install

# Start the development server
npm start

# Open your browser
# Application will be available at http://localhost:3000
```

## 📁 Project Structure

```
fitpoint/
├── README.md                         ← Main documentation (this file)
├── QUICK_START.md                     ← Quick setup guide
├── product-requirements.md            ← Project specifications
├── src/                              ← Source code (React components)
│   ├── components/                   ← Reusable UI components
│   ├── pages/                        ← Page components
│   ├── context/                      ← React context providers
│   ├── data/                         ← Mock data and translations
│   └── utils/                        ← Utility functions
└── fitpoint-mock/                    ← Main React application
    ├── package.json                  ← npm configuration
    ├── src/                          ← Application source
    ├── public/                       ← Static assets
    └── build/                        ← Production build
```

## 📖 Documentation

- **[Quick Start Guide](QUICK_START.md)**: Detailed setup instructions and troubleshooting
- **[Product Requirements](product-requirements.md)**: Complete project specifications and features
- **[Application README](fitpoint-mock/README.md)**: React application specific documentation

## 🎯 Key Components

### Smart Finder
AI-powered product search with quick filter chips for common supplement categories (Protein, BCAA, Creatine, etc.).

### Product Catalog
Comprehensive catalog of 20+ Estonian fitness supplements with detailed product information.

### Comparison Tool
Side-by-side product comparison functionality allowing users to compare specifications, prices, and features.

### Bundle System
Intelligent bundle recommendations with automatic discount calculations.

### Shopping Cart & Checkout
Complete e-commerce flow with cart management, shipping calculations, and mock checkout process.

## 🌐 Language Support

The application supports both Estonian and English languages with complete translations for:
- UI elements
- Product descriptions
- Navigation
- Error messages

## 🛠️ Technology Stack

- **Frontend**: React.js with TypeScript
- **Styling**: CSS Modules
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Version Control**: Git

## 🚨 Troubleshooting

If you encounter npm errors:

1. Ensure you're in the `fitpoint-mock/` directory
2. Check Node.js version (requires 16+)
3. Run `npm install` to install dependencies
4. Verify no other processes are using port 3000

For detailed troubleshooting, see [QUICK_START.md](QUICK_START.md).

## 📋 Project Status

✅ **Complete and Production Ready**

- All features implemented according to specifications
- Build successful without errors
- All dependencies installed and configured
- Ready for demonstration and deployment

## 🤝 Contributing

This is a portfolio/demo project. The repository is available at: https://github.com/tandryukha/fitpoint

## 📄 License

This project is a demonstration application for educational purposes.

---

**🎯 Quick Tip**: Always run npm commands from the `fitpoint-mock/` directory! 