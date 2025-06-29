import { Product } from '../data/mockProducts';
import { Language } from '../data/translations';

export interface SearchResult {
  products: Product[];
  query: string;
  suggestions?: string[];
  clarification?: {
    question: string;
    options: string[];
  };
}

// Keywords for quick tag mapping
const quickTagMappings: Record<string, string[]> = {
  protein: ['protein', 'whey', 'casein', 'vegan-protein', 'mass-gainer'],
  bcaa: ['bcaa', 'amino-acids', 'eaa'],
  loseWeight: ['fat-burner', 'weight-loss', 'thermogenic', 'low-carb', 'l-carnitine'],
  gear: ['gear', 'shaker', 'gloves', 'belt', 'bands']
};

// Autocomplete suggestions based on partial input
const autocompleteSuggestions: Record<string, string[]> = {
  'prot': ['protein', 'protein powder', 'protein whey', 'protein vegan'],
  'veg': ['vegan protein', 'vegan supplements'],
  'bcaa': ['bcaa powder', 'bcaa energy', 'bcaa + glutamine'],
  'fat': ['fat burner', 'fat loss'],
  'crea': ['creatine', 'creatine monohydrate'],
  'shak': ['shaker', 'shaker bottle'],
  'pre': ['pre-workout', 'pre-workout extreme']
};

export const searchProducts = (
  query: string,
  products: Product[],
  language: Language
): SearchResult => {
  const lowerQuery = query.toLowerCase().trim();
  
  // Check if query needs clarification
  const clarification = getClarification(lowerQuery, language);
  
  // Get autocomplete suggestions
  const suggestions = getAutocompleteSuggestions(lowerQuery);
  
  // Filter products based on query
  let filteredProducts = products.filter(product => {
    const nameMatch = language === 'et' 
      ? product.nameEt.toLowerCase().includes(lowerQuery)
      : product.nameEn.toLowerCase().includes(lowerQuery);
    
    const descriptionMatch = language === 'et'
      ? product.descriptionEt.toLowerCase().includes(lowerQuery)
      : product.descriptionEn.toLowerCase().includes(lowerQuery);
    
    const tagMatch = product.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const categoryMatch = product.category.toLowerCase().includes(lowerQuery);
    
    return nameMatch || descriptionMatch || tagMatch || categoryMatch;
  });
  
  // If no direct matches, try fuzzy matching
  if (filteredProducts.length === 0) {
    filteredProducts = fuzzySearch(query, products, language);
  }
  
  // Rank products by relevance and personal fit score
  const rankedProducts = rankProducts(filteredProducts, lowerQuery);
  
  return {
    products: rankedProducts,
    query,
    suggestions,
    clarification
  };
};

export const searchByQuickTag = (
  tag: keyof typeof quickTagMappings,
  products: Product[]
): Product[] => {
  const keywords = quickTagMappings[tag] || [];
  
  const filteredProducts = products.filter(product => {
    return keywords.some(keyword => 
      product.tags.includes(keyword) || 
      product.category === keyword
    );
  });
  
  return rankProducts(filteredProducts, tag);
};

const getClarification = (query: string, language: Language): SearchResult['clarification'] | undefined => {
  const ambiguousTerms: Record<string, { et: string[]; en: string[]; }> = {
    'supplement': {
      et: ['Valgupulbrid', 'Aminohapped', 'Rasvapõletajad'],
      en: ['Protein Powders', 'Amino Acids', 'Fat Burners']
    },
    'energy': {
      et: ['Eeltreeningud', 'BCAA energiaga', 'Kofeiiniga tooted'],
      en: ['Pre-workouts', 'BCAA with Energy', 'Caffeine Products']
    },
    'recovery': {
      et: ['Kaseiinvalgud', 'BCAA', 'Glutamiin'],
      en: ['Casein Proteins', 'BCAA', 'Glutamine']
    }
  };
  
  for (const [term, options] of Object.entries(ambiguousTerms)) {
    if (query.includes(term)) {
      return {
        question: language === 'et' 
          ? `Mida te täpsemalt otsite kategoorias "${term}"?`
          : `What specifically are you looking for in "${term}"?`,
        options: options[language]
      };
    }
  }
  
  return undefined;
};

const getAutocompleteSuggestions = (query: string): string[] => {
  if (query.length < 3) return [];
  
  for (const [prefix, suggestions] of Object.entries(autocompleteSuggestions)) {
    if (query.startsWith(prefix)) {
      return suggestions.slice(0, 5);
    }
  }
  
  return [];
};

const fuzzySearch = (query: string, products: Product[], language: Language): Product[] => {
  const queryWords = query.toLowerCase().split(' ');
  
  return products.filter(product => {
    const productText = language === 'et'
      ? `${product.nameEt} ${product.descriptionEt} ${product.tags.join(' ')}`.toLowerCase()
      : `${product.nameEn} ${product.descriptionEn} ${product.tags.join(' ')}`.toLowerCase();
    
    return queryWords.every(word => productText.includes(word));
  });
};

const rankProducts = (products: Product[], query: string): Product[] => {
  return products.sort((a, b) => {
    // Primary: Personal fit score
    const scoreA = a.personalFitScore || 0;
    const scoreB = b.personalFitScore || 0;
    
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    
    // Secondary: Rating
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    
    // Tertiary: Price (ascending)
    return a.price - b.price;
  });
};

// Price filter utilities
export const filterByPrice = (products: Product[], min: number, max: number): Product[] => {
  return products.filter(product => product.price >= min && product.price <= max);
};

// Tag filter utilities
export const filterByTags = (products: Product[], tags: string[]): Product[] => {
  if (tags.length === 0) return products;
  
  return products.filter(product => 
    tags.some(tag => product.tags.includes(tag))
  );
}; 