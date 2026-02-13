import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBiodataLanguage } from '../../contexts/BiodataLanguageContext';
import { type Product, type ProductStatus, type ProductCategory, getProductStatus } from '../../types/biodata';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ProductsTabProps {
  products: Product[];
  userSugarLevel?: number;
}

export function ProductsTab({ products, userSugarLevel }: ProductsTabProps) {
  const { t, language } = useBiodataLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const productName = language === 'ru' ? product.nameRu : language === 'uz' ? product.nameUz : product.name;
      if (searchQuery && !productName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Status filter (dynamic based on user sugar)
      const dynamicStatus = userSugarLevel ? getProductStatus(product.gi, userSugarLevel) : product.status;
      if (statusFilter !== 'all' && dynamicStatus !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && product.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, statusFilter, categoryFilter, userSugarLevel, language]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchProducts')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProductStatus | 'all')}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allStatuses')}</SelectItem>
            <SelectItem value="safe">🟢 {t('safe')}</SelectItem>
            <SelectItem value="caution">🟡 {t('caution')}</SelectItem>
            <SelectItem value="avoid">🔴 {t('avoid')}</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as ProductCategory | 'all')}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allCategories')}</SelectItem>
            <SelectItem value="fruits">{t('fruits')}</SelectItem>
            <SelectItem value="vegetables">{t('vegetables')}</SelectItem>
            <SelectItem value="grains">{t('grains')}</SelectItem>
            <SelectItem value="dairy">{t('dairy')}</SelectItem>
            <SelectItem value="protein">{t('protein')}</SelectItem>
            <SelectItem value="snacks">{t('snacks')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard
                product={product}
                userSugarLevel={userSugarLevel}
                onClick={() => setSelectedProduct(product)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>{t('noRecords')}</p>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        userSugarLevel={userSugarLevel}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
