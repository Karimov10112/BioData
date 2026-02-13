import { useState, useEffect } from 'react';
import { Activity, Moon, Sun, Languages } from 'lucide-react';
import { motion } from 'motion/react';
import { BiodataLanguageProvider, useBiodataLanguage, type Language } from './contexts/BiodataLanguageContext';
import { type JournalEntry, productsDatabase } from './types/biodata';
import { DailyJournalTab } from './components/biodata/DailyJournalTab';
import { ProductsTab } from './components/biodata/ProductsTab';
import { StatisticsTab } from './components/biodata/StatisticsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

function AppContent() {
  const { t, language, setLanguage } = useBiodataLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('biodata-theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [activeTab, setActiveTab] = useState('journal');
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('biodata-entries');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((e: any) => ({
        ...e,
        timestamp: new Date(e.timestamp),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('biodata-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('biodata-entries', JSON.stringify(entries));
  }, [entries]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddEntry = (entry: JournalEntry) => {
    setEntries(prev => [entry, ...prev]);
  };

  const latestEntry = entries[0];
  const userSugarLevel = latestEntry
    ? (latestEntry.fastingSugar + latestEntry.postMealSugar) / 2
    : undefined;

  const languages = [
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'ru', label: 'Русский', flag: '🇷🇺' },
    { value: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-gradient-to-br from-[#3b82f6] to-[#22c55e] rounded-xl">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#22c55e] bg-clip-text text-transparent">
                  {t('appTitle')}
                </h1>
                <p className="text-xs text-muted-foreground">{t('appSubtitle')}</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              {/* Language Selector */}
              <div className="hidden sm:flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          {lang.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-12">
              <TabsTrigger value="journal" className="text-base">
                📝 {t('dailyJournal')}
              </TabsTrigger>
              <TabsTrigger value="products" className="text-base">
                🍎 {t('products')}
              </TabsTrigger>
              <TabsTrigger value="statistics" className="text-base">
                📊 {t('statistics')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="journal" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <DailyJournalTab
                  onAddEntry={handleAddEntry}
                  latestEntry={latestEntry}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ProductsTab
                  products={productsDatabase}
                  userSugarLevel={userSugarLevel}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <StatisticsTab entries={entries} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-card/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 BioData Pro • {t('appSubtitle')}</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BiodataLanguageProvider>
      <AppContent />
    </BiodataLanguageProvider>
  );
}
