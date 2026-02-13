import { useBiodataLanguage } from '../../contexts/BiodataLanguageContext';
import { type Product, getProductStatus } from '../../types/biodata';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface ProductCardProps {
  product: Product;
  userSugarLevel?: number;
  onClick: () => void;
}

export function ProductCard({ product, userSugarLevel, onClick }: ProductCardProps) {
  const { t, language } = useBiodataLanguage();
  
  const productName = language === 'ru' ? product.nameRu : language === 'uz' ? product.nameUz : product.name;
  const dynamicStatus = userSugarLevel ? getProductStatus(product.gi, userSugarLevel) : product.status;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-[#22c55e] hover:bg-[#22c55e]/90 text-white';
      case 'caution':
        return 'bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white';
      case 'avoid':
        return 'bg-[#ef4444] hover:bg-[#ef4444]/90 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-500/90 text-white';
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'safe':
        return 'border-[#22c55e]';
      case 'caution':
        return 'border-[#f59e0b]';
      case 'avoid':
        return 'border-[#ef4444]';
      default:
        return 'border-gray-500';
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

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${getStatusBorder(dynamicStatus)}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="text-5xl">{product.emoji}</div>
          <Badge className={getStatusColor(dynamicStatus)}>
            {getStatusLabel(dynamicStatus)}
          </Badge>
        </div>

        <h3 className="font-bold text-lg mb-1">{productName}</h3>
        <p className="text-sm text-muted-foreground mb-3">{t(product.category)}</p>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-primary/10">
            <p className="text-xs text-muted-foreground">{t('gi')}</p>
            <p className="font-bold text-primary">{product.gi}</p>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <p className="text-xs text-muted-foreground">{t('gl')}</p>
            <p className="font-bold text-primary">{product.gl}</p>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <p className="text-xs text-muted-foreground truncate">Rise</p>
            <p className="font-bold text-primary text-xs">{product.riseRange.split(' ')[0]}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
