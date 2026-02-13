export interface JournalEntry {
  id: string;
  date: string;
  fastingSugar: number;
  postMealSugar: number;
  notes: string;
  timestamp: Date;
}

export type ProductStatus = 'safe' | 'caution' | 'avoid';
export type ProductCategory = 'fruits' | 'vegetables' | 'grains' | 'dairy' | 'protein' | 'snacks';

export interface Product {
  id: string;
  name: string;
  nameRu: string;
  nameUz: string;
  emoji: string;
  category: ProductCategory;
  status: ProductStatus;
  gi: number; // Glycemic Index
  gl: number; // Glycemic Load
  riseRange: string;
  nutrition: {
    calories: number;
    carbs: number;
    sugar: number;
    fiber: number;
    protein: number;
    fat: number;
  };
  advice: string;
  adviceRu: string;
  adviceUz: string;
}

export function getProductStatus(gi: number, userSugarLevel?: number): ProductStatus {
  // If user has high sugar, be more strict
  if (userSugarLevel && userSugarLevel > 140) {
    if (gi < 45) return 'safe';
    if (gi < 60) return 'caution';
    return 'avoid';
  }
  
  // If user has low sugar, allow more carbs
  if (userSugarLevel && userSugarLevel < 70) {
    if (gi < 55) return 'caution';
    return 'safe';
  }
  
  // Normal thresholds
  if (gi < 55) return 'safe';
  if (gi < 70) return 'caution';
  return 'avoid';
}

