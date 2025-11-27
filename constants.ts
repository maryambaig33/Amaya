import { CoffeeProduct } from './types';

export const PRODUCTS: CoffeeProduct[] = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe',
    roastLevel: 'Light',
    price: 22.00,
    description: 'A classic washed coffee from the Gedeo Zone. Bright, floral, and tea-like body.',
    tastingNotes: ['Jasmine', 'Bergamot', 'Lemon Zest'],
    image: 'https://picsum.photos/400/400?random=1',
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
    image: 'https://picsum.photos/400/400?random=2',
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
    image: 'https://picsum.photos/400/400?random=3',
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
    image: 'https://picsum.photos/400/400?random=4',
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
    image: 'https://picsum.photos/400/400?random=5',
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
    image: 'https://picsum.photos/400/400?random=6',
    region: 'Antigua, Guatemala',
    weight: '12oz'
  }
];