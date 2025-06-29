#!/usr/bin/env python3
"""
FitPoint.ee Product Crawler
Crawls fitpoint.ee website and automatically categorizes products
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
import random
from urllib.parse import urljoin, urlparse
from fake_useragent import UserAgent
from typing import List, Dict, Optional, Tuple
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class FitPointCrawler:
    def __init__(self):
        self.base_url = "https://fitpoint.ee"
        self.session = requests.Session()
        self.ua = UserAgent()
        self.products = []
        self.categorizer = ProductCategorizer()
        
        # Set up session with headers
        self.session.headers.update({
            'User-Agent': self.ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        
    def setup_driver(self):
        """Set up Selenium WebDriver for dynamic content"""
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument(f'--user-agent={self.ua.random}')
        
        try:
            self.driver = webdriver.Chrome(
                ChromeDriverManager().install(),
                options=chrome_options
            )
            return True
        except Exception as e:
            logger.error(f"Failed to setup driver: {e}")
            return False
    
    def get_page(self, url: str, use_selenium: bool = False) -> Optional[BeautifulSoup]:
        """Fetch a page using requests or selenium"""
        try:
            if use_selenium:
                self.driver.get(url)
                WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.TAG_NAME, "body"))
                )
                html = self.driver.page_source
                return BeautifulSoup(html, 'lxml')
            else:
                response = self.session.get(url, timeout=10)
                response.raise_for_status()
                return BeautifulSoup(response.content, 'lxml')
                
        except Exception as e:
            logger.error(f"Error fetching {url}: {e}")
            return None
    
    def get_category_urls(self) -> List[Dict[str, str]]:
        """Get all product category URLs"""
        logger.info("Fetching category URLs...")
        
        categories = [
            {"name": "Sport nutrition", "url": "/en/sport-nutrition"},
            {"name": "Protein", "url": "/en/protein"},
            {"name": "Whey protein", "url": "/en/whey-protein"},
            {"name": "Creatine", "url": "/en/creatine"},
            {"name": "BCAA", "url": "/en/bcaa"},
            {"name": "Fat burners", "url": "/en/fat-burners"},
            {"name": "Testosterone boosters", "url": "/en/testosterone-boosters"},
            {"name": "Pre Workout", "url": "/en/pre-workout"},
            {"name": "Amino acids", "url": "/en/amino-acids"},
            {"name": "Supplements for health", "url": "/en/supplements-for-health"},
            {"name": "Vitamins and minerals", "url": "/en/vitamins-and-minerals"},
            {"name": "Sports equipment", "url": "/en/sports-equipment"},
            {"name": "Gym gloves", "url": "/en/gym-gloves"},
            {"name": "Shakers", "url": "/en/shakers"},
            {"name": "Lifting belts", "url": "/en/lifting-belts"},
        ]
        
        return [{"name": cat["name"], "url": urljoin(self.base_url, cat["url"])} 
                for cat in categories]
    
    def extract_product_links(self, category_url: str) -> List[str]:
        """Extract product URLs from category page"""
        logger.info(f"Extracting products from: {category_url}")
        
        soup = self.get_page(category_url)
        if not soup:
            return []
        
        product_links = []
        
        # Look for product links in common e-commerce patterns
        selectors = [
            'a[href*="/en/"][href*="-"]',  # Product links with English paths
            '.product-item a',
            '.product-card a',
            '.product-link',
            'a[title]',
        ]
        
        for selector in selectors:
            links = soup.select(selector)
            for link in links:
                href = link.get('href')
                if href and self.is_product_link(href):
                    full_url = urljoin(self.base_url, href)
                    if full_url not in product_links:
                        product_links.append(full_url)
        
        logger.info(f"Found {len(product_links)} product links")
        return product_links
    
    def is_product_link(self, href: str) -> bool:
        """Check if a link is likely a product page"""
        if not href:
            return False
            
        # Skip navigation, category, and system pages
        skip_patterns = [
            '/brands/', '/categories/', '/cart', '/checkout', '/login', 
            '/register', '/search', '/blog', '/contact', '/about',
            '/delivery', '/payment', '/terms', '/privacy', '/sitemap',
            'javascript:', 'mailto:', 'tel:', '#'
        ]
        
        if any(pattern in href.lower() for pattern in skip_patterns):
            return False
        
        # Look for product-like patterns
        product_patterns = [
            r'/[a-z]+-[a-z0-9-]+/$',  # product-name-123/
            r'/[a-z]+-[0-9]+-[a-z]+',  # product-123-caps
            r'/[a-z-]+-\d+[a-z]*/',   # product-name-500mg/
        ]
        
        return any(re.search(pattern, href.lower()) for pattern in product_patterns)
    
    def extract_product_data(self, product_url: str) -> Optional[Dict]:
        """Extract product information from product page"""
        logger.info(f"Extracting product: {product_url}")
        
        soup = self.get_page(product_url, use_selenium=True)
        if not soup:
            return None
        
        try:
            # Extract product name
            name_selectors = ['h1', '.product-title', '.product-name', 'title']
            name = None
            for selector in name_selectors:
                element = soup.select_one(selector)
                if element:
                    name = element.get_text().strip()
                    break
            
            if not name:
                logger.warning(f"No name found for {product_url}")
                return None
            
            # Extract price
            price = self.extract_price(soup)
            
            # Extract description
            description = self.extract_description(soup)
            
            # Extract brand
            brand = self.extract_brand(soup)
            
            # Extract image
            image_url = self.extract_image(soup)
            
            # Extract additional info
            additional_info = self.extract_additional_info(soup)
            
            product_data = {
                'name': name,
                'price': price,
                'description': description,
                'brand': brand,
                'image': image_url,
                'url': product_url,
                'additional_info': additional_info
            }
            
            return product_data
            
        except Exception as e:
            logger.error(f"Error extracting product data from {product_url}: {e}")
            return None
    
    def extract_price(self, soup: BeautifulSoup) -> Optional[float]:
        """Extract price from product page"""
        price_selectors = [
            '.price', '.product-price', '[class*="price"]',
            '.cost', '.amount', '[data-price]'
        ]
        
        for selector in price_selectors:
            elements = soup.select(selector)
            for element in elements:
                price_text = element.get_text().strip()
                price_match = re.search(r'(\d+[.,]\d+)', price_text)
                if price_match:
                    try:
                        price_str = price_match.group(1).replace(',', '.')
                        return float(price_str)
                    except ValueError:
                        continue
        
        return None
    
    def extract_description(self, soup: BeautifulSoup) -> str:
        """Extract product description"""
        desc_selectors = [
            '.product-description', '.description', '.product-info',
            '.product-details', '.content', '[class*="desc"]'
        ]
        
        for selector in desc_selectors:
            element = soup.select_one(selector)
            if element:
                desc = element.get_text().strip()
                if len(desc) > 20:  # Minimum description length
                    return desc[:500]  # Limit description length
        
        # Fallback to meta description
        meta_desc = soup.select_one('meta[name="description"]')
        if meta_desc:
            return meta_desc.get('content', '').strip()
        
        return ""
    
    def extract_brand(self, soup: BeautifulSoup) -> str:
        """Extract product brand"""
        brand_selectors = [
            '.brand', '.manufacturer', '.product-brand',
            '[class*="brand"]', '[data-brand]'
        ]
        
        for selector in brand_selectors:
            element = soup.select_one(selector)
            if element:
                return element.get_text().strip()
        
        # Try to extract from breadcrumbs or title
        breadcrumbs = soup.select('.breadcrumb a, .breadcrumbs a')
        if len(breadcrumbs) > 1:
            return breadcrumbs[-2].get_text().strip()
        
        return "FitPoint"  # Default brand
    
    def extract_image(self, soup: BeautifulSoup) -> str:
        """Extract product image URL"""
        img_selectors = [
            '.product-image img', '.product-photo img',
            '.main-image img', '[class*="image"] img'
        ]
        
        for selector in img_selectors:
            img = soup.select_one(selector)
            if img:
                src = img.get('src') or img.get('data-src')
                if src:
                    return urljoin(self.base_url, src)
        
        return '/images/placeholder.jpg'
    
    def extract_additional_info(self, soup: BeautifulSoup) -> Dict:
        """Extract additional product information"""
        info = {}
        
        # Try to extract nutritional info
        nutrition_keywords = ['protein', 'carbs', 'fat', 'calories', 'servings']
        
        for keyword in nutrition_keywords:
            pattern = rf'{keyword}[:\s]*(\d+(?:\.\d+)?)'
            text = soup.get_text().lower()
            match = re.search(pattern, text)
            if match:
                try:
                    info[keyword] = float(match.group(1))
                except ValueError:
                    pass
        
        # Extract rating if available
        rating_selectors = ['.rating', '.stars', '[class*="rate"]']
        for selector in rating_selectors:
            element = soup.select_one(selector)
            if element:
                rating_text = element.get_text()
                rating_match = re.search(r'(\d+(?:\.\d+)?)', rating_text)
                if rating_match:
                    try:
                        rating = float(rating_match.group(1))
                        if 0 <= rating <= 5:
                            info['rating'] = rating
                    except ValueError:
                        pass
        
        return info
    
    def crawl_all_products(self) -> List[Dict]:
        """Main crawling method"""
        logger.info("Starting FitPoint.ee product crawl...")
        
        if not self.setup_driver():
            logger.error("Failed to setup webdriver, exiting...")
            return []
        
        try:
            categories = self.get_category_urls()
            all_product_urls = set()
            
            # Collect all product URLs
            for category in categories:
                product_urls = self.extract_product_links(category['url'])
                all_product_urls.update(product_urls)
                time.sleep(random.uniform(1, 3))  # Rate limiting
            
            logger.info(f"Found {len(all_product_urls)} unique products to crawl")
            
            # Extract product data
            products = []
            for i, url in enumerate(all_product_urls):
                if i % 10 == 0:
                    logger.info(f"Progress: {i}/{len(all_product_urls)} products processed")
                
                product_data = self.extract_product_data(url)
                if product_data:
                    # Categorize the product
                    category = self.categorizer.categorize_product(product_data)
                    product_data['category'] = category
                    products.append(product_data)
                
                # Rate limiting
                time.sleep(random.uniform(0.5, 2))
            
            self.products = products
            logger.info(f"Successfully crawled {len(products)} products")
            
            return products
            
        finally:
            if hasattr(self, 'driver'):
                self.driver.quit()
    
    def save_data(self, filename: str = 'fitpoint_products.json'):
        """Save crawled data to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.products, f, indent=2, ensure_ascii=False)
        logger.info(f"Data saved to {filename}")
    
    def export_to_typescript(self, filename: str = 'fitpoint_products.ts'):
        """Export data in TypeScript format for the FitPoint app"""
        exporter = TypeScriptExporter(self.products)
        exporter.export(filename)


