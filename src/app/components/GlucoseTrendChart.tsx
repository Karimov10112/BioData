import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { type GlucoseReading } from '../types/glucose';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface GlucoseTrendChartProps {
  readings: GlucoseReading[];
}

export function GlucoseTrendChart({ readings }: GlucoseTrendChartProps) {
  const { t } = useLanguage();

  // Get last 7 days of data
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentReadings = readings
    .filter(r => new Date(r.timestamp) >= sevenDaysAgo)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const chartData = recentReadings.map(reading => ({
    time: new Date(reading.timestamp).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    value: reading.value,
    status: reading.status,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const statusColors = {
        low: 'text-blue-600 dark:text-blue-400',
        normal: 'text-green-600 dark:text-green-400',
        high: 'text-red-600 dark:text-red-400',
      };
      
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{data.time}</p>
          <p className="text-lg font-semibold">
            {data.value} <span className="text-sm text-muted-foreground">{t('mgdl')}</span>
          </p>
          <p className={`text-sm font-medium ${statusColors[data.status as keyof typeof statusColors]}`}>
            {t(data.status)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {t('glucoseTrend')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">{t('noData')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {t('glucoseTrend')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="time" 
              className="text-xs"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={{ value: t('mgdl'), angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4, fill: 'hsl(var(--primary))' }}
              activeDot={{ r: 6 }}
            />
            {/* Reference lines for normal range */}
            <Line
              type="monotone"
              dataKey={() => 70}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey={() => 140}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>{t('normal')} (70-140)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>{t('low')} (&lt;70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>{t('high')} (&gt;140)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
