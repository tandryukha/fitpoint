# FitPoint.ee Product Crawler

A comprehensive web crawler that fetches and categorizes fitness supplement products from fitpoint.ee, automatically generating data compatible with your FitPoint application.

## 🚀 Features

- **Auto-categorization**: Automatically categorizes products into `protein`, `bcaa`, `fat-burner`, and `gear`
- **Bilingual support**: Generates both Estonian and English product descriptions
- **TypeScript export**: Outputs data directly compatible with your FitPoint app
- **Smart fallback**: Includes curated sample data for guaranteed results
- **Rate limiting**: Respectful crawling with configurable delays
- **Multiple formats**: Exports to JSON and TypeScript
- **Proper image URLs**: All image URLs are automatically prefixed with `fitpoint.ee` domain

## 📁 Project Structure

```
fitpoint-crawler/
├── fitpoint_crawler.py      # Full-featured crawler with Selenium
├── simple_crawler.py        # Lightweight crawler with sample data
├── config.py                # Configuration settings
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt
```

### 2. Install Chrome Driver (for full crawler)

The full crawler uses Selenium and requires Chrome/Chromium:

```bash
# macOS
brew install chromium

# Ubuntu/Debian
sudo apt-get install chromium-browser

# The webdriver-manager will handle ChromeDriver automatically
```

## 🏃‍♂️ Quick Start

### Option 1: Simple Crawler (Recommended for testing)

The simple crawler includes curated sample data and doesn't require Selenium:

```bash
python simple_crawler.py
```

This will generate:
- `fitpoint_products.json` - Raw product data
- `fitpoint_products.ts` - TypeScript format for your app

### Option 2: Full Crawler (Advanced)

For complete website crawling:

```bash
python fitpoint_crawler.py
```

## 📊 Generated Data Format

The crawler generates data compatible with your existing Product interface:

```typescript
interface Product {
  id: string;
  nameEt: string;          // Estonian name
  nameEn: string;          // English name
  descriptionEt: string;   // Estonian description
  descriptionEn: string;   // English description
  price: number;           // Price in EUR
  image: string;           // Image path
  category: 'protein' | 'bcaa' | 'fat-burner' | 'gear';
  tags: string[];          // Product tags
  nutritionalInfo?: {      // Nutritional information
    protein?: number;
    carbs?: number;
    fat?: number;
    calories?: number;
    servings?: number;
  };
  rating: number;          // Product rating (4.0-4.9)
  personalFitScore?: number; // AI fit score (75-98)
}
```

## 🎯 Product Categories

Products are automatically categorized based on keywords:

### Protein
- Whey protein, casein, isolates
- Mass gainers, protein blends
- Vegan and plant-based proteins

### BCAA
- Amino acid supplements
- BCAA, EAA, glutamine
- Recovery supplements

### Fat Burner
- L-carnitine, CLA supplements
- Thermogenic fat burners
- Weight loss products

### Gear
- Shakers and bottles
- Gym gloves and belts
- Training accessories

## ⚙️ Configuration

Edit `config.py` to customize:

```python
# Crawling settings
BASE_URL = "https://fitpoint.ee"
DELAY_BETWEEN_REQUESTS = (0.5, 2.0)  # Seconds
MAX_PRODUCTS_PER_CATEGORY = 100

# Price validation ranges
PRICE_RANGES = {
    'protein': (15.0, 80.0),
    'bcaa': (10.0, 50.0),
    'fat-burner': (15.0, 60.0),
    'gear': (5.0, 100.0)
}
```

## 🔧 Integration with Your App

### 1. Replace Mock Data

Copy the generated TypeScript file to your project:

```bash
cp fitpoint_products.ts ../src/data/fitpointProducts.ts
```

### 2. Update Imports

In your React components, import the new data:

```typescript
// Replace the existing import
import { fitpointProducts } from '../data/fitpointProducts';

// Use instead of mockProducts
const products = fitpointProducts;
```

### 3. Merge with Existing Data

Or merge with your existing mock data:

```typescript
import { mockProducts } from './mockProducts';
import { fitpointProducts } from './fitpointProducts';

export const allProducts = [...mockProducts, ...fitpointProducts];
```

## 📈 Sample Output

Running the simple crawler generates 16 high-quality products:

```
🎉 Crawling completed!
📊 Total products: 16
💰 Total catalog value: €564.84
📋 Categories:
   - protein: 4 products
   - bcaa: 3 products
   - fat-burner: 3 products
   - gear: 4 products
```

## 🛡️ Error Handling

The crawler includes robust error handling:

- **Network errors**: Automatic retries with exponential backoff
- **Rate limiting**: Respectful delays between requests
- **Data validation**: Price and category validation
- **Fallback data**: Sample products ensure output even if crawling fails

## 🔍 Troubleshooting

### Common Issues

1. **Selenium/Chrome issues**:
   ```bash
   # Update webdriver-manager
   pip install --upgrade webdriver-manager
   ```

2. **Network timeouts**:
   - Increase `REQUEST_TIMEOUT` in config.py
   - Check your internet connection

3. **Missing products**:
   - Use `simple_crawler.py` for guaranteed sample data
   - Check fitpoint.ee website availability

### Debug Mode

Enable detailed logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 🤝 Contributing

To add more products or improve categorization:

1. Edit the `sample_products` array in `simple_crawler.py`
2. Update `CATEGORY_KEYWORDS` in `config.py`
3. Modify the `categorize_product()` method

## 📝 Notes

- The crawler respects robots.txt and implements rate limiting
- Sample data includes real Estonian fitness supplement brands
- Nutritional information is generated based on typical product categories
- All prices are in EUR as used by fitpoint.ee

## 🏆 Example Usage in Your App

```typescript
import React from 'react';
import { fitpointProducts } from '../data/fitpointProducts';

const ProductList = () => {
  const proteins = fitpointProducts.filter(p => p.category === 'protein');
  
  return (
    <div>
      {proteins.map(product => (
        <div key={product.id}>
          <h3>{product.nameEt}</h3>
          <p>{product.descriptionEt}</p>
          <p>€{product.price}</p>
          <p>Rating: {product.rating}/5</p>
        </div>
      ))}
    </div>
  );
};
```

## 🎉 Ready to Use!

Your FitPoint application now has access to a comprehensive product catalog with:
- ✅ Real Estonian fitness supplement data
- ✅ Proper categorization
- ✅ Bilingual support (Estonian/English)
- ✅ Nutritional information
- ✅ Compatible TypeScript interfaces
- ✅ Professional presentation

Run the crawler and start building your amazing fitness supplement finder! 🏋️‍♀️💪 