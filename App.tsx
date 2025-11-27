import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Coffee, Search, MapPin, Instagram, Facebook, Twitter, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Page, CoffeeProduct, CartItem } from './types';
import { PRODUCTS } from './constants';
import { ProductCard } from './components/ProductCard';
import { CoffeeSommelier } from './components/CoffeeSommelier';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: CoffeeProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Navigation Helper
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-coffee-50 font-sans">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-coffee-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo(Page.HOME)}>
              <div className="w-10 h-10 bg-coffee-800 rounded-full flex items-center justify-center mr-3">
                <Coffee className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-coffee-900 tracking-tight">AMAYA</h1>
                <p className="text-[10px] uppercase tracking-widest text-coffee-500 font-medium">Coffee Roasters</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigateTo(Page.HOME)} className={`text-sm font-medium hover:text-coffee-600 transition-colors ${currentPage === Page.HOME ? 'text-coffee-900' : 'text-coffee-500'}`}>Home</button>
              <button onClick={() => navigateTo(Page.SHOP)} className={`text-sm font-medium hover:text-coffee-600 transition-colors ${currentPage === Page.SHOP ? 'text-coffee-900' : 'text-coffee-500'}`}>Shop All</button>
              <button onClick={() => navigateTo(Page.SOMMELIER)} className={`text-sm font-medium hover:text-coffee-600 transition-colors flex items-center gap-1 ${currentPage === Page.SOMMELIER ? 'text-coffee-900' : 'text-coffee-500'}`}>
                AI Sommelier <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] rounded-full">NEW</span>
              </button>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-coffee-800 hover:text-coffee-600 transition-colors relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden text-coffee-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-coffee-100 animate-in slide-in-from-top-2">
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => navigateTo(Page.HOME)} className="block w-full text-left text-lg font-medium text-coffee-800 py-2">Home</button>
              <button onClick={() => navigateTo(Page.SHOP)} className="block w-full text-left text-lg font-medium text-coffee-800 py-2">Shop Coffee</button>
              <button onClick={() => navigateTo(Page.SOMMELIER)} className="block w-full text-left text-lg font-medium text-coffee-800 py-2">Find My Match (AI)</button>
            </div>
          </div>
        )}
      </header>

      {/* --- CART SIDEBAR --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-coffee-900">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-coffee-400 hover:text-coffee-800">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag size={48} className="mx-auto text-coffee-200 mb-4" />
                  <p className="text-coffee-500">Your cart is empty.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setIsCartOpen(false); navigateTo(Page.SHOP); }}>Start Shopping</Button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-coffee-100 pb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md bg-coffee-50" />
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-coffee-900">{item.name}</h4>
                      <p className="text-sm text-coffee-500 mb-2">{item.weight} • {item.roastLevel}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-coffee-600 font-medium">x{item.quantity}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-xs uppercase font-bold tracking-wider">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-coffee-100 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-coffee-600">Subtotal</span>
                  <span className="text-xl font-bold text-coffee-900">${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg">Checkout</Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1">
        
        {/* HOME PAGE */}
        {currentPage === Page.HOME && (
          <>
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Coffee Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">Direct Trade • Small Batch</span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                  Awaken Your <br/><span className="italic font-light text-yellow-200">Senses.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
                  Sustainably sourced, meticulously roasted, and delivered fresh to your doorstep. Experience coffee the way nature intended.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigateTo(Page.SHOP)} className="bg-white text-coffee-900 hover:bg-coffee-50 border-none">Shop Coffee</Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigateTo(Page.SOMMELIER)}>Ask AI Sommelier</Button>
                </div>
              </div>
            </section>

            {/* Featured Collection Preview */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-coffee-900 mb-2">Current Roasts</h2>
                  <p className="text-coffee-600">Fresh from the roaster this week.</p>
                </div>
                <Button variant="ghost" onClick={() => navigateTo(Page.SHOP)} className="hidden md:flex">
                  View All <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
              <div className="mt-12 text-center md:hidden">
                 <Button variant="outline" onClick={() => navigateTo(Page.SHOP)}>View All Roasts</Button>
              </div>
            </section>

            {/* Feature Block: Sommelier */}
            <section className="bg-coffee-900 text-white py-24 relative overflow-hidden">
               {/* Decorative circles */}
               <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-coffee-800 rounded-full opacity-50 blur-3xl" />
               <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-coffee-700 rounded-full opacity-30 blur-3xl" />

               <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-wider text-sm">
                      <Sparkles size={16} />
                      <span>New Feature</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold">Unsure what to brew?</h2>
                    <p className="text-coffee-100 text-lg leading-relaxed">
                      Our new AI Coffee Sommelier analyzes your taste preferences—whether you love fruity brightness or dark chocolate depth—to recommend the perfect bag for your morning ritual.
                    </p>
                    <Button onClick={() => navigateTo(Page.SOMMELIER)} className="bg-yellow-500 hover:bg-yellow-600 text-coffee-900 border-none mt-4">
                      Try the Sommelier
                    </Button>
                  </div>
                  <div className="flex-1 w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
                    {/* Mock Chat UI */}
                    <div className="space-y-4">
                       <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs">AI</div>
                         <div className="bg-white/10 p-3 rounded-lg rounded-tl-none text-sm text-coffee-50">
                           What kind of flavors do you usually enjoy in your coffee?
                         </div>
                       </div>
                       <div className="flex gap-3 flex-row-reverse">
                         <div className="w-8 h-8 rounded-full bg-coffee-500 flex items-center justify-center text-xs">Me</div>
                         <div className="bg-coffee-600 p-3 rounded-lg rounded-tr-none text-sm text-white">
                           I love something smooth with hints of caramel and maybe some fruitiness.
                         </div>
                       </div>
                       <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs">AI</div>
                         <div className="bg-white/10 p-3 rounded-lg rounded-tl-none text-sm text-coffee-50">
                           I'd recommend the <strong>Colombia Huila</strong>. It has that creamy caramel body you're looking for, balanced with a sweet red apple acidity.
                         </div>
                       </div>
                    </div>
                  </div>
               </div>
            </section>
          </>
        )}

        {/* SHOP PAGE */}
        {currentPage === Page.SHOP && (
          <section className="py-12 px-4 max-w-7xl mx-auto min-h-[80vh]">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-coffee-900 mb-4">All Roasts</h2>
              <p className="text-coffee-600 max-w-2xl mx-auto">
                Explore our full selection of single-origin coffees and signature blends. Sourced ethically, roasted passionately.
              </p>
            </div>
            
            {/* Simple Filter (Visual only for demo) */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {['All', 'Light Roast', 'Medium Roast', 'Dark Roast', 'Espresso'].map((filter, idx) => (
                <button 
                  key={filter} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-coffee-800 text-white' : 'bg-white text-coffee-600 hover:bg-coffee-100 border border-coffee-200'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {/* SOMMELIER PAGE */}
        {currentPage === Page.SOMMELIER && (
          <section className="py-12 px-4 max-w-7xl mx-auto min-h-[80vh] flex flex-col items-center">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif font-bold text-coffee-900 mb-4">Coffee Sommelier</h2>
              <p className="text-coffee-600 max-w-lg mx-auto">
                Not sure what to pick? Chat with our AI expert to discover a roast tailored to your palate.
              </p>
            </div>
            <CoffeeSommelier />
          </section>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-coffee-900 text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
               <Coffee className="text-white w-6 h-6 mr-3" />
               <span className="text-xl font-serif font-bold tracking-tight">AMAYA</span>
            </div>
            <p className="text-coffee-300 max-w-xs mb-6">
              Small batch coffee roaster dedicated to quality, sustainability, and community. Roasting daily in Houston, TX.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-coffee-400">Shop</h4>
            <ul className="space-y-3 text-sm text-coffee-200">
              <li className="hover:text-white cursor-pointer" onClick={() => navigateTo(Page.SHOP)}>All Coffee</li>
              <li className="hover:text-white cursor-pointer">Subscriptions</li>
              <li className="hover:text-white cursor-pointer">Merchandise</li>
              <li className="hover:text-white cursor-pointer">Gift Cards</li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-coffee-400">About</h4>
             <ul className="space-y-3 text-sm text-coffee-200">
              <li className="hover:text-white cursor-pointer">Our Story</li>
              <li className="hover:text-white cursor-pointer">Wholesale</li>
              <li className="hover:text-white cursor-pointer">Brew Guides</li>
              <li className="hover:text-white cursor-pointer">Locations</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-sm text-coffee-500">
          <p>&copy; 2024 Amaya Coffee Reimagined. Built with React & Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;