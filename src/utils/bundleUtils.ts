import { Product } from '../data/mockProducts';

export interface BundleSuggestion {
  products: Product[];
  discount: number;
  savings: number;
  bundleName: string;
}

// Bundle rules based on product requirements
const bundleRules: Record<string, { tags: string[]; discount: number; name: string }> = {
  proteinComplete: {
    tags: ['creatine', 'shaker'],
    discount: 5,
    name: 'Complete Protein Bundle'
  },
  bcaaRecovery: {
    tags: ['glutamine', 'protein'],
    discount: 5,
    name: 'Recovery Bundle'
  },
  weightLossStack: {
    tags: ['l-carnitine', 'green-tea', 'shaker'],
    discount: 7,
    name: 'Weight Loss Stack'
  },
  beginnerKit: {
    tags: ['shaker', 'protein'],
    discount: 10,
    name: 'Beginner Starter Kit'
  }
};

export const getBundleSuggestions = (
  product: Product,
  allProducts: Product[]
): BundleSuggestion | null => {
  // Check if product has protein tag for the main bundle rule
  if (product.tags.includes('protein') || product.tags.includes('whey')) {
    const bundleRule = bundleRules.proteinComplete;
    const complementaryProducts = findComplementaryProducts(
      product,
      allProducts,
      bundleRule.tags
    );
    
    if (complementaryProducts.length > 0) {
      const bundleProducts = [product, ...complementaryProducts];
      const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
      const discountAmount = totalPrice * (bundleRule.discount / 100);
      
      return {
        products: bundleProducts,
        discount: bundleRule.discount,
        savings: discountAmount,
        bundleName: bundleRule.name
      };
    }
  }
  
  // Check for BCAA bundle
  if (product.tags.includes('bcaa')) {
    const bundleRule = bundleRules.bcaaRecovery;
    const complementaryProducts = findComplementaryProducts(
      product,
      allProducts,
      bundleRule.tags
    );
    
    if (complementaryProducts.length > 0) {
      const bundleProducts = [product, ...complementaryProducts.slice(0, 2)];
      const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
      const discountAmount = totalPrice * (bundleRule.discount / 100);
      
      return {
        products: bundleProducts,
        discount: bundleRule.discount,
        savings: discountAmount,
        bundleName: bundleRule.name
      };
    }
  }
  
  // Check for fat burner bundle
  if (product.tags.includes('fat-burner')) {
    const bundleRule = bundleRules.weightLossStack;
    const complementaryProducts = findComplementaryProducts(
      product,
      allProducts,
      bundleRule.tags
    );
    
    if (complementaryProducts.length >= 2) {
      const bundleProducts = [product, ...complementaryProducts.slice(0, 2)];
      const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
      const discountAmount = totalPrice * (bundleRule.discount / 100);
      
      return {
        products: bundleProducts,
        discount: bundleRule.discount,
        savings: discountAmount,
        bundleName: bundleRule.name
      };
    }
  }
  
  return null;
};

export const getUpsellSuggestions = (
  cartItems: Product[],
  allProducts: Product[]
): Product[] => {
  const cartCategories = new Set(cartItems.map(item => item.category));
  const cartTags = new Set(cartItems.flatMap(item => item.tags));
  const cartIds = new Set(cartItems.map(item => item.id));
  
  // Find complementary products not already in cart
  const suggestions = allProducts.filter(product => {
    if (cartIds.has(product.id)) return false;
    
    // Suggest gear if buying supplements
    if (!cartCategories.has('gear') && product.category === 'gear') {
      return true;
    }
    
    // Suggest creatine if buying protein
    if (cartTags.has('protein') && product.tags.includes('creatine')) {
      return true;
    }
    
    // Suggest protein if buying pre-workout
    if (cartTags.has('pre-workout') && product.tags.includes('protein')) {
      return true;
    }
    
    // Suggest recovery products if buying BCAA
    if (cartTags.has('bcaa') && 
        (product.tags.includes('glutamine') || product.tags.includes('casein'))) {
      return true;
    }
    
    return false;
  });
  
  // Sort by personal fit score and return top 2
  return suggestions
    .sort((a, b) => (b.personalFitScore || 0) - (a.personalFitScore || 0))
    .slice(0, 2);
};

const findComplementaryProducts = (
  mainProduct: Product,
  allProducts: Product[],
  requiredTags: string[]
): Product[] => {
  const complementary: Product[] = [];
  
  for (const tag of requiredTags) {
    const product = allProducts.find(p => 
      p.id !== mainProduct.id && 
      p.tags.includes(tag) &&
      !complementary.some(cp => cp.id === p.id)
    );
    
    if (product) {
      complementary.push(product);
    }
  }
  
  return complementary;
};

export const calculateBundlePrice = (bundle: BundleSuggestion): number => {
  const totalPrice = bundle.products.reduce((sum, product) => sum + product.price, 0);
  return totalPrice - bundle.savings;
}; 