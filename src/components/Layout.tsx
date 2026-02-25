import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartPanel from './CartPanel';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartPanel />
    </div>
  );
};

export default Layout;
