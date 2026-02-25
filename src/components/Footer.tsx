import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-background/80">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl font-bold text-background tracking-wider mb-4">
              THE CLOSET
            </h3>
            <p className="text-sm leading-relaxed text-background/60">
              Premium luxury menswear crafted for the modern South African. 
              Elevating everyday style since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-background/40 mb-4">
              Shop
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm hover:text-primary transition-colors">All Products</Link>
              <Link to="/shop?category=Jackets" className="text-sm hover:text-primary transition-colors">Jackets</Link>
              <Link to="/shop?category=Shirts" className="text-sm hover:text-primary transition-colors">Shirts</Link>
              <Link to="/shop?category=Pants" className="text-sm hover:text-primary transition-colors">Pants</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-background/40 mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/shipping-policy" className="text-sm hover:text-primary transition-colors">Shipping Policy</Link>
              <Link to="/terms-and-conditions" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link to="/shipping-policy" className="text-sm hover:text-primary transition-colors">Returns</Link>
              <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          {/* Newsletter / Info */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-background/40 mb-4">
              Info
            </h4>
            <p className="text-sm text-background/60 mb-2">All prices include 15% VAT</p>
            <p className="text-sm text-background/60">Free shipping on orders over R1,000</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} The Closet. All rights reserved. Prices include 15% VAT.
          </p>
          <p className="text-xs text-background/40">
            Proudly South African 🇿🇦
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
