import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { analyzeGlucose, type GlucoseReading } from '../types/glucose';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface GlucoseInputProps {
  onAddReading: (reading: GlucoseReading) => void;
}

export function GlucoseInput({ onAddReading }: GlucoseInputProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue) && numValue > 0) {
      const reading: GlucoseReading = {
        id: Date.now().toString(),
        value: numValue,
        timestamp: new Date(),
        status: analyzeGlucose(numValue),
      };
      onAddReading(reading);
      setValue('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" size="lg">
          <Plus className="h-5 w-5" />
          {t('addReading')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('addReading')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="glucose-value">
              {t('bloodSugar')} ({t('mgdl')})
            </Label>
            <Input
              id="glucose-value"
              type="number"
              step="0.1"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="120"
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {t('submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