export const productsDatabase: Product[] = [
  {
    id: '1',
    name: 'Apple',
    nameRu: 'Яблоко',
    nameUz: 'Olma',
    emoji: '🍎',
    category: 'fruits',
    status: 'safe',
    gi: 36,
    gl: 6,
    riseRange: '5-10 mg/dL',
    nutrition: {
      calories: 52,
      carbs: 14,
      sugar: 10,
      fiber: 2.4,
      protein: 0.3,
      fat: 0.2,
    },
    advice: 'Great choice! Low GI, high fiber. Perfect for diabetes management.',
    adviceRu: 'Отличный выбор! Низкий ГИ, много клетчатки. Идеально для управления диабетом.',
    adviceUz: "Zo'r tanlov! Past GI, ko'p tolali. Diabetni boshqarish uchun ideal.",
  },
  {
    id: '2',
    name: 'Banana',
    nameRu: 'Банан',
    nameUz: 'Banan',
    emoji: '🍌',
    category: 'fruits',
    status: 'caution',
    gi: 51,
    gl: 13,
    riseRange: '15-25 mg/dL',
    nutrition: {
      calories: 89,
      carbs: 23,
      sugar: 12,
      fiber: 2.6,
      protein: 1.1,
      fat: 0.3,
    },
    advice: 'Moderate GI. Eat in small portions, preferably with protein or fat.',
    adviceRu: 'Средний ГИ. Ешьте небольшими порциями, желательно с белком или жиром.',
    adviceUz: "O'rtacha GI. Kichik porsiyalarda iste'mol qiling, oqsil yoki yog' bilan.",
  },
  {
    id: '3',
    name: 'White Bread',
    nameRu: 'Белый хлеб',
    nameUz: 'Oq non',
    emoji: '🍞',
    category: 'grains',
    status: 'avoid',
    gi: 75,
    gl: 10,
    riseRange: '30-40 mg/dL',
    nutrition: {
      calories: 265,
      carbs: 49,
      sugar: 5,
      fiber: 2.7,
      protein: 9,
      fat: 3.2,
    },
    advice: 'High GI! Choose whole grain bread instead.',
    adviceRu: 'Высокий ГИ! Выбирайте цельнозерновой хлеб вместо этого.',
    adviceUz: "Yuqori GI! Buning o'rniga butun donli nonni tanlang.",
  },
  {
    id: '4',
    name: 'Broccoli',
    nameRu: 'Брокколи',
    nameUz: 'Brokkoli',
    emoji: '🥦',
    category: 'vegetables',
    status: 'safe',
    gi: 10,
    gl: 1,
    riseRange: '0-5 mg/dL',
    nutrition: {
      calories: 34,
      carbs: 7,
      sugar: 1.7,
      fiber: 2.6,
      protein: 2.8,
      fat: 0.4,
    },
    advice: 'Excellent! Very low GI, high fiber and nutrients. Eat freely.',
    adviceRu: 'Отлично! Очень низкий ГИ, много клетчатки и питательных веществ. Ешьте свободно.',
    adviceUz: "A'lo! Juda past GI, ko'p tolali va ozuqaviy moddalar. Erkin iste'mol qiling.",
  },
  {
    id: '5',
    name: 'Chicken Breast',
    nameRu: 'Куриная грудка',
    nameUz: 'Tovuq ko\'kragi',
    emoji: '🍗',
    category: 'protein',
    status: 'safe',
    gi: 0,
    gl: 0,
    riseRange: '0 mg/dL',
    nutrition: {
      calories: 165,
      carbs: 0,
      sugar: 0,
      fiber: 0,
      protein: 31,
      fat: 3.6,
    },
    advice: 'Perfect protein source with no carbs. No blood sugar impact.',
    adviceRu: 'Идеальный источник белка без углеводов. Не влияет на уровень сахара в крови.',
    adviceUz: "Uglevodlarsiz ideal oqsil manbai. Qon shakariga ta'sir qilmaydi.",
  },
  {
    id: '6',
    name: 'Milk',
    nameRu: 'Молоко',
    nameUz: 'Sut',
    emoji: '🥛',
    category: 'dairy',
    status: 'safe',
    gi: 39,
    gl: 5,
    riseRange: '5-10 mg/dL',
    nutrition: {
      calories: 42,
      carbs: 5,
      sugar: 5,
      fiber: 0,
      protein: 3.4,
      fat: 1,
    },
    advice: 'Low GI dairy. Good source of protein and calcium.',
    adviceRu: 'Молочный продукт с низким ГИ. Хороший источник белка и кальция.',
    adviceUz: "Past GI sut mahsuloti. Oqsil va kaltsiy yaxshi manbai.",
  },
  {
    id: '7',
    name: 'Potato',
    nameRu: 'Картофель',
    nameUz: 'Kartoshka',
    emoji: '🥔',
    category: 'vegetables',
    status: 'avoid',
    gi: 78,
    gl: 17,
    riseRange: '35-45 mg/dL',
    nutrition: {
      calories: 77,
      carbs: 17,
      sugar: 0.8,
      fiber: 2.1,
      protein: 2,
      fat: 0.1,
    },
    advice: 'High GI! Limit portions or choose sweet potato instead.',
    adviceRu: 'Высокий ГИ! Ограничьте порции или выбирайте батат вместо этого.',
    adviceUz: "Yuqori GI! Porsiyalarni cheklang yoki shirin kartoshkani tanlang.",
  },
  {
    id: '8',
    name: 'Almonds',
    nameRu: 'Миндаль',
    nameUz: 'Bodom',
    emoji: '🌰',
    category: 'snacks',
    status: 'safe',
    gi: 0,
    gl: 0,
    riseRange: '0-2 mg/dL',
    nutrition: {
      calories: 579,
      carbs: 22,
      sugar: 4,
      fiber: 12.5,
      protein: 21,
      fat: 50,
    },
    advice: 'Excellent snack! Healthy fats and protein. Watch portion sizes due to calories.',
    adviceRu: 'Отличная закуска! Полезные жиры и белок. Следите за размером порций из-за калорий.',
    adviceUz: "Ajoyib gazak! Foydali yog'lar va oqsil. Kaloriya tufayli porsiya hajmiga e'tibor bering.",
  },
  {
    id: '9',
    name: 'Orange',
    nameRu: 'Апельсин',
    nameUz: 'Apelsin',
    emoji: '🍊',
    category: 'fruits',
    status: 'safe',
    gi: 43,
    gl: 5,
    riseRange: '8-12 mg/dL',
    nutrition: {
      calories: 47,
      carbs: 12,
      sugar: 9,
      fiber: 2.4,
      protein: 0.9,
      fat: 0.1,
    },
    advice: 'Good choice! Rich in vitamin C and fiber. Moderate GI.',
    adviceRu: 'Хороший выбор! Богат витамином С и клетчаткой. Средний ГИ.',
    adviceUz: "Yaxshi tanlov! S vitamini va tolalarga boy. O'rtacha GI.",
  },
  {
    id: '10',
    name: 'Rice',
    nameRu: 'Рис',
    nameUz: 'Guruch',
    emoji: '🍚',
    category: 'grains',
    status: 'avoid',
    gi: 73,
    gl: 29,
    riseRange: '30-50 mg/dL',
    nutrition: {
      calories: 130,
      carbs: 28,
      sugar: 0.1,
      fiber: 0.4,
      protein: 2.7,
      fat: 0.3,
    },
    advice: 'High GI! Choose brown rice or limit portions significantly.',
    adviceRu: 'Высокий ГИ! Выбирайте коричневый рис или значительно ограничьте порции.',
    adviceUz: "Yuqori GI! Jigarrang guruchni tanlang yoki porsiyalarni sezilarli cheklang.",
  },
  {
    id: '11',
    name: 'Carrot',
    nameRu: 'Морковь',
    nameUz: 'Sabzi',
    emoji: '🥕',
    category: 'vegetables',
    status: 'safe',
    gi: 39,
    gl: 2,
    riseRange: '3-8 mg/dL',
    nutrition: {
      calories: 41,
      carbs: 10,
      sugar: 4.7,
      fiber: 2.8,
      protein: 0.9,
      fat: 0.2,
    },
    advice: 'Low GI vegetable. Rich in beta-carotene and fiber.',
    adviceRu: 'Овощ с низким ГИ. Богат бета-каротином и клетчаткой.',
    adviceUz: "Past GI sabzavot. Beta-karotin va tolalarga boy.",
  },
  {
    id: '12',
    name: 'Greek Yogurt',
    nameRu: 'Греческий йогурт',
    nameUz: 'Grek yogurti',
    emoji: '🥣',
    category: 'dairy',
    status: 'safe',
    gi: 11,
    gl: 3,
    riseRange: '2-5 mg/dL',
    nutrition: {
      calories: 59,
      carbs: 3.6,
      sugar: 3.6,
      fiber: 0,
      protein: 10,
      fat: 0.4,
    },
    advice: 'Excellent! Very low GI, high protein. Great for diabetes.',
    adviceRu: 'Отлично! Очень низкий ГИ, высокое содержание белка. Отлично для диабета.',
    adviceUz: "A'lo! Juda past GI, yuqori oqsil. Diabet uchun ajoyib.",
  },
];
