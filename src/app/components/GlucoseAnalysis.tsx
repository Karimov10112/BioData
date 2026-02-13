import { Activity, TrendingDown, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { type GlucoseReading } from '../types/glucose';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface GlucoseAnalysisProps {
  readings: GlucoseReading[];
}

export function GlucoseAnalysis({ readings }: GlucoseAnalysisProps) {
  const { t } = useLanguage();

  const latestReading = readings[0];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayReadings = readings.filter(r => {
    const readingDate = new Date(r.timestamp);
    readingDate.setHours(0, 0, 0, 0);
    return readingDate.getTime() === today.getTime();
  });

  const averageToday = todayReadings.length > 0
    ? todayReadings.reduce((sum, r) => sum + r.value, 0) / todayReadings.length
    : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'text-blue-600 dark:text-blue-400';
      case 'high':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-green-600 dark:text-green-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'low':
        return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800';
      case 'high':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
      default:
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low':
        return <TrendingDown className="h-6 w-6" />;
      case 'high':
        return <TrendingUp className="h-6 w-6" />;
      default:
        return <Activity className="h-6 w-6" />;
    }
  };

  if (!latestReading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('currentStatus')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t('noData')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={getStatusBg(latestReading.status)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(latestReading.status)}
          {t('currentStatus')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{t('latestReading')}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold">{latestReading.value}</span>
            <span className="text-muted-foreground">{t('mgdl')}</span>
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(latestReading.status)}`}>
              {t(latestReading.status)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(latestReading.timestamp).toLocaleString()}
          </p>
        </div>

        {averageToday !== null && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-1">{t('averageToday')}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{averageToday.toFixed(1)}</span>
              <span className="text-muted-foreground">{t('mgdl')}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
