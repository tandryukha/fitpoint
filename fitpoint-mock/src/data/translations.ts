export type Language = 'et' | 'en';

export const translations = {
  et: {
    // Navigation
    home: 'Avaleht',
    products: 'Tooted',
    cart: 'Ostukorv',
    checkout: 'Kassa',
    
    // Smart Finder
    smartFinderPlaceholder: 'Kirjuta midagi... nt vegan valk alla €30',
    quickTags: {
      protein: 'Otsid valku',
      bcaa: 'BCAA',
      loseWeight: 'Kaalulangus',
      gear: 'Varustus'
    },
    
    // Product page
    resultsFor: 'Tulemused päringule:',
    compare: 'Võrdle',
    addToCart: 'Lisa korvi',
    select: 'Vali',
    close: 'Sulge',
    
    // Product details
    nutritionalInfo: 'Toitumisalane teave',
    protein: 'Valk',
    carbs: 'Süsivesikud',
    fat: 'Rasv',
    calories: 'Kalorid',
    servings: 'Portsjonid',
    perServing: 'portsjoni kohta',
    rating: 'Hinnang',
    personalFitScore: 'Isiklik sobivusskoor',
    
    // Bundle
    bundleSuggestion: 'Soovitatav komplekt',
    saveAmount: 'Säästa €{{amount}}',
    addBundle: 'Lisa komplekt',
    addSelected: 'Lisa valitud',
    
    // Cart
    shoppingCart: 'Ostukorv',
    emptyCart: 'Teie ostukorv on tühi',
    continueShopping: 'Jätka ostlemist',
    subtotal: 'Vahesumma',
    shipping: 'Transport',
    freeShipping: 'Tasuta',
    total: 'Kokku',
    freeShippingMessage: 'Kulutage veel €{{amount}} tasuta transpordi saamiseks!',
    freeShippingThreshold: 'Tasuta transport alates €69',
    
    // Checkout
    checkoutTitle: 'Vormista tellimus',
    contactInfo: 'Kontaktandmed',
    shippingAddress: 'Tarneaadress',
    paymentMethod: 'Maksemeetod',
    orderSummary: 'Tellimuse kokkuvõte',
    placeOrder: 'Esita tellimus (Demo)',
    
    // Form fields
    email: 'E-post',
    firstName: 'Eesnimi',
    lastName: 'Perekonnanimi',
    address: 'Aadress',
    city: 'Linn',
    postalCode: 'Postiindeks',
    phone: 'Telefon',
    
    // Confirmation
    orderConfirmed: 'Tellimus kinnitatud!',
    orderNumber: 'Tellimuse number:',
    restartDemo: 'Alusta demo uuesti',
    
    // Comparison
    comparisonTitle: 'Toodete võrdlus',
    compareUpTo: 'Võrdle kuni 3 toodet',
    
    // Messages
    welcomeBack: 'Tere tulemast tagasi, teie tavaline vadak on laos!',
    disclaimer: 'Ainult teavituslik. Ei ole meditsiiniline nõuanne.',
    
    // Categories
    categories: {
      protein: 'Valgud',
      bcaa: 'BCAA',
      'fat-burner': 'Rasvapõletajad',
      gear: 'Varustus'
    },
    
    // Filters
    filters: 'Filtrid',
    priceRange: 'Hinnavahemik',
    brand: 'Bränd',
    dietaryTags: 'Toitumismärgised',
    clearFilters: 'Puhasta filtrid'
  },
  
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    checkout: 'Checkout',
    
    // Smart Finder
    smartFinderPlaceholder: 'Type anything… e.g. vegan protein under €30',
    quickTags: {
      protein: 'Looking for Protein',
      bcaa: 'BCAA',
      loseWeight: 'Lose Weight',
      gear: 'Gear'
    },
    
    // Product page
    resultsFor: 'Results for:',
    compare: 'Compare',
    addToCart: 'Add to Cart',
    select: 'Select',
    close: 'Close',
    
    // Product details
    nutritionalInfo: 'Nutritional Information',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    calories: 'Calories',
    servings: 'Servings',
    perServing: 'per serving',
    rating: 'Rating',
    personalFitScore: 'Personal Fit Score',
    
    // Bundle
    bundleSuggestion: 'Bundle Suggestion',
    saveAmount: 'Save €{{amount}}',
    addBundle: 'Add Bundle',
    addSelected: 'Add Selected',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    emptyCart: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    freeShipping: 'Free',
    total: 'Total',
    freeShippingMessage: 'Spend €{{amount}} more for free shipping!',
    freeShippingThreshold: 'Free shipping on orders over €69',
    
    // Checkout
    checkoutTitle: 'Checkout',
    contactInfo: 'Contact Information',
    shippingAddress: 'Shipping Address',
    paymentMethod: 'Payment Method',
    orderSummary: 'Order Summary',
    placeOrder: 'Place Order (Demo)',
    
    // Form fields
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal Code',
    phone: 'Phone',
    
    // Confirmation
    orderConfirmed: 'Order Confirmed!',
    orderNumber: 'Order Number:',
    restartDemo: 'Restart Demo',
    
    // Comparison
    comparisonTitle: 'Product Comparison',
    compareUpTo: 'Compare up to 3 products',
    
    // Messages
    welcomeBack: 'Welcome back, your usual whey is in stock!',
    disclaimer: 'Informational only. Not medical advice.',
    
    // Categories
    categories: {
      protein: 'Proteins',
      bcaa: 'BCAA',
      'fat-burner': 'Fat Burners',
      gear: 'Gear'
    },
    
    // Filters
    filters: 'Filters',
    priceRange: 'Price Range',
    brand: 'Brand',
    dietaryTags: 'Dietary Tags',
    clearFilters: 'Clear Filters'
  }
};

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
};

export const formatTranslation = (lang: Language, key: string, params: Record<string, any>): string => {
  let translation = getTranslation(lang, key);
  
  Object.entries(params).forEach(([param, value]) => {
    translation = translation.replace(`{{${param}}}`, String(value));
  });
  
  return translation;
}; 