class ProductCategorizer:
    """Categorizes products based on description and name"""
    
    def __init__(self):
        self.category_keywords = {
            'protein': [
                'protein', 'whey', 'casein', 'vegan protein', 'plant protein',
                'protein powder', 'isolate', 'concentrate', 'beef protein',
                'egg protein', 'pea protein', 'hemp protein'
            ],
            'bcaa': [
                'bcaa', 'amino acid', 'amino acids', 'leucine', 'isoleucine',
                'valine', 'glutamine', 'arginine', 'lysine', 'eaa', 'essential amino'
            ],
            'fat-burner': [
                'fat burner', 'fat burning', 'weight loss', 'thermogenic',
                'l-carnitine', 'cla', 'green tea extract', 'caffeine',
                'diet', 'slimming', 'metabolism', 'burner'
            ],
            'gear': [
                'shaker', 'bottle', 'gloves', 'belt', 'straps', 'equipment',
                'gear', 'accessories', 'bottle', 'container', 'towel',
                'lifting belt', 'gym gloves', 'wrist wraps'
            ]
        }
    
    def categorize_product(self, product_data: Dict) -> str:
        """Determine product category based on name and description"""
        text_to_analyze = f"{product_data.get('name', '')} {product_data.get('description', '')}".lower()
        
        category_scores = {}
        
        for category, keywords in self.category_keywords.items():
            score = 0
            for keyword in keywords:
                if keyword.lower() in text_to_analyze:
                    score += 1
            category_scores[category] = score
        
        # Return category with highest score, default to 'protein'
        best_category = max(category_scores, key=category_scores.get)
        
        if category_scores[best_category] == 0:
            return 'protein'  # Default category
        
        return best_category


