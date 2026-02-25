import blazerImg from '@/assets/products/blazer.jpg';
import oxfordImg from '@/assets/products/oxford-shirt.jpg';
import jerseyImg from '@/assets/products/jersey.jpg';
import trousersImg from '@/assets/products/trousers.jpg';
import hoodieImg from '@/assets/products/hoodie.jpg';
import beanieImg from '@/assets/products/beanie.jpg';

export type ProductColor = 'Black' | 'White' | 'Gray' | 'Navy' | 'Gold Accent';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  colors: ProductColor[];
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 'structured-blazer',
    name: 'The Structured Blazer',
    category: 'Jackets',
    price: 1899,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray'],
    image: blazerImg,
    description: 'Impeccably tailored with a structured shoulder and slim silhouette. Crafted from premium Italian wool blend for the modern professional.',
  },
  {
    id: 'premium-oxford-shirt',
    name: 'The Premium Oxford Shirt',
    category: 'Shirts',
    price: 899,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black'],
    image: oxfordImg,
    description: 'A wardrobe essential. Made from Egyptian cotton with a soft hand feel and refined button-down collar.',
  },
  {
    id: 'relaxed-jersey',
    name: 'The Relaxed Jersey',
    category: 'Jerseys',
    price: 649,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Navy'],
    image: jerseyImg,
    description: 'Elevated casual wear. Heavyweight cotton jersey with ribbed cuffs and a relaxed fit that drapes beautifully.',
  },
  {
    id: 'tailored-trouser',
    name: 'The Tailored Trouser',
    category: 'Pants',
    price: 1299,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Black', 'Gray'],
    image: trousersImg,
    description: 'Precision-cut with a tapered leg and hidden stretch for all-day comfort. The foundation of any sharp outfit.',
  },
  {
    id: 'essential-hoodie',
    name: 'The Essential Hoodie',
    category: 'Hoodies',
    price: 799,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'White'],
    image: hoodieImg,
    description: 'Premium brushed fleece interior. Minimalist design with a structured hood and metal-tipped drawstrings.',
  },
  {
    id: 'cuffed-beanie',
    name: 'The Cuffed Beanie',
    category: 'Hats',
    price: 399,
    sizes: ['One Size'],
    colors: ['Black', 'Gray'],
    image: beanieImg,
    description: 'Ribbed knit beanie in a soft merino blend. A refined finishing touch for any cold-weather look.',
  },
];

export const categories = ['Tops', 'Shirts', 'Pants', 'Jackets', 'Hoodies', 'Jerseys', 'Hats'];
export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', 'One Size'];
export const colorOptions: ProductColor[] = ['Black', 'White', 'Gray', 'Navy'];

export const colorHex: Record<ProductColor, string> = {
  Black: '#1D1D1F',
  White: '#FAFAFA',
  Gray: '#9CA3AF',
  Navy: '#1E3A5F',
  'Gold Accent': '#D4AF37',
};
