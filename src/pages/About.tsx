import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Our Story
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
            About The Closet
          </h1>
          <div className="prose prose-neutral max-w-none space-y-4 sm:space-y-6 font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Born in South Africa, The Closet is a premium menswear label
              dedicated to the pursuit of effortless style. We believe that
              great clothing shouldn't just look good — it should feel like a
              second skin.
            </p>
            <p>
              Our collections are designed in Johannesburg and crafted from the
              finest fabrics sourced globally. Each piece is a testament to
              sharp tailoring, minimalist design, and the quiet confidence that
              comes from wearing something truly exceptional.
            </p>
            <p>
              We're not about fast fashion or fleeting trends. We're about
              building a wardrobe of timeless essentials that transcend seasons.
              From structured blazers to everyday hoodies, every item is made to
              last — both in quality and in style.
            </p>
            <p className="font-heading text-sm sm:text-base font-semibold text-foreground">
              The Closet — where luxury meets intention.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
