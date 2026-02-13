import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBiodataLanguage } from '../../contexts/BiodataLanguageContext';
import { type Product, getProductStatus } from '../../types/biodata';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface ProductModalProps {
  product: Product | null;
  userSugarLevel?: number;
  onClose: () => void;
}

export function ProductModal({ product, userSugarLevel, onClose }: ProductModalProps) {
  const { t, language } = useBiodataLanguage();

  if (!product) return null;

  const productName = language === 'ru' ? product.nameRu : language === 'uz' ? product.nameUz : product.name;
  const productAdvice = language === 'ru' ? product.adviceRu : language === 'uz' ? product.adviceUz : product.advice;
  const dynamicStatus = userSugarLevel ? getProductStatus(product.gi, userSugarLevel) : product.status;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-[#22c55e] text-white';
      case 'caution':
        return 'bg-[#f59e0b] text-white';
      case 'avoid':
        return 'bg-[#ef4444] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    if (language === 'uz') {
      switch (status) {
        case 'safe': return t('yashil');
        case 'caution': return t('sariq');
        case 'avoid': return t('qizil');
      }
    }
    return t(status);
  };

  const totalMacros = product.nutrition.carbs + product.nutrition.protein + product.nutrition.fat;
  const carbsPercent = (product.nutrition.carbs / totalMacros) * 100;
  const proteinPercent = (product.nutrition.protein / totalMacros) * 100;
  const fatPercent = (product.nutrition.fat / totalMacros) * 100;

  const totalCarbs = product.nutrition.carbs;
  const sugarPercent = (product.nutrition.sugar / totalCarbs) * 100;
  const fiberPercent = (product.nutrition.fiber / totalCarbs) * 100;
  const otherCarbsPercent = 100 - sugarPercent - fiberPercent;

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-5xl">{product.emoji}</span>
            <div className="flex-1">
              <div>{productName}</div>
              <div className="text-sm text-muted-foreground font-normal mt-1">
                {t(product.category)}
              </div>
            </div>
            <Badge className={getStatusColor(dynamicStatus)}>
              {getStatusLabel(dynamicStatus)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* GI, GL, Rise Range */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t('gi')}</p>
              <p className="text-3xl font-bold text-primary">{product.gi}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t('gl')}</p>
              <p className="text-3xl font-bold text-primary">{product.gl}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t('riseRange')}</p>
              <p className="text-lg font-bold text-primary">{product.riseRange}</p>
            </div>
          </div>

          {/* Nutritional Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('nutritionalInfo')} ({t('perServing')})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">{t('calories')}</p>
                <p className="text-2xl font-bold">{product.nutrition.calories} <span className="text-sm">{t('kcal')}</span></p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">{t('carbs')}</p>
                <p className="text-2xl font-bold">{product.nutrition.carbs} <span className="text-sm">{t('grams')}</span></p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">{t('sugar')}</p>
                <p className="text-2xl font-bold">{product.nutrition.sugar} <span className="text-sm">{t('grams')}</span></p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">{t('fiber')}</p>
                <p className="text-2xl font-bold">{product.nutrition.fiber} <span className="text-sm">{t('grams')}</span></p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">{t('protein')}</p>
                <p className="text-2xl font-bold">{product.nutrition.protein} <span className="text-sm">{t('grams')}</span></p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">{t('fat')}</p>
                <p className="text-2xl font-bold">{product.nutrition.fat} <span className="text-sm">{t('grams')}</span></p>
              </div>
            </div>
          </div>

          {/* Macro Distribution */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('macroDistribution')}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('carbs')}</span>
                  <span className="font-semibold">{carbsPercent.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${carbsPercent}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full bg-[#f59e0b]"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('protein')}</span>
                  <span className="font-semibold">{proteinPercent.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${proteinPercent}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full bg-[#3b82f6]"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('fat')}</span>
                  <span className="font-semibold">{fatPercent.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fatPercent}%` }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-full bg-[#22c55e]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Carb Distribution */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('carbDistribution')}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('sugar')}</span>
                  <span className="font-semibold">{sugarPercent.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sugarPercent}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full bg-[#ef4444]"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('fiber')}</span>
                  <span className="font-semibold">{fiberPercent.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fiberPercent}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full bg-[#22c55e]"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Other Carbs</span>
                  <span className="font-semibold">{otherCarbsPercent.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${otherCarbsPercent}%` }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-full bg-[#64748b]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advice */}
          <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              💡 {t('productAdvice')}
            </h3>
            <p className="text-sm leading-relaxed">{productAdvice}</p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
