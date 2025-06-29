"""
Configuration settings for FitPoint.ee crawler
"""
import os

# Base configuration
BASE_URL = "https://fitpoint.ee"
DELAY_BETWEEN_REQUESTS = (0.5, 2.0)  # Random delay range in seconds
MAX_PRODUCTS_PER_CATEGORY = 100
REQUEST_TIMEOUT = 10

# Output directory for generated files
OUTPUT_DIR = "output"

# User agents rotation
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
]

# Category mappings from FitPoint.ee to our app categories
CATEGORY_MAPPINGS = {
    'sport-nutrition': 'protein',
    'protein': 'protein',
    'whey-protein': 'protein',
    'casein': 'protein',
    'vegan-protein': 'protein',
    'gainers': 'protein',
    'bcaa': 'bcaa',
    'amino-acids': 'bcaa',
    'fat-burners': 'fat-burner',
    'l-carnitine': 'fat-burner',
    'cla': 'fat-burner',
    'sports-equipment': 'gear',
    'shakers': 'gear',
    'gym-gloves': 'gear',
    'lifting-belts': 'gear',
    'bottles': 'gear',
    'accessories': 'gear'
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

# Product categorization keywords
CATEGORY_KEYWORDS = {
    'protein': {
        'primary': ['protein', 'whey', 'casein', 'isolate', 'concentrate'],
        'secondary': ['muscle growth', 'recovery', 'amino', 'gainer', 'mass']
    },
    'bcaa': {
        'primary': ['bcaa', 'amino acid', 'amino acids', 'leucine', 'glutamine'],
        'secondary': ['recovery', 'endurance', 'muscle', 'workout', 'eaa']
    },
    'fat-burner': {
        'primary': ['fat burner', 'weight loss', 'l-carnitine', 'thermogenic'],
        'secondary': ['diet', 'slim', 'metabolism', 'energy', 'caffeine', 'cla']
    },
    'gear': {
        'primary': ['shaker', 'bottle', 'gloves', 'belt', 'equipment'],
        'secondary': ['accessories', 'gear', 'training', 'gym', 'fitness']
    }
}

# Price ranges for validation (in EUR)
PRICE_RANGES = {
    'protein': (15.0, 80.0),
    'bcaa': (10.0, 50.0),
    'fat-burner': (15.0, 60.0),
    'gear': (5.0, 100.0),
    'Protein': (15, 65),
    'BCAA': (12, 35),
    'Creatine': (10, 25),
    'Fat Burners': (18, 45),
    'Vitamins': (8, 30),
    'Supplements': (10, 40),
    'Gear': (8, 50)
}

# Default nutritional values for categories (when not specified)
DEFAULT_NUTRITION = {
    'protein': {
        'protein': (20, 30),
        'carbs': (2, 8),
        'fat': (1, 5),
        'calories': (100, 150),
        'servings': [25, 30, 35, 40]
    },
    'bcaa': {
        'calories': (5, 25),
        'servings': [30, 40, 50, 60]
    },
    'fat-burner': {
        'calories': (0, 15),
        'servings': [30, 60, 90]
    },
    'gear': {}
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

# Selenium configuration
SELENIUM_CONFIG = {
    'implicit_wait': 10,
    'page_load_timeout': 30,
    'window_size': (1920, 1080),
    'headless': True
}

# Browser settings for Selenium
BROWSER_SETTINGS = {
    'headless': True,
    'window_size': (1920, 1080),
    'timeout': 30,
    'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

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

# Output configuration
OUTPUT_CONFIG = {
    'json_file': 'fitpoint_products.json',
    'typescript_file': 'fitpoint_products.ts',
    'csv_file': 'fitpoint_products.csv',
    'max_description_length': 200,
    'max_tags': 6
}

# Create output directory if it doesn't exist
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR) 