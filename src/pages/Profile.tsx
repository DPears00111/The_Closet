import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-20 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold mb-6">My Account</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sign in to manage your profile, view orders, and enjoy a seamless checkout experience.
          </p>

          {/* Auth placeholder - will be wired up with Supabase */}
          <div className="bg-card p-8 rounded-sm text-center">
            <p className="text-muted-foreground mb-4">Authentication coming soon. Stay tuned.</p>
            <Link to="/shop" className="text-primary hover:underline text-sm font-medium">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Profile;
