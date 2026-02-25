import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero.jpg';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Layout from '@/components/Layout';

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] overflow-hidden">
        <img
          src={heroImage}
          alt="The Closet — Premium Fashion"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-lg"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-background/70 mb-4">
              New Collection — Autumn/Winter
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-background leading-[1.1] mb-6">
              Redefine
              <br />
              <span className="text-gold-gradient">Your Style</span>
            </h1>
            <p className="font-body text-sm text-background/70 leading-relaxed mb-8 max-w-sm">
              Premium menswear crafted for the modern South African. Sharp tailoring meets everyday luxury.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 font-body text-sm font-semibold tracking-wider uppercase transition-all hover:bg-gold-dark group"
            >
              Shop Now
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Curated</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Featured Pieces</h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors group"
          >
            View All
            <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-card">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Why The Closet</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Crafted with <span className="text-gold-gradient">Intention</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              Every piece in our collection is designed with meticulous attention to detail, using premium fabrics and sustainable practices. 
              We believe luxury should be accessible, responsible, and unmistakably sharp.
            </p>
            <div className="grid grid-cols-3 gap-8">
              {[
                { label: 'Premium Fabrics', desc: 'Sourced globally' },
                { label: 'Free Shipping', desc: 'Orders over R1,000' },
                { label: 'Easy Returns', desc: '30-day policy' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-heading text-base font-semibold mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
