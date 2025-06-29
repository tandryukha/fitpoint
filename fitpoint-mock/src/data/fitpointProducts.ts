export interface Product {
  id: string;
  nameEt: string;
  nameEn: string;
  descriptionEt: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: 'protein' | 'bcaa' | 'fat-burner' | 'gear';
  tags: string[];
  nutritionalInfo?: {
    protein?: number;
    carbs?: number;
    fat?: number;
    calories?: number;
    servings?: number;
  };
  rating: number;
  personalFitScore?: number;
}

export const fitpointProducts: Product[] = [
  {
    id: 'fp1',
    nameEt: 'Optimum Nutrition Gold Standard 100% vadakuvalk',
    nameEn: 'Optimum Nutrition Gold Standard 100% Whey Protein',
    descriptionEt: 'Premium kvaliteediga vadakuvalgupulber lihasmassi kasvatamiseks ja taastumiseks',
    descriptionEn: 'Premium quality whey protein powder for muscle growth and recovery',
    price: 49.99,
    image: 'https://fitpoint.ee/images/optimum-nutrition-gold-standard-100-whey-protein.jpg',
    category: 'protein',
    tags: ["protein", "whey", "muscle-growth", "recovery"],
    nutritionalInfo: {"protein": 24, "carbs": 3, "fat": 1, "calories": 120, "servings": 30},
    rating: 4.5,
    personalFitScore: 84
  },
  {
    id: 'fp2',
    nameEt: 'Dymatize ISO100 vadakuvalgu isolaat',
    nameEn: 'Dymatize ISO100 Whey Protein Isolate',
    descriptionEt: 'Kiiresti imenduv vadakuvalgu isolaat 90% valgusisaldusega',
    descriptionEn: 'Fast-digesting whey protein isolate with 90% protein content',
    price: 54.99,
    image: 'https://fitpoint.ee/images/dymatize-iso100-whey-protein-isolate.jpg',
    category: 'protein',
    tags: ["protein", "whey", "isolate", "fast-digesting"],
    nutritionalInfo: {"protein": 25, "carbs": 1, "fat": 0, "calories": 110, "servings": 28},
    rating: 4.3,
    personalFitScore: 93
  },
  {
    id: 'fp3',
    nameEt: 'Scitec Nutrition 100% taimne valgupulber vegan',
    nameEn: 'Scitec Nutrition 100% Plant Protein Vegan',
    descriptionEt: '100% taimse päritoluga valgupulber veganlastele sobiv',
    descriptionEn: '100% plant-based protein powder suitable for vegans',
    price: 39.99,
    image: 'https://fitpoint.ee/images/scitec-nutrition-100-plant-protein-vegan.jpg',
    category: 'protein',
    tags: ["protein", "vegan", "plant-based", "lactose-free"],
    nutritionalInfo: {"protein": 20, "carbs": 4, "fat": 2, "calories": 115, "servings": 25},
    rating: 4.4,
    personalFitScore: 82
  },
  {
    id: 'fp4',
    nameEt: 'BioTech USA Hyper Mass 5000 massilisaja',
    nameEn: 'BioTech USA Hyper Mass 5000',
    descriptionEt: 'Kõrge kalorsusega massilisaja valkude ja süsivesikutega',
    descriptionEn: 'High-calorie mass gainer with protein and carbohydrates',
    price: 64.99,
    image: 'https://fitpoint.ee/images/biotech-usa-hyper-mass-5000.jpg',
    category: 'protein',
    tags: ["protein", "mass-gainer", "weight-gain", "high-calorie"],
    nutritionalInfo: {"protein": 45, "carbs": 200, "fat": 8, "calories": 1100, "servings": 12},
    rating: 4.4,
    personalFitScore: 90
  },
  {
    id: 'fp5',
    nameEt: 'Scitec Nutrition BCAA Xpress aminohapped',
    nameEn: 'Scitec Nutrition BCAA Xpress',
    descriptionEt: 'Essentiaalsed aminohapped optimaalses 2:1:1 vahekorras lihaste taastumiseks',
    descriptionEn: 'Essential amino acids in optimal 2:1:1 ratio for muscle recovery',
    price: 24.99,
    image: 'https://fitpoint.ee/images/scitec-nutrition-bcaa-xpress.jpg',
    category: 'bcaa',
    tags: ["bcaa", "amino-acids", "recovery", "intra-workout"],
    nutritionalInfo: {"calories": 12, "servings": 40},
    rating: 4.8,
    personalFitScore: 93
  },
  {
    id: 'fp6',
    nameEt: 'Optimum Nutrition Essential Amino Energy energiaga',
    nameEn: 'Optimum Nutrition Essential Amino Energy',
    descriptionEt: 'Aminohapped loomuliku kofeiiniga energia ja taastumise jaoks',
    descriptionEn: 'Amino acids with natural caffeine for energy and recovery',
    price: 29.99,
    image: 'https://fitpoint.ee/images/optimum-nutrition-essential-amino-energy.jpg',
    category: 'bcaa',
    tags: ["bcaa", "amino-acids", "energy", "caffeine"],
    nutritionalInfo: {"calories": 15, "servings": 30},
    rating: 4.3,
    personalFitScore: 95
  },
  {
    id: 'fp7',
    nameEt: 'BioTech USA L-Glutamiin',
    nameEn: 'BioTech USA L-Glutamine',
    descriptionEt: 'Puhas L-glutamiin lihaste taastumiseks ja immuunsüsteemi toetuseks',
    descriptionEn: 'Pure L-glutamine for muscle recovery and immune support',
    price: 19.99,
    image: 'https://fitpoint.ee/images/biotech-usa-l-glutamine.jpg',
    category: 'bcaa',
    tags: ["glutamine", "amino-acids", "recovery", "immune"],
    nutritionalInfo: {"calories": 0, "servings": 60},
    rating: 4.8,
    personalFitScore: 82
  },
  {
    id: 'fp8',
    nameEt: 'Nutrex Lipo-6 Black Ultra Concentrate rasvapõletaja',
    nameEn: 'Nutrex Lipo-6 Black Ultra Concentrate',
    descriptionEt: 'Võimas termogeenne rasvapõletaja kaalulanguse jaoks',
    descriptionEn: 'Powerful thermogenic fat burner for weight loss',
    price: 44.99,
    image: 'https://fitpoint.ee/images/nutrex-lipo-6-black-ultra-concentrate.jpg',
    category: 'fat-burner',
    tags: ["fat-burner", "weight-loss", "thermogenic", "energy"],
    nutritionalInfo: {"calories": 5, "servings": 60},
    rating: 4.3,
    personalFitScore: 80
  },
  {
    id: 'fp9',
    nameEt: 'Dymatize L-Karnitiin Xtreme',
    nameEn: 'Dymatize L-Carnitine Xtreme',
    descriptionEt: 'Premium L-karnitiin rasva metabolismiks ja energia jaoks',
    descriptionEn: 'Premium L-carnitine for fat metabolism and energy',
    price: 29.99,
    image: 'https://fitpoint.ee/images/dymatize-l-carnitine-xtreme.jpg',
    category: 'fat-burner',
    tags: ["l-carnitine", "fat-burner", "weight-loss", "metabolism"],
    nutritionalInfo: {"calories": 15, "servings": 16},
    rating: 4.4,
    personalFitScore: 81
  },
  {
    id: 'fp10',
    nameEt: 'BioTech USA Thermo Drine Complex rasvapõletuskompleks',
    nameEn: 'BioTech USA Thermo Drine Complex',
    descriptionEt: 'Mitme koostisosaga termogeenne kompleks võimendatud rasvapõletuseks',
    descriptionEn: 'Multi-ingredient thermogenic complex for enhanced fat burning',
    price: 34.99,
    image: 'https://fitpoint.ee/images/biotech-usa-thermo-drine-complex.jpg',
    category: 'fat-burner',
    tags: ["fat-burner", "thermogenic", "weight-loss", "complex"],
    nutritionalInfo: {"calories": 8, "servings": 60},
    rating: 4.2,
    personalFitScore: 83
  },
  {
    id: 'fp11',
    nameEt: 'BioTech USA Wave+ šeiker 600ml',
    nameEn: 'BioTech USA Wave+ Shaker 600ml',
    descriptionEt: 'Premium proteiinišeiker segamiskuuliga ja mõõteskaalaga',
    descriptionEn: 'Premium protein shaker with mixing ball and measurement scale',
    price: 12.99,
    image: 'https://fitpoint.ee/images/biotech-usa-wave-shaker-600ml.jpg',
    category: 'gear',
    tags: ["shaker", "gear", "accessories", "bottle"],
    nutritionalInfo: undefined,
    rating: 4.1,
    personalFitScore: 90
  },
  {
    id: 'fp12',
    nameEt: 'Better Bodies jõusaali kindad Pro',
    nameEn: 'Better Bodies Gym Gloves Pro',
    descriptionEt: 'Professionaalsed jõusaali kindad parema haarde ja käte kaitse jaoks',
    descriptionEn: 'Professional gym gloves for better grip and hand protection',
    price: 24.99,
    image: 'https://fitpoint.ee/images/better-bodies-gym-gloves-pro.jpg',
    category: 'gear',
    tags: ["gloves", "gear", "training", "protection"],
    nutritionalInfo: undefined,
    rating: 4.7,
    personalFitScore: 90
  },
  {
    id: 'fp13',
    nameEt: 'Harbinger Pro tõstevöö',
    nameEn: 'Harbinger Pro Lifting Belt',
    descriptionEt: 'Professionaalne jõutõstevöö tuuma toetuseks ja ohutuseks',
    descriptionEn: 'Professional weightlifting belt for core support and safety',
    price: 49.99,
    image: 'https://fitpoint.ee/images/harbinger-pro-lifting-belt.jpg',
    category: 'gear',
    tags: ["belt", "gear", "powerlifting", "safety"],
    nutritionalInfo: undefined,
    rating: 4.3,
    personalFitScore: 96
  },
  {
    id: 'fp14',
    nameEt: 'Blender Bottle SportMixer 820ml šeiker',
    nameEn: 'Blender Bottle SportMixer 820ml',
    descriptionEt: 'Suure mahutavusega šeikerpudel BlenderBall metallist vahustajaga',
    descriptionEn: 'Large capacity shaker bottle with BlenderBall wire whisk',
    price: 15.99,
    image: 'https://fitpoint.ee/images/blender-bottle-sportmixer-820ml.jpg',
    category: 'gear',
    tags: ["shaker", "bottle", "gear", "large-capacity"],
    nutritionalInfo: undefined,
    rating: 4.8,
    personalFitScore: 86
  }
];
