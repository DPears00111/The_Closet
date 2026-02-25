import { Link } from 'react-router-dom';
import { formatZAR } from '@/lib/currency';
import { type Product } from '@/data/products';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden bg-card rounded-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-body text-sm font-medium tracking-wide">{product.name}</h3>
          <p className="text-xs text-muted-foreground">{product.category}</p>
          <p className="font-heading text-base font-semibold">{formatZAR(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
