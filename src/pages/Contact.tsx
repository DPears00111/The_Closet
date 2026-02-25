import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Get in Touch</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-10">Contact Us</h1>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, label: 'Email', value: 'hello@thecloset.co.za' },
              { icon: Phone, label: 'Phone', value: '+27 11 000 0000' },
              { icon: MapPin, label: 'Location', value: 'Johannesburg, South Africa' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon size={24} strokeWidth={1.5} className="mx-auto text-primary mb-3" />
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Name" className="border border-border px-4 py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors" />
              <input placeholder="Email" type="email" className="border border-border px-4 py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <input placeholder="Subject" className="w-full border border-border px-4 py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors" />
            <textarea placeholder="Message" rows={6} className="w-full border border-border px-4 py-3 text-sm bg-background rounded-sm focus:outline-none focus:border-primary transition-colors resize-none" />
            <button type="button" className="bg-primary text-primary-foreground px-8 py-3 font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold-dark transition-all">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Contact;
