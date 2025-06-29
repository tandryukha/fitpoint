# Configuration for FitPoint.ee crawler
import os

# Base URL for the website
BASE_URL = "https://fitpoint.ee"

# Output directory for generated files
OUTPUT_DIR = "output"

# Delays between requests (in seconds)
REQUEST_DELAY = 2.0
RANDOM_DELAY_RANGE = (1.0, 3.0)

# Browser settings for Selenium
BROWSER_SETTINGS = {
    'headless': True,
    'window_size': (1920, 1080),
    'timeout': 30,
    'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# Product categories mapping (Estonian to English)
CATEGORIES = {
    'proteiinid': 'Protein',
    'protein': 'Protein', 
    'valgupulbrid': 'Protein',
    'bcaa': 'BCAA',
    'aminohapped': 'BCAA',
    'kreatiinid': 'Creatine',
    'kreatiin': 'Creatine',
    'rasvapõletajad': 'Fat Burners',
    'rasvapõletus': 'Fat Burners',
    'vitamiinid': 'Vitamins',
    'mineraalid': 'Vitamins',
    'toidulisandid': 'Supplements',
    'lisandid': 'Supplements',
    'varustus': 'Gear',
    'aksessuaarid': 'Gear',
    'sheiker': 'Gear',
    'šeiker': 'Gear',
    'joogipudel': 'Gear',
    'kindad': 'Gear',
    'vöö': 'Gear',
    'riided': 'Gear',
    'spordiriided': 'Gear'
}

# Price ranges for different categories (in EUR)
PRICE_RANGES = {
    'Protein': (15, 65),
    'BCAA': (12, 35),
    'Creatine': (10, 25),
    'Fat Burners': (18, 45),
    'Vitamins': (8, 30),
    'Supplements': (10, 40),
    'Gear': (8, 50)
}

# Image URL handling
def fix_image_url(url, base_url=BASE_URL):
    """Fix relative image URLs by adding domain prefix"""
    if not url:
        return ""
    
    # If already absolute URL, return as is
    if url.startswith('http://') or url.startswith('https://'):
        return url
    
    # If starts with //, add protocol
    if url.startswith('//'):
        return 'https:' + url
    
    # If starts with /, add base domain
    if url.startswith('/'):
        return base_url + url
    
    # If relative path, add base domain with /
    return base_url + '/' + url

# Common selectors for scraping (may need adjustment based on actual site structure)
SELECTORS = {
    'product_links': 'a[href*="/toode/"], a[href*="/product/"], .product-link, .toode-link',
    'category_links': 'a[href*="/kategooria/"], a[href*="/category/"], .category-link',
    'product_name': 'h1, .product-title, .toode-nimi',
    'product_price': '.price, .hind, .product-price',
    'product_image': 'img.product-image, .toode-pilt img, .main-image img',
    'product_description': '.description, .kirjeldus, .product-description',
    'category_name': '.breadcrumb, .category-title, .kategooria-nimi'
}

# Estonian brand names commonly found in fitness supplements
ESTONIAN_BRANDS = [
    'BioTech USA', 'Scitec Nutrition', 'Optimum Nutrition', 'Dymatize',
    'MuscleTech', 'BSN', 'Cellucor', 'Universal Nutrition', 'Gaspari',
    'Reflex Nutrition', 'PhD', 'Prozis', 'MyProtein', 'Nutrex',
    'Applied Nutrition', 'Mutant', 'Allmax', 'PVL', 'Rule1',
    'Genius Nutrition', 'Kevin Levrone', 'Olimp', 'Weider'
]

# Create output directory if it doesn't exist
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR) 