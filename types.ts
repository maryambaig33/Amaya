export enum Page {
  HOME = 'HOME',
  SHOP = 'SHOP',
  SOMMELIER = 'SOMMELIER',
  CART = 'CART',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL' // Simplified for this SPA
}

export interface CoffeeProduct {
  id: string;
  name: string;
  roastLevel: 'Light' | 'Medium' | 'Dark' | 'Espresso';
  price: number;
  description: string;
  tastingNotes: string[];
  image: string;
  region: string;
  weight: string;
}

export interface CartItem extends CoffeeProduct {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}