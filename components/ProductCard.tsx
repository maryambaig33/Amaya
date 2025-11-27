import React from 'react';
import { CoffeeProduct } from '../types';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from './Button';

interface ProductCardProps {
  product: CoffeeProduct;
  onAddToCart: (product: CoffeeProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-coffee-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-coffee-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold tracking-wider uppercase text-coffee-800 shadow-sm">
          {product.roastLevel} Roast
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
           <h3 className="text-lg font-serif font-bold text-coffee-900 group-hover:text-coffee-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-coffee-500 uppercase tracking-wide">{product.region}</p>
        </div>
        
        <p className="text-sm text-coffee-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-6">
          {product.tastingNotes.map((note) => (
            <span key={note} className="px-2 py-0.5 bg-coffee-50 text-coffee-700 text-xs rounded-full border border-coffee-100">
              {note}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-coffee-50">
          <span className="text-lg font-bold text-coffee-900">${product.price.toFixed(2)}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onAddToCart(product)}
            className="!p-2 hover:bg-coffee-100 text-coffee-700 group-hover:bg-coffee-800 group-hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
            <span className="ml-2">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};