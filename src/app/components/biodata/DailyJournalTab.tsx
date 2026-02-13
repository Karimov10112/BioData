import { useState } from 'react';
import { Calendar, Save, AlertCircle, CheckCircle2, TrendingDown } from 'lucide-react';
import { useBiodataLanguage } from '../../contexts/BiodataLanguageContext';
import { type JournalEntry } from '../../types/biodata';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface DailyJournalTabProps {
  onAddEntry: (entry: JournalEntry) => void;
  latestEntry?: JournalEntry;
}

export function DailyJournalTab({ onAddEntry, latestEntry }: DailyJournalTabProps) {
  const { t } = useBiodataLanguage();
  const [fastingSugar, setFastingSugar] = useState('');
  const [postMealSugar, setPostMealSugar] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date,
      fastingSugar: parseFloat(fastingSugar),
      postMealSugar: parseFloat(postMealSugar),
      notes,
      timestamp: new Date(),
    };
    
    onAddEntry(entry);
    
    // Reset form
    setFastingSugar('');
    setPostMealSugar('');
    setNotes('');
  };

  const getAdvice = () => {
    if (!latestEntry) return null;
    
    const avg = (latestEntry.fastingSugar + latestEntry.postMealSugar) / 2;
    
    if (avg > 140) {
      return {
        type: 'high',
        icon: <AlertCircle className="h-6 w-6" />,
        color: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
        iconColor: 'text-red-600 dark:text-red-400',
        message: t('highAdvice'),
      };
    } else if (avg < 70) {
      return {
        type: 'low',
        icon: <TrendingDown className="h-6 w-6" />,
        color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400',
        iconColor: 'text-blue-600 dark:text-blue-400',
        message: t('lowAdvice'),
      };
    } else {
      return {
        type: 'normal',
        icon: <CheckCircle2 className="h-6 w-6" />,
        color: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
        iconColor: 'text-green-600 dark:text-green-400',
        message: t('normalAdvice'),
      };
    }
  };

  const advice = getAdvice();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {t('addEntry')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">{t('date')}</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fasting">
                {t('fastingSugar')} ({t('mgdl')})
              </Label>
              <Input
                id="fasting"
                type="number"
                step="0.1"
                min="0"
                value={fastingSugar}
                onChange={(e) => setFastingSugar(e.target.value)}
                placeholder="90"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postMeal">
                {t('postMealSugar')} ({t('mgdl')})
              </Label>
              <Input
                id="postMeal"
                type="number"
                step="0.1"
                min="0"
                value={postMealSugar}
                onChange={(e) => setPostMealSugar(e.target.value)}
                placeholder="120"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t('notes')}</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('enterNotes')}
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full gap-2">
              <Save className="h-4 w-4" />
              {t('save')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Advice Box */}
      {advice && (
        <Card className={`border-2 ${advice.color}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className={advice.iconColor}>{advice.icon}</span>
              {t('advice')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-bold mb-2">
                    {t(advice.type)}
                  </h4>
                  <p className="leading-relaxed">
                    {advice.message}
                  </p>
                </div>
              </div>
            </div>

            {latestEntry && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background/50">
                  <p className="text-sm text-muted-foreground mb-1">{t('fasting')}</p>
                  <p className="text-2xl font-bold">{latestEntry.fastingSugar}</p>
                  <p className="text-xs text-muted-foreground">{t('mgdl')}</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50">
                  <p className="text-sm text-muted-foreground mb-1">{t('postMeal')}</p>
                  <p className="text-2xl font-bold">{latestEntry.postMealSugar}</p>
                  <p className="text-xs text-muted-foreground">{t('mgdl')}</p>
                </div>
              </div>
            )}

            {latestEntry?.notes && (
              <div className="p-4 rounded-lg bg-background/50">
                <p className="text-sm font-medium mb-1">{t('notes')}</p>
                <p className="text-sm text-muted-foreground italic">{latestEntry.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
