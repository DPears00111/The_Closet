import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const ShippingPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl font-bold mb-8">Shipping Policy</h1>
          <div className="space-y-6 font-body text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Delivery Times</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Metro areas (Johannesburg, Cape Town, Durban, Pretoria): 3–5 business days</li>
                <li>Outlying areas: 5–7 business days</li>
              </ul>
            </section>
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Shipping Costs</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Flat rate: R100 for all orders under R1,000</li>
                <li>Free shipping on orders over R1,000</li>
              </ul>
            </section>
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Returns</h2>
              <p>
                We offer a 30-day return policy. Items must be unworn, unwashed, and in original packaging with tags attached. 
                Return shipping is the responsibility of the customer unless the item is defective or incorrect.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Tracking</h2>
              <p>
                Once your order has been dispatched, you will receive a tracking number via email. 
                You can track your parcel through our courier partner's website.
              </p>
            </section>
            <p className="text-xs italic">All prices include 15% VAT.</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
