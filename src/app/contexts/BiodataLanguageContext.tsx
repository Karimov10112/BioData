import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appTitle: 'BioData Pro',
    appSubtitle: 'Diabetes Management Platform',
    
    // Tabs
    dailyJournal: 'Daily Journal',
    products: 'Products',
    statistics: 'Statistics',
    
    // Daily Journal
    fastingSugar: 'Fasting Blood Sugar',
    postMealSugar: 'Post-Meal Blood Sugar',
    date: 'Date',
    notes: 'Notes',
    addEntry: 'Add Entry',
    save: 'Save',
    cancel: 'Cancel',
    mgdl: 'mg/dL',
    enterNotes: 'Enter your notes here...',
    
    // Advice
    advice: 'Advice',
    high: 'High',
    normal: 'Normal',
    low: 'Low',
    highAdvice: 'Your blood sugar is high. Avoid sugary foods and consult your doctor.',
    normalAdvice: 'Your blood sugar is normal. Keep maintaining a healthy diet!',
    lowAdvice: 'Your blood sugar is low. Consume fast-acting carbs immediately.',
    
    // Products
    searchProducts: 'Search products...',
    allStatuses: 'All Statuses',
    allCategories: 'All Categories',
    safe: 'Safe',
    caution: 'Caution',
    avoid: 'Avoid',
    yashil: 'Yashil',
    sariq: 'Sariq',
    qizil: 'Qizil',
    
    // Categories
    fruits: 'Fruits',
    vegetables: 'Vegetables',
    grains: 'Grains',
    dairy: 'Dairy',
    protein: 'Protein',
    snacks: 'Snacks',
    
    // Product Details
    gi: 'GI',
    gl: 'GL',
    riseRange: 'Rise Range',
    nutritionalInfo: 'Nutritional Information',
    calories: 'Calories',
    carbs: 'Carbs',
    sugar: 'Sugar',
    fiber: 'Fiber',
    protein: 'Protein',
    fat: 'Fat',
    macroDistribution: 'Macro Distribution',
    carbDistribution: 'Carb Distribution',
    productAdvice: 'Advice',
    perServing: 'per 100g',
    kcal: 'kcal',
    grams: 'g',
    
    // Statistics
    recentStats: 'Recent Statistics',
    fastingAvg: 'Fasting Average',
    postMealAvg: 'Post-Meal Average',
    difference: 'Difference',
    last14Days: 'Last 14 Days Trend',
    allRecords: 'All Records',
    fasting: 'Fasting',
    postMeal: 'Post-Meal',
    noRecords: 'No records yet',
    
    // Common
    close: 'Close',
    search: 'Search',
    filter: 'Filter',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
  },
  ru: {
    appTitle: 'BioData Pro',
    appSubtitle: 'Платформа управления диабетом',
    
    // Tabs
    dailyJournal: 'Ежедневный журнал',
    products: 'Продукты',
    statistics: 'Статистика',
    
    // Daily Journal
    fastingSugar: 'Сахар натощак',
    postMealSugar: 'Сахар после еды',
    date: 'Дата',
    notes: 'Заметки',
    addEntry: 'Добавить запись',
    save: 'Сохранить',
    cancel: 'Отмена',
    mgdl: 'мг/дл',
    enterNotes: 'Введите свои заметки здесь...',
    
    // Advice
    advice: 'Совет',
    high: 'Высокий',
    normal: 'Нормальный',
    low: 'Низкий',
    highAdvice: 'Ваш уровень сахара высокий. Избегайте сладких продуктов и проконсультируйтесь с врачом.',
    normalAdvice: 'Ваш уровень сахара нормальный. Продолжайте придерживаться здорового питания!',
    lowAdvice: 'Ваш уровень сахара низкий. Немедленно употребите быстрые углеводы.',
    
    // Products
    searchProducts: 'Поиск продуктов...',
    allStatuses: 'Все статусы',
    allCategories: 'Все категории',
    safe: 'Безопасно',
    caution: 'Осторожно',
    avoid: 'Избегать',
    yashil: 'Зеленый',
    sariq: 'Желтый',
    qizil: 'Красный',
    
    // Categories
    fruits: 'Фрукты',
    vegetables: 'Овощи',
    grains: 'Злаки',
    dairy: 'Молочное',
    protein: 'Белок',
    snacks: 'Закуски',
    
    // Product Details
    gi: 'ГИ',
    gl: 'ГН',
    riseRange: 'Диапазон роста',
    nutritionalInfo: 'Пищевая ценность',
    calories: 'Калории',
    carbs: 'Углеводы',
    sugar: 'Сахар',
    fiber: 'Клетчатка',
    protein: 'Белок',
    fat: 'Жиры',
    macroDistribution: 'Распределение макронутриентов',
    carbDistribution: 'Распределение углеводов',
    productAdvice: 'Совет',
    perServing: 'на 100г',
    kcal: 'ккал',
    grams: 'г',
    
    // Statistics
    recentStats: 'Последняя статистика',
    fastingAvg: 'Средний натощак',
    postMealAvg: 'Средний после еды',
    difference: 'Разница',
    last14Days: 'Тренд за 14 дней',
    allRecords: 'Все записи',
    fasting: 'Натощак',
    postMeal: 'После еды',
    noRecords: 'Пока нет записей',
    
    // Common
    close: 'Закрыть',
    search: 'Поиск',
    filter: 'Фильтр',
    darkMode: 'Темный режим',
    lightMode: 'Светлый режим',
  },
  uz: {
    appTitle: 'BioData Pro',
    appSubtitle: 'Diabet boshqaruvi platformasi',
    
    // Tabs
    dailyJournal: 'Kundalik jurnal',
    products: 'Mahsulotlar',
    statistics: 'Statistika',
    
    // Daily Journal
    fastingSugar: 'Och qorinda qon shakari',
    postMealSugar: 'Ovqatdan keyin qon shakari',
    date: 'Sana',
    notes: 'Izohlar',
    addEntry: "Qo'shish",
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    mgdl: 'mg/dl',
    enterNotes: 'Izohlaringizni kiriting...',
    
    // Advice
    advice: 'Tavsiya',
    high: 'Yuqori',
    normal: 'Normal',
    low: 'Past',
    highAdvice: "Qon shakaringiz yuqori. Shakarli ovqatlardan qoching va shifokoringiz bilan maslahatlashing.",
    normalAdvice: 'Qon shakaringiz normal. Sog\'lom ovqatlanishda davom eting!',
    lowAdvice: 'Qon shakaringiz past. Darhol tez uglevodlar iste\'mol qiling.',
    
    // Products
    searchProducts: 'Mahsulotlarni qidirish...',
    allStatuses: 'Barcha holatlar',
    allCategories: 'Barcha toifalar',
    safe: 'Xavfsiz',
    caution: 'Ehtiyotkorlik',
    avoid: 'Oldini olish',
    yashil: 'Yashil',
    sariq: 'Sariq',
    qizil: 'Qizil',
    
    // Categories
    fruits: 'Mevalar',
    vegetables: 'Sabzavotlar',
    grains: 'Donli mahsulotlar',
    dairy: 'Sut mahsulotlari',
    protein: 'Oqsil',
    snacks: 'Gazaklar',
    
    // Product Details
    gi: 'GI',
    gl: 'GL',
    riseRange: "O'sish diapazoni",
    nutritionalInfo: "Ozuqaviy qiymat",
    calories: 'Kaloriya',
    carbs: 'Uglevodlar',
    sugar: 'Shakar',
    fiber: 'Tolalar',
    protein: 'Oqsil',
    fat: "Yog'lar",
    macroDistribution: 'Makronutrientlar taqsimoti',
    carbDistribution: 'Uglevodlar taqsimoti',
    productAdvice: 'Tavsiya',
    perServing: '100g uchun',
    kcal: 'kkal',
    grams: 'g',
    
    // Statistics
    recentStats: "So'nggi statistika",
    fastingAvg: "Och qorinda o'rtacha",
    postMealAvg: "Ovqatdan keyin o'rtacha",
    difference: 'Farq',
    last14Days: '14 kunlik tendensiya',
    allRecords: 'Barcha yozuvlar',
    fasting: 'Och qorinda',
    postMeal: 'Ovqatdan keyin',
    noRecords: 'Hali yozuvlar yo\'q',
    
    // Common
    close: 'Yopish',
    search: 'Qidirish',
    filter: 'Filtr',
    darkMode: "Qorong'i rejim",
    lightMode: 'Yorug\' rejim',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function BiodataLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('biodata-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('biodata-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useBiodataLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useBiodataLanguage must be used within BiodataLanguageProvider');
  }
  return context;
}
