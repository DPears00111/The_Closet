import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import { products, colorHex, type ProductColor } from '@/data/products';
import { formatZAR } from '@/lib/currency';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/shop" className="text-primary hover:underline mt-2 inline-block">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const canAdd = selectedSize !== null && selectedColor !== null;

  const handleAddToCart = () => {
    if (!canAdd) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize!,
      color: selectedColor!,
      image: product.image,
    });
    toast({
      title: 'Added to bag',
      description: `${product.name} — ${selectedSize} / ${selectedColor}`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{product.category}</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="font-heading text-2xl font-semibold text-primary mb-6">{formatZAR(product.price)}</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Size {selectedSize && <span className="text-foreground ml-1">— {selectedSize}</span>}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm border rounded-sm transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-foreground/70 hover:border-foreground/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-8">
              <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Color {selectedColor && <span className="text-foreground ml-1">— {selectedColor}</span>}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative h-9 w-9 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-primary scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: colorHex[color] }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <Check size={14} strokeWidth={2} className="absolute inset-0 m-auto text-background" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!canAdd}
              className={`w-full py-3.5 font-body text-sm font-semibold tracking-wider uppercase transition-all ${
                canAdd
                  ? 'bg-primary text-primary-foreground hover:bg-gold-dark cursor-pointer'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {canAdd ? 'Add to Bag' : 'Select Size & Color'}
            </button>

            <p className="text-xs text-muted-foreground mt-3 text-center">All prices include 15% VAT</p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
