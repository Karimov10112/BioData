import { TrendingUp, Activity, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { useBiodataLanguage } from '../../contexts/BiodataLanguageContext';
import { type JournalEntry } from '../../types/biodata';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface StatisticsTabProps {
  entries: JournalEntry[];
}

export function StatisticsTab({ entries }: StatisticsTabProps) {
  const { t } = useBiodataLanguage();

  // Calculate stats
  const recentEntries = entries.slice(0, 10);
  const fastingAvg = recentEntries.length > 0
    ? recentEntries.reduce((sum, e) => sum + e.fastingSugar, 0) / recentEntries.length
    : 0;
  const postMealAvg = recentEntries.length > 0
    ? recentEntries.reduce((sum, e) => sum + e.postMealSugar, 0) / recentEntries.length
    : 0;
  const difference = postMealAvg - fastingAvg;

  // Chart data (last 14 days)
  const chartData = entries
    .slice(0, 14)
    .reverse()
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      fasting: entry.fastingSugar,
      postMeal: entry.postMealSugar,
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{payload[0].payload.date}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
              {t('fasting')}: <span className="font-bold">{payload[0].value} {t('mgdl')}</span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
              {t('postMeal')}: <span className="font-bold">{payload[1].value} {t('mgdl')}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-[#3b82f6]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#3b82f6]" />
                {t('fastingAvg')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#3b82f6]">
                {fastingAvg.toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t('mgdl')}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-[#22c55e]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#22c55e]" />
                {t('postMealAvg')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#22c55e]">
                {postMealAvg.toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t('mgdl')}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-[#f59e0b]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#f59e0b]" />
                {t('difference')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#f59e0b]">
                {difference > 0 ? '+' : ''}{difference.toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t('mgdl')}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('last14Days')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                    label={{ value: t('mgdl'), angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="fasting"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#3b82f6' }}
                    activeDot={{ r: 7 }}
                    name={t('fasting')}
                  />
                  <Line
                    type="monotone"
                    dataKey="postMeal"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#22c55e' }}
                    activeDot={{ r: 7 }}
                    name={t('postMeal')}
                  />
                  {/* Reference lines */}
                  <Line
                    type="monotone"
                    dataKey={() => 70}
                    stroke="#64748b"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey={() => 140}
                    stroke="#64748b"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Table */}
      {entries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('allRecords')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('fasting')}</TableHead>
                      <TableHead>{t('postMeal')}</TableHead>
                      <TableHead className="hidden md:table-cell">{t('notes')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">
                          {new Date(entry.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-[#3b82f6]">
                            {entry.fastingSugar} {t('mgdl')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-[#22c55e]">
                            {entry.postMealSugar} {t('mgdl')}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                          {entry.notes || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>{t('noRecords')}</p>
        </div>
      )}
    </div>
  );
}
