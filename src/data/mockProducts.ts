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

export const mockProducts: Product[] = [
  // Proteins
  {
    id: 'p1',
    nameEt: 'Optimum Nutrition Gold Standard 100% vadak',
    nameEn: 'Optimum Nutrition Gold Standard 100% Whey',
    descriptionEt: 'Premium kvaliteediga vadakuvalgupulber lihasmassi kasvatamiseks',
    descriptionEn: 'Premium quality whey protein powder for muscle growth',
    price: 54.99,
    image: '/images/on-whey.jpg',
    category: 'protein',
    tags: ['protein', 'whey', 'muscle-growth', 'post-workout'],
    nutritionalInfo: {
      protein: 24,
      carbs: 3,
      fat: 1,
      calories: 120,
      servings: 30
    },
    rating: 4.8,
    personalFitScore: 95
  },
  {
    id: 'p2',
    nameEt: 'Scitec Nutrition 100% Whey Protein Professional',
    nameEn: 'Scitec Nutrition 100% Whey Protein Professional',
    descriptionEt: 'Professionaalne vadakuvalgupulber sportlastele',
    descriptionEn: 'Professional whey protein powder for athletes',
    price: 49.99,
    image: '/images/scitec-whey.jpg',
    category: 'protein',
    tags: ['protein', 'whey', 'muscle-growth', 'professional'],
    nutritionalInfo: {
      protein: 22,
      carbs: 4,
      fat: 2,
      calories: 117,
      servings: 30
    },
    rating: 4.6,
    personalFitScore: 88
  },
  {
    id: 'p3',
    nameEt: 'Vegan Protein taimevalgu pulber',
    nameEn: 'Vegan Protein Plant-Based Powder',
    descriptionEt: '100% taimse päritoluga valgupulber',
    descriptionEn: '100% plant-based protein powder',
    price: 39.99,
    image: '/images/vegan-protein.jpg',
    category: 'protein',
    tags: ['protein', 'vegan', 'plant-based', 'lactose-free'],
    nutritionalInfo: {
      protein: 20,
      carbs: 5,
      fat: 2,
      calories: 110,
      servings: 25
    },
    rating: 4.4,
    personalFitScore: 82
  },
  {
    id: 'p4',
    nameEt: 'Casein Pro aeglase imendumisega valk',
    nameEn: 'Casein Pro Slow-Release Protein',
    descriptionEt: 'Aeglase imendumisega kaseiinvalk öiseks taastumiseks',
    descriptionEn: 'Slow-release casein protein for overnight recovery',
    price: 44.99,
    image: '/images/casein-pro.jpg',
    category: 'protein',
    tags: ['protein', 'casein', 'slow-release', 'night-recovery'],
    nutritionalInfo: {
      protein: 25,
      carbs: 3,
      fat: 1,
      calories: 110,
      servings: 28
    },
    rating: 4.5,
    personalFitScore: 85
  },
  
  // BCAAs
  {
    id: 'b1',
    nameEt: 'BCAA Energy aminohapped energiaga',
    nameEn: 'BCAA Energy Amino Acids with Energy',
    descriptionEt: 'BCAA aminohapped koos energiat andvate koostisosadega',
    descriptionEn: 'BCAA amino acids with energy-boosting ingredients',
    price: 29.99,
    image: '/images/bcaa-energy.jpg',
    category: 'bcaa',
    tags: ['bcaa', 'amino-acids', 'energy', 'intra-workout'],
    nutritionalInfo: {
      calories: 30,
      servings: 30
    },
    rating: 4.7,
    personalFitScore: 90
  },
  {
    id: 'b2',
    nameEt: 'BCAA 2:1:1 puhas aminohappepulber',
    nameEn: 'BCAA 2:1:1 Pure Amino Acid Powder',
    descriptionEt: 'Puhas BCAA pulber optimaalses 2:1:1 vahekorras',
    descriptionEn: 'Pure BCAA powder in optimal 2:1:1 ratio',
    price: 24.99,
    image: '/images/bcaa-pure.jpg',
    category: 'bcaa',
    tags: ['bcaa', 'amino-acids', 'recovery', 'pure'],
    nutritionalInfo: {
      calories: 0,
      servings: 40
    },
    rating: 4.5,
    personalFitScore: 87
  },
  {
    id: 'b3',
    nameEt: 'BCAA + Glutamiin taastumiskompleks',
    nameEn: 'BCAA + Glutamine Recovery Complex',
    descriptionEt: 'BCAA ja glutamiini kombinatsioon parema taastumise jaoks',
    descriptionEn: 'BCAA and glutamine combination for better recovery',
    price: 34.99,
    image: '/images/bcaa-glutamine.jpg',
    category: 'bcaa',
    tags: ['bcaa', 'glutamine', 'recovery', 'post-workout'],
    nutritionalInfo: {
      calories: 15,
      servings: 30
    },
    rating: 4.6,
    personalFitScore: 88
  },
  
  // Fat Burners
  {
    id: 'f1',
    nameEt: 'Thermo Burn rasva põletaja',
    nameEn: 'Thermo Burn Fat Burner',
    descriptionEt: 'Termogeenne rasvapõletaja kaalulanguseks',
    descriptionEn: 'Thermogenic fat burner for weight loss',
    price: 39.99,
    image: '/images/thermo-burn.jpg',
    category: 'fat-burner',
    tags: ['fat-burner', 'weight-loss', 'thermogenic', 'low-carb'],
    nutritionalInfo: {
      calories: 5,
      servings: 60
    },
    rating: 4.3,
    personalFitScore: 80
  },
  {
    id: 'f2',
    nameEt: 'L-Karnitiin 3000 vedel rasvapõletaja',
    nameEn: 'L-Carnitine 3000 Liquid Fat Burner',
    descriptionEt: 'Vedel L-karnitiin tõhusaks rasvapõletuseks',
    descriptionEn: 'Liquid L-carnitine for effective fat burning',
    price: 29.99,
    image: '/images/l-carnitine.jpg',
    category: 'fat-burner',
    tags: ['fat-burner', 'l-carnitine', 'weight-loss', 'liquid'],
    nutritionalInfo: {
      calories: 15,
      servings: 20
    },
    rating: 4.4,
    personalFitScore: 83
  },
  {
    id: 'f3',
    nameEt: 'CLA konjugeeritud linoolhape',
    nameEn: 'CLA Conjugated Linoleic Acid',
    descriptionEt: 'CLA kapslid keharasva vähendamiseks',
    descriptionEn: 'CLA capsules for body fat reduction',
    price: 24.99,
    image: '/images/cla.jpg',
    category: 'fat-burner',
    tags: ['fat-burner', 'cla', 'weight-loss', 'low-carb'],
    nutritionalInfo: {
      calories: 10,
      servings: 90
    },
    rating: 4.2,
    personalFitScore: 78
  },
  {
    id: 'f4',
    nameEt: 'Green Tea Extract rohelise tee ekstrakt',
    nameEn: 'Green Tea Extract',
    descriptionEt: 'Looduslik rohelise tee ekstrakt ainevahetuse kiirendamiseks',
    descriptionEn: 'Natural green tea extract for metabolism boost',
    price: 19.99,
    image: '/images/green-tea.jpg',
    category: 'fat-burner',
    tags: ['fat-burner', 'natural', 'green-tea', 'weight-loss', 'low-carb'],
    nutritionalInfo: {
      calories: 0,
      servings: 60
    },
    rating: 4.1,
    personalFitScore: 75
  },
  
  // Gear
  {
    id: 'g1',
    nameEt: 'Premium šeiker 700ml',
    nameEn: 'Premium Shaker 700ml',
    descriptionEt: 'Kvaliteetne šeiker segamiskuuliga',
    descriptionEn: 'Quality shaker with mixing ball',
    price: 12.99,
    image: '/images/shaker.jpg',
    category: 'gear',
    tags: ['gear', 'shaker', 'accessories'],
    rating: 4.7,
    personalFitScore: 92
  },
  {
    id: 'g2',
    nameEt: 'Jõusaali kindad Pro',
    nameEn: 'Gym Gloves Pro',
    descriptionEt: 'Professionaalsed jõusaali kindad parema haarde jaoks',
    descriptionEn: 'Professional gym gloves for better grip',
    price: 19.99,
    image: '/images/gym-gloves.jpg',
    category: 'gear',
    tags: ['gear', 'gloves', 'accessories', 'training'],
    rating: 4.5,
    personalFitScore: 86
  },
  {
    id: 'g3',
    nameEt: 'Treeningvöö Elite',
    nameEn: 'Training Belt Elite',
    descriptionEt: 'Tugevdatud treeningvöö raskete tõstete jaoks',
    descriptionEn: 'Reinforced training belt for heavy lifts',
    price: 39.99,
    image: '/images/training-belt.jpg',
    category: 'gear',
    tags: ['gear', 'belt', 'powerlifting', 'safety'],
    rating: 4.8,
    personalFitScore: 94
  },
  {
    id: 'g4',
    nameEt: 'Resistance Band komplekt',
    nameEn: 'Resistance Band Set',
    descriptionEt: 'Mitmekülgne vastupanupael treeninguteks',
    descriptionEn: 'Versatile resistance band set for workouts',
    price: 24.99,
    image: '/images/resistance-bands.jpg',
    category: 'gear',
    tags: ['gear', 'bands', 'home-workout', 'versatile'],
    rating: 4.4,
    personalFitScore: 82
  },
  
  // Additional products for variety
  {
    id: 'p5',
    nameEt: 'Kreatiin monohüdraat pulber',
    nameEn: 'Creatine Monohydrate Powder',
    descriptionEt: 'Puhas kreatiin monohüdraat jõu ja mahu kasvatamiseks',
    descriptionEn: 'Pure creatine monohydrate for strength and mass gains',
    price: 19.99,
    image: '/images/creatine.jpg',
    category: 'protein',
    tags: ['creatine', 'strength', 'muscle-growth', 'pure'],
    nutritionalInfo: {
      servings: 100
    },
    rating: 4.7,
    personalFitScore: 91
  },
  {
    id: 'p6',
    nameEt: 'Mass Gainer kaalu tõstja',
    nameEn: 'Mass Gainer Weight Builder',
    descriptionEt: 'Kõrge kalorsusega pulber kaalu tõstmiseks',
    descriptionEn: 'High-calorie powder for weight gain',
    price: 59.99,
    image: '/images/mass-gainer.jpg',
    category: 'protein',
    tags: ['protein', 'mass-gainer', 'weight-gain', 'high-calorie'],
    nutritionalInfo: {
      protein: 50,
      carbs: 250,
      fat: 5,
      calories: 1250,
      servings: 8
    },
    rating: 4.3,
    personalFitScore: 79
  },
  {
    id: 'b4',
    nameEt: 'EAA Essential Amino täiskompleks',
    nameEn: 'EAA Essential Amino Complete',
    descriptionEt: 'Kõik essentiaalsed aminohapped ühes tootes',
    descriptionEn: 'All essential amino acids in one product',
    price: 32.99,
    image: '/images/eaa.jpg',
    category: 'bcaa',
    tags: ['eaa', 'amino-acids', 'complete', 'recovery'],
    nutritionalInfo: {
      calories: 20,
      servings: 30
    },
    rating: 4.6,
    personalFitScore: 87
  },
  {
    id: 'f5',
    nameEt: 'Night Burn öine rasvapõletaja',
    nameEn: 'Night Burn Nighttime Fat Burner',
    descriptionEt: 'Stimulandivaba rasvapõletaja öiseks kasutamiseks',
    descriptionEn: 'Stimulant-free fat burner for nighttime use',
    price: 34.99,
    image: '/images/night-burn.jpg',
    category: 'fat-burner',
    tags: ['fat-burner', 'night', 'stimulant-free', 'weight-loss'],
    nutritionalInfo: {
      calories: 0,
      servings: 30
    },
    rating: 4.2,
    personalFitScore: 76
  },
  {
    id: 'p7',
    nameEt: 'Pre-Workout Extreme eeltreeningukompleks',
    nameEn: 'Pre-Workout Extreme',
    descriptionEt: 'Võimas eeltreeningukompleks maksimaalse energia jaoks',
    descriptionEn: 'Powerful pre-workout complex for maximum energy',
    price: 36.99,
    image: '/images/pre-workout.jpg',
    category: 'protein',
    tags: ['pre-workout', 'energy', 'focus', 'performance'],
    nutritionalInfo: {
      calories: 25,
      servings: 30
    },
    rating: 4.5,
    personalFitScore: 86
  }
]; 