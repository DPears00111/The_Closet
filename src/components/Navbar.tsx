import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, X, Menu } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-navbar border-b border-primary/30 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="font-heading text-2xl font-bold tracking-wider text-foreground">
          THE CLOSET
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-body text-sm font-medium tracking-widest uppercase text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Link to="/shop" className="text-foreground/80 hover:text-primary transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <button
            onClick={toggleCart}
            className="relative text-foreground/80 hover:text-primary transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground/80"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-body text-sm font-medium tracking-widest uppercase text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
