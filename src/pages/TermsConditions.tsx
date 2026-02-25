import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const TermsConditions = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl font-bold mb-8">Terms & Conditions</h1>
          <div className="space-y-6 font-body text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">1. General</h2>
              <p>
                By accessing and using The Closet website, you agree to be bound by these Terms and Conditions. 
                The Closet reserves the right to modify these terms at any time without prior notice.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">2. Products & Pricing</h2>
              <p>
                All prices are listed in South African Rand (ZAR) and include 15% VAT. While we make every effort to 
                ensure accuracy, we reserve the right to correct any pricing errors. Product images are for illustrative 
                purposes and may differ slightly from the actual product.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">3. Orders & Payment</h2>
              <p>
                By placing an order, you make an offer to purchase the selected products. We reserve the right to 
                accept or decline your order. Payment must be made in full at the time of purchase.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">4. Returns & Refunds</h2>
              <p>
                Items may be returned within 30 days of delivery. Items must be unworn, unwashed, and in original 
                condition with all tags attached. Refunds will be processed within 7–10 business days of receiving the returned item.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">5. Limitation of Liability</h2>
              <p>
                The Closet shall not be liable for any indirect, incidental, or consequential damages arising from 
                the use of our website or products. Our total liability is limited to the purchase price of the relevant product.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">6. Governing Law</h2>
              <p>
                These terms are governed by the laws of the Republic of South Africa. Any disputes shall be resolved 
                in the courts of the Republic of South Africa.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