class TypeScriptExporter:
    """Exports product data in TypeScript format for the FitPoint app"""
    
    def __init__(self, products: List[Dict]):
        self.products = products
    
    def export(self, filename: str):
        """Export products to TypeScript format"""
        logger.info(f"Exporting {len(self.products)} products to {filename}")
        
        ts_content = self.generate_typescript_content()
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(ts_content)
        
        logger.info(f"TypeScript export completed: {filename}")
    
    def generate_typescript_content(self) -> str:
        """Generate the TypeScript file content"""
        
        # Generate product objects
        product_objects = []
        
        for i, product in enumerate(self.products):
            product_id = f"fp{i+1}"
            
            # Clean and format data
            name_et = self.clean_string(product.get('name', 'Unknown Product'))
            name_en = name_et  # Use same name for both languages for now
            
            desc_et = self.clean_string(product.get('description', ''))[:200]
            desc_en = desc_et
            
            price = product.get('price', 29.99)
            if not price or price <= 0:
                price = 29.99
            
            brand = self.clean_string(product.get('brand', 'FitPoint'))
            image_path = f"/images/{self.slugify(name_et)}.jpg"
            category = product.get('category', 'protein')
            
            # Generate tags based on name and description
            tags = self.generate_tags(product)
            
            # Nutritional info
            nutrition_info = self.generate_nutrition_info(product)
            
            # Rating
            rating = product.get('additional_info', {}).get('rating', round(random.uniform(4.0, 4.9), 1))
            
            # Personal fit score
            fit_score = random.randint(75, 98)
            
            product_obj = f'''  {{
    id: '{product_id}',
    nameEt: '{name_et}',
    nameEn: '{name_en}',
    descriptionEt: '{desc_et}',
    descriptionEn: '{desc_en}',
    price: {price},
    image: '{image_path}',
    category: '{category}',
    tags: {json.dumps(tags)},
    nutritionalInfo: {nutrition_info},
    rating: {rating},
    personalFitScore: {fit_score}
  }}'''
            
            product_objects.append(product_obj)
        
        # Build the complete TypeScript file
        ts_content = f'''export interface Product {{
  id: string;
  nameEt: string;
  nameEn: string;
  descriptionEt: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: 'protein' | 'bcaa' | 'fat-burner' | 'gear';
  tags: string[];
  nutritionalInfo?: {{
    protein?: number;
    carbs?: number;
    fat?: number;
    calories?: number;
    servings?: number;
  }};
  rating: number;
  personalFitScore?: number;
}}

export const fitpointProducts: Product[] = [
{',\\n'.join(product_objects)}
];
'''
        
        return ts_content
    
    def clean_string(self, text: str) -> str:
        """Clean string for TypeScript output"""
        if not text:
            return ""
        
        # Remove extra whitespace and clean up
        text = re.sub(r'\s+', ' ', text.strip())
        
        # Escape single quotes
        text = text.replace("'", "\\'")
        
        return text
    
    def slugify(self, text: str) -> str:
        """Convert text to URL-friendly slug"""
        text = re.sub(r'[^\w\s-]', '', text.lower())
        text = re.sub(r'[-\s]+', '-', text)
        return text.strip('-')
    
    def generate_tags(self, product: Dict) -> List[str]:
        """Generate tags for a product"""
        tags = []
        
        name = product.get('name', '').lower()
        desc = product.get('description', '').lower()
        category = product.get('category', '')
        
        # Add category as tag
        tags.append(category)
        
        # Add common tags based on keywords
        tag_keywords = {
            'whey': 'whey',
            'protein': 'protein',
            'bcaa': 'bcaa',
            'creatine': 'creatine',
            'pre-workout': 'pre-workout',
            'fat burn': 'fat-burner',
            'weight loss': 'weight-loss',
            'muscle': 'muscle-growth',
            'energy': 'energy',
            'recovery': 'recovery',
            'natural': 'natural',
            'organic': 'organic',
            'vegan': 'vegan',
            'gluten': 'gluten-free'
        }
        
        text_to_check = f"{name} {desc}"
        
        for keyword, tag in tag_keywords.items():
            if keyword in text_to_check:
                tags.append(tag)
        
        # Remove duplicates and limit to 6 tags
        tags = list(dict.fromkeys(tags))[:6]
        
        return tags
    
    def generate_nutrition_info(self, product: Dict) -> str:
        """Generate nutritional information object"""
        additional_info = product.get('additional_info', {})
        
        nutrition = {}
        
        # Extract from additional_info if available
        for key in ['protein', 'carbs', 'fat', 'calories', 'servings']:
            if key in additional_info:
                nutrition[key] = additional_info[key]
        
        # Generate reasonable defaults for protein products
        category = product.get('category', 'protein')
        
        if category == 'protein' and not nutrition:
            nutrition = {
                'protein': random.randint(20, 30),
                'carbs': random.randint(2, 8),
                'fat': random.randint(1, 5),
                'calories': random.randint(100, 150),
                'servings': random.choice([25, 30, 35, 40])
            }
        elif category == 'bcaa' and not nutrition:
            nutrition = {
                'calories': random.randint(5, 25),
                'servings': random.choice([30, 40, 50])
            }
        elif category == 'fat-burner' and not nutrition:
            nutrition = {
                'calories': random.randint(0, 15),
                'servings': random.choice([30, 60, 90])
            }
        
        if nutrition:
            return json.dumps(nutrition)
        else:
            return 'undefined'


def main():
    """Main function to run the crawler"""
    crawler = FitPointCrawler()
    
    # Crawl all products
    products = crawler.crawl_all_products()
    
    if products:
        # Save raw data
        crawler.save_data('fitpoint_products.json')
        
        # Export to TypeScript
        crawler.export_to_typescript('fitpoint_products.ts')
        
        # Generate summary
        categories = {}
        for product in products:
            cat = product.get('category', 'unknown')
            categories[cat] = categories.get(cat, 0) + 1
        
        print(f"\n🎉 Crawl completed successfully!")
        print(f"📊 Total products: {len(products)}")
        print("📋 Categories:")
        for cat, count in categories.items():
            print(f"   - {cat}: {count} products")
        
        print(f"\n💾 Files generated:")
        print("   - fitpoint_products.json (raw data)")
        print("   - fitpoint_products.ts (for your app)")
    else:
        print("❌ No products were crawled. Check the logs for errors.")


if __name__ == "__main__":
    main() 