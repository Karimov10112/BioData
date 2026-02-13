import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appTitle: 'Diabetes Management',
    addReading: 'Add Reading',
    bloodSugar: 'Blood Sugar',
    high: 'High',
    low: 'Low',
    normal: 'Normal',
    mgdl: 'mg/dL',
    date: 'Date',
    time: 'Time',
    submit: 'Submit',
    cancel: 'Cancel',
    currentStatus: 'Current Status',
    latestReading: 'Latest Reading',
    averageToday: 'Today\'s Average',
    foodRecommendations: 'Food Recommendations',
    glucoseTrend: 'Glucose Trend (7 Days)',
    noData: 'No data available',
    reading: 'Reading',
    status: 'Status',
    recommendations: 'Recommendations',
    // Food recommendations
    highSugarAdvice: 'Your blood sugar is high. Consider these foods:',
    lowSugarAdvice: 'Your blood sugar is low. Consider these foods:',
    normalSugarAdvice: 'Your blood sugar is normal. Maintain with:',
    // Food items
    leafyGreens: 'Leafy green vegetables',
    wholeGrains: 'Whole grains',
    leanProtein: 'Lean protein',
    nuts: 'Nuts and seeds',
    berries: 'Berries',
    avocado: 'Avocado',
    fish: 'Fatty fish',
    beans: 'Beans and legumes',
    fastCarbs: 'Fast-acting carbs (juice, candy)',
    fruits: 'Fruits (banana, apple)',
    crackers: 'Crackers with peanut butter',
    milk: 'Milk or yogurt',
    // Tips
    tipHigh: 'Avoid sugary drinks and refined carbs. Stay hydrated with water.',
    tipLow: 'Eat small, frequent meals. Carry glucose tablets.',
    tipNormal: 'Continue balanced meals with fiber, protein, and healthy fats.',
  },
  ru: {
    appTitle: 'Управление диабетом',
    addReading: 'Добавить данные',
    bloodSugar: 'Уровень сахара',
    high: 'Высокий',
    low: 'Низкий',
    normal: 'Нормальный',
    mgdl: 'мг/дл',
    date: 'Дата',
    time: 'Время',
    submit: 'Отправить',
    cancel: 'Отмена',
    currentStatus: 'Текущий статус',
    latestReading: 'Последнее значение',
    averageToday: 'Средний за сегодня',
    foodRecommendations: 'Рекомендации по питанию',
    glucoseTrend: 'Тренд глюкозы (7 дней)',
    noData: 'Нет данных',
    reading: 'Значение',
    status: 'Статус',
    recommendations: 'Рекомендации',
    // Food recommendations
    highSugarAdvice: 'Ваш уровень сахара высокий. Рекомендуемые продукты:',
    lowSugarAdvice: 'Ваш уровень сахара низкий. Рекомендуемые продукты:',
    normalSugarAdvice: 'Ваш уровень сахара нормальный. Поддерживайте:',
    // Food items
    leafyGreens: 'Листовые зеленые овощи',
    wholeGrains: 'Цельнозерновые',
    leanProtein: 'Нежирный белок',
    nuts: 'Орехи и семена',
    berries: 'Ягоды',
    avocado: 'Авокадо',
    fish: 'Жирная рыба',
    beans: 'Бобовые',
    fastCarbs: 'Быстрые углеводы (сок, конфеты)',
    fruits: 'Фрукты (банан, яблоко)',
    crackers: 'Крекеры с арахисовым маслом',
    milk: 'Молоко или йогурт',
    // Tips
    tipHigh: 'Избегайте сладких напитков и рафинированных углеводов. Пейте воду.',
    tipLow: 'Ешьте часто небольшими порциями. Носите таблетки глюкозы.',
    tipNormal: 'Продолжайте сбалансированное питание с клетчаткой, белком и полезными жирами.',
  },
  uz: {
    appTitle: 'Diabet boshqaruvi',
    addReading: 'Koʻrsatkichni qoʻshish',
    bloodSugar: 'Qon shakari',
    high: 'Yuqori',
    low: 'Past',
    normal: 'Normalʼ',
    mgdl: 'mg/dl',
    date: 'Sana',
    time: 'Vaqt',
    submit: 'Yuborish',
    cancel: 'Bekor qilish',
    currentStatus: 'Joriy holat',
    latestReading: 'Oxirgi koʻrsatkich',
    averageToday: 'Bugungi oʻrtacha',
    foodRecommendations: 'Ovqatlanish boʻyicha tavsiyalar',
    glucoseTrend: 'Glyukoza tendensiyasi (7 kun)',
    noData: 'Maʼlumot yoʻq',
    reading: 'Koʻrsatkich',
    status: 'Holat',
    recommendations: 'Tavsiyalar',
    // Food recommendations
    highSugarAdvice: 'Qon shakaringiz yuqori. Tavsiya etilgan mahsulotlar:',
    lowSugarAdvice: 'Qon shakaringiz past. Tavsiya etilgan mahsulotlar:',
    normalSugarAdvice: 'Qon shakaringiz normal. Davom eting:',
    // Food items
    leafyGreens: 'Yashil bargli sabzavotlar',
    wholeGrains: 'Butun donli mahsulotlar',
    leanProtein: 'Yoqsiz oqsil',
    nuts: "Yong'oq va urug'lar",
    berries: 'Rezavorlar',
    avocado: 'Avokado',
    fish: "Yog'li baliq",
    beans: 'Loviya va dukkakli',
    fastCarbs: 'Tez uglevodlar (sharbat, konfet)',
    fruits: 'Mevalar (banan, olma)',
    crackers: "Yeryong'oq moyi bilan kreker",
    milk: 'Sut yoki yogurt',
    // Tips
    tipHigh: 'Shakarli ichimliklar va qayta ishlangan uglevodlardan saqlaning. Suv iching.',
    tipLow: 'Tez-tez kichik porsiyalarda ovqatlaning. Glyukoza tabletkalarini olib yuring.',
    tipNormal: "Tolali, oqsilli va foydali yog'li muvozanatli ovqatlanishda davom eting.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('diabetes-app-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('diabetes-app-language', language);
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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}