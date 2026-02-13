import { Apple, Info, Salad, Sparkles, Utensils } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { type GlucoseReading } from '../types/glucose';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FoodRecommendationsProps {
  readings: GlucoseReading[];
}

interface FoodItem {
  name: string;
  image: string;
  translationKey: string;
}

const foodImages = {
  leafyGreens: 'https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFmeSUyMGdyZWVuJTIwdmVnZXRhYmxlcyUyMHNhbGFkfGVufDF8fHx8MTc3MDk3MzcyOXww&ixlib=rb-4.1.0&q=80&w=1080',
  wholeGrains: 'https://images.unsplash.com/photo-1767542562849-fb66d57f8da3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMGdyYWluJTIwYnJlYWQlMjBoZWFsdGh5fGVufDF8fHx8MTc3MDk3MzcyOXww&ixlib=rb-4.1.0&q=80&w=1080',
  leanProtein: 'https://images.unsplash.com/photo-1656389863341-1dfd38ee6edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFuJTIwcHJvdGVpbiUyMGNoaWNrZW4lMjBmaXNofGVufDF8fHx8MTc3MDk3MzczMHww&ixlib=rb-4.1.0&q=80&w=1080',
  nuts: 'https://images.unsplash.com/photo-1759167632424-22ff6e74cc8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMG51dHMlMjBzZWVkcyUyMGhlYWx0aHl8ZW58MXx8fHwxNzcwOTczNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  berries: 'https://images.unsplash.com/photo-1696504831684-1e8352620998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJlcnJpZXMlMjBzdHJhd2JlcnJpZXMlMjBibHVlYmVycmllc3xlbnwxfHx8fDE3NzA5NzM3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  avocado: 'https://images.unsplash.com/photo-1593967858219-d89b6b76b28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwaGVhbHRoeSUyMGZhdHxlbnwxfHx8fDE3NzA5NzM3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  fish: 'https://images.unsplash.com/photo-1739785938237-73b3654200d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBmaXNoJTIwb21lZ2EzfGVufDF8fHx8MTc3MDk3MzczMXww&ixlib=rb-4.1.0&q=80&w=1080',
  beans: 'https://images.unsplash.com/photo-1763368403529-0b8d9108cf9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFucyUyMGxlZ3VtZXMlMjBjaGlja3BlYXN8ZW58MXx8fHwxNzcwOTczNzMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  fastCarbs: 'https://images.unsplash.com/photo-1641659735894-45046caad624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBqdWljZSUyMGdsYXNzfGVufDF8fHx8MTc3MDg5ODU5MXww&ixlib=rb-4.1.0&q=80&w=1080',
  fruits: 'https://images.unsplash.com/photo-1734771573616-7cb630b439bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGFwcGxlJTIwYmFuYW5hfGVufDF8fHx8MTc3MDk3MzczM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  crackers: 'https://images.unsplash.com/photo-1601415808605-5e148a8b7780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFja2VycyUyMHBlYW51dCUyMGJ1dHRlciUyMHNuYWNrfGVufDF8fHx8MTc3MDk3MzczM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  milk: 'https://images.unsplash.com/photo-1719528809952-d613e546b18b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIweW9ndXJ0JTIwZGFpcnl8ZW58MXx8fHwxNzcwOTczNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function FoodRecommendations({ readings }: FoodRecommendationsProps) {
  const { t } = useLanguage();
  
  const latestReading = readings[0];

  if (!latestReading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            {t('foodRecommendations')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t('noData')}</p>
        </CardContent>
      </Card>
    );
  }

  const getFoodRecommendations = (status: string) => {
    switch (status) {
      case 'high':
        return {
          advice: t('highSugarAdvice'),
          foods: [
            { translationKey: 'leafyGreens', image: foodImages.leafyGreens },
            { translationKey: 'wholeGrains', image: foodImages.wholeGrains },
            { translationKey: 'leanProtein', image: foodImages.leanProtein },
            { translationKey: 'nuts', image: foodImages.nuts },
            { translationKey: 'avocado', image: foodImages.avocado },
            { translationKey: 'fish', image: foodImages.fish },
          ],
          tip: t('tipHigh'),
          icon: <Salad className="h-6 w-6 text-red-600 dark:text-red-400" />,
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-50 dark:bg-red-950/30',
          borderColor: 'border-red-200 dark:border-red-800',
        };
      case 'low':
        return {
          advice: t('lowSugarAdvice'),
          foods: [
            { translationKey: 'fastCarbs', image: foodImages.fastCarbs },
            { translationKey: 'fruits', image: foodImages.fruits },
            { translationKey: 'crackers', image: foodImages.crackers },
            { translationKey: 'milk', image: foodImages.milk },
          ],
          tip: t('tipLow'),
          icon: <Apple className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-950/30',
          borderColor: 'border-blue-200 dark:border-blue-800',
        };
      default:
        return {
          advice: t('normalSugarAdvice'),
          foods: [
            { translationKey: 'wholeGrains', image: foodImages.wholeGrains },
            { translationKey: 'berries', image: foodImages.berries },
            { translationKey: 'beans', image: foodImages.beans },
            { translationKey: 'nuts', image: foodImages.nuts },
            { translationKey: 'fish', image: foodImages.fish },
            { translationKey: 'leafyGreens', image: foodImages.leafyGreens },
          ],
          tip: t('tipNormal'),
          icon: <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />,
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-950/30',
          borderColor: 'border-green-200 dark:border-green-800',
        };
    }
  };

  const recommendation = getFoodRecommendations(latestReading.status);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {recommendation.icon}
          {t('foodRecommendations')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Advice Banner */}
        <div className={`p-4 rounded-lg border ${recommendation.bgColor} ${recommendation.borderColor}`}>
          <p className={`font-medium ${recommendation.color}`}>
            {recommendation.advice}
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-2 gap-3">
          {recommendation.foods.map((food, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={food.image}
                  alt={t(food.translationKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Food Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
                <p className="text-white text-sm font-medium leading-tight">
                  {t(food.translationKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Health Tip */}
        <div className="pt-4 border-t flex gap-3">
          <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground italic">
            {recommendation.tip}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
