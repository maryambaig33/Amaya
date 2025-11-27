import { CoffeeProduct } from './types';

export const PRODUCTS: CoffeeProduct[] = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe',
    roastLevel: 'Light',
    price: 22.00,
    description: 'A classic washed coffee from the Gedeo Zone. Bright, floral, and tea-like body.',
    tastingNotes: ['Jasmine', 'Bergamot', 'Lemon Zest'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    region: 'Gedeo Zone, Ethiopia',
    weight: '12oz'
  },
  {
    id: '2',
    name: 'Colombia Huila',
    roastLevel: 'Medium',
    price: 19.50,
    description: 'Balanced and sweet with a creamy body. Perfect for daily drinking.',
    tastingNotes: ['Caramel', 'Red Apple', 'Milk Chocolate'],
    image: 'https://images.unsplash.com/photo-1511537632536-b7a57580e5b4?q=80&w=800&auto=format&fit=crop',
    region: 'Huila, Colombia',
    weight: '12oz'
  },
  {
    id: '3',
    name: 'Sumatra Mandheling',
    roastLevel: 'Dark',
    price: 20.00,
    description: 'Full-bodied, earthy, and intense. Low acidity with a lingering finish.',
    tastingNotes: ['Dark Chocolate', 'Cedar', 'Spice'],
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=800&auto=format&fit=crop',
    region: 'Sumatra, Indonesia',
    weight: '12oz'
  },
  {
    id: '4',
    name: 'Espresso Blend No. 1',
    roastLevel: 'Espresso',
    price: 18.00,
    description: 'Our signature house espresso. Syrupy body designed to cut through milk.',
    tastingNotes: ['Toffee', 'Hazelnut', 'Dried Cherry'],
    image: 'https://images.unsplash.com/photo-1610889556283-43f35397d785?q=80&w=800&auto=format&fit=crop',
    region: 'Blend (Brazil, Ethiopia)',
    weight: '12oz'
  },
  {
    id: '5',
    name: 'Kenya AA',
    roastLevel: 'Light',
    price: 24.00,
    description: 'Complex and juicy. Known for its intense fruit acidity and wine-like characteristics.',
    tastingNotes: ['Blackcurrant', 'Grapefruit', 'Tomato Vine'],
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800&auto=format&fit=crop',
    region: 'Nyeri, Kenya',
    weight: '12oz'
  },
  {
    id: '6',
    name: 'Guatemala Antigua',
    roastLevel: 'Medium',
    price: 21.00,
    description: 'Elegant and refined. Spicy and smoky with a clean finish.',
    tastingNotes: ['Cocoa', 'Spice', 'Orange'],
    image: 'https://images.unsplash.com/photo-1504630083234-141d77f9e718?q=80&w=800&auto=format&fit=crop',
    region: 'Antigua, Guatemala',
    weight: '12oz'
  }
];