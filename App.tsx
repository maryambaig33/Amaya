import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Coffee, Instagram, Facebook, Twitter, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-coffee-50 font-sans selection:bg-terracotta-500 selection:text-white">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-coffee-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => navigateTo(Page.HOME)}>
              <div className="w-10 h-10 bg-coffee-900 rounded-full flex items-center justify-center mr-3 transition-transform group-hover:scale-110">
                <Coffee className="text-terracotta-500 w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-coffee-900 tracking-tight leading-none group-hover:text-terracotta-600 transition-colors">AMAYA</h1>
                <p className="text-[10px] uppercase tracking-widest text-coffee-500 font-medium">Coffee Roasters</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigateTo(Page.HOME)} className={`text-sm font-medium hover:text-terracotta-600 transition-colors relative py-1 ${currentPage === Page.HOME ? 'text-coffee-900 font-semibold' : 'text-coffee-500'}`}>
                Home
                {currentPage === Page.HOME && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta-500 rounded-full"></span>}
              </button>
              <button onClick={() => navigateTo(Page.SHOP)} className={`text-sm font-medium hover:text-terracotta-600 transition-colors relative py-1 ${currentPage === Page.SHOP ? 'text-coffee-900 font-semibold' : 'text-coffee-500'}`}>
                Shop All
                {currentPage === Page.SHOP && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta-500 rounded-full"></span>}
              </button>
              <button onClick={() => navigateTo(Page.SOMMELIER)} className={`text-sm font-medium hover:text-terracotta-600 transition-colors flex items-center gap-1 relative py-1 ${currentPage === Page.SOMMELIER ? 'text-coffee-900 font-semibold' : 'text-coffee-500'}`}>
                AI Sommelier <span className="px-1.5 py-0.5 bg-terracotta-100 text-terracotta-700 text-[10px] font-bold rounded-full">NEW</span>
                {currentPage === Page.SOMMELIER && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta-500 rounded-full"></span>}
              </button>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-5">
              <button className="text-coffee-800 hover:text-terracotta-600 transition-colors relative group" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
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
          <div className="md:hidden bg-white border-b border-coffee-100 animate-in slide-in-from-top-2 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => navigateTo(Page.HOME)} className="block w-full text-left text-lg font-medium text-coffee-800 py-2 hover:bg-coffee-50 px-2 rounded-lg">Home</button>
              <button onClick={() => navigateTo(Page.SHOP)} className="block w-full text-left text-lg font-medium text-coffee-800 py-2 hover:bg-coffee-50 px-2 rounded-lg">Shop Coffee</button>
              <button onClick={() => navigateTo(Page.SOMMELIER)} className="block w-full text-left text-lg font-medium text-coffee-800 py-2 hover:bg-coffee-50 px-2 rounded-lg flex items-center gap-2">
                Find My Match (AI) <Sparkles size={16} className="text-terracotta-500" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- CART SIDEBAR --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-6 border-b border-coffee-100 pb-4">
              <h2 className="text-2xl font-serif font-bold text-coffee-900 flex items-center gap-2">
                Your Cart <span className="text-sm font-sans font-normal text-coffee-500">({cartCount} items)</span>
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-coffee-400 hover:text-coffee-800 transition-colors bg-coffee-50 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {cart.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                  <div className="bg-coffee-50 p-6 rounded-full mb-4">
                    <ShoppingBag size={48} className="text-coffee-300" />
                  </div>
                  <h3 className="text-lg font-medium text-coffee-900 mb-2">Your cart is empty</h3>
                  <p className="text-coffee-500 mb-8 max-w-xs">Looks like you haven't added any coffee to your cart yet.</p>
                  <Button variant="primary" className="mt-4" onClick={() => { setIsCartOpen(false); navigateTo(Page.SHOP); }}>Start Shopping</Button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-coffee-100 pb-4 last:border-0">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-coffee-50 border border-coffee-100" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-coffee-900 text-lg leading-tight mb-1">{item.name}</h4>
                        <p className="text-xs text-coffee-500 uppercase tracking-wide font-medium">{item.weight} • {item.roastLevel}</p>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center gap-3 bg-coffee-50 rounded-lg px-2 py-1">
                          <button className="text-coffee-600 hover:text-coffee-900 px-1" onClick={() => addToCart({...item, quantity: -1})}>-</button>
                          <span className="text-coffee-900 font-medium text-sm w-4 text-center">{item.quantity}</span>
                          <button className="text-coffee-600 hover:text-coffee-900 px-1" onClick={() => addToCart(item)}>+</button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-coffee-900">${(item.price * item.quantity).toFixed(2)}</div>
                          <button onClick={() => removeFromCart(item.id)} className="text-terracotta-600 hover:text-terracotta-700 text-[10px] uppercase font-bold tracking-wider underline mt-1">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-coffee-100 mt-auto bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-coffee-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-serif font-bold text-coffee-900">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-coffee-500 mb-4 text-center">Shipping & taxes calculated at checkout</p>
                <Button className="w-full bg-coffee-900 hover:bg-terracotta-600 transition-colors" size="lg">Checkout</Button>
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
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
                alt="Coffee Background" 
                className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-1000"
              />
              <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto flex flex-col items-center">
                <div className="animate-in slide-in-from-bottom-8 fade-in duration-1000">
                  <span className="inline-block py-1.5 px-4 border border-white/40 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 text-white shadow-lg">
                    Direct Trade • Small Batch
                  </span>
                  <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight drop-shadow-lg">
                    Awaken Your <br/><span className="italic font-light text-terracotta-400">Senses.</span>
                  </h1>
                  <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                    Sustainably sourced, meticulously roasted, and delivered fresh to your doorstep. Experience coffee the way nature intended.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center">
                    <Button size="lg" onClick={() => navigateTo(Page.SHOP)} className="bg-white text-coffee-900 hover:bg-coffee-100 border-none font-bold px-10 shadow-xl">Shop Coffee</Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 hover:border-white font-medium px-10 backdrop-blur-sm" onClick={() => navigateTo(Page.SOMMELIER)}>
                      <Sparkles size={18} className="mr-2 text-terracotta-300" />
                      Ask AI Sommelier
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Collection Preview */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div className="max-w-xl">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-900 mb-4">Current Roasts</h2>
                  <p className="text-lg text-coffee-600 font-light">Fresh from the roaster this week. Each batch is cupped for perfection.</p>
                </div>
                <Button variant="ghost" onClick={() => navigateTo(Page.SHOP)} className="hidden md:flex text-terracotta-600 hover:bg-terracotta-50 hover:text-terracotta-700">
                  View All Roasts <ChevronRight size={18} className="ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
              <div className="mt-16 text-center md:hidden">
                 <Button variant="outline" onClick={() => navigateTo(Page.SHOP)} className="w-full">View All Roasts</Button>
              </div>
            </section>

            {/* Feature Block: Sommelier */}
            <section className="bg-coffee-900 text-white py-32 relative overflow-hidden">
               {/* Decorative circles */}
               <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-terracotta-600 rounded-full opacity-20 blur-[100px]" />
               <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-coffee-700 rounded-full opacity-40 blur-[80px]" />

               <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                  <div className="flex-1 space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 text-terracotta-400 font-bold uppercase tracking-widest text-xs bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      <Sparkles size={14} />
                      <span>New Feature</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">Unsure what <br/>to brew?</h2>
                    <p className="text-coffee-100 text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                      Our new AI Coffee Sommelier analyzes your taste preferences—whether you love fruity brightness or dark chocolate depth—to recommend the perfect bag for your morning ritual.
                    </p>
                    <Button onClick={() => navigateTo(Page.SOMMELIER)} className="bg-terracotta-500 hover:bg-terracotta-600 text-white border-none mt-4 text-lg px-8 py-4 shadow-lg shadow-terracotta-900/50">
                      Try the Sommelier
                    </Button>
                  </div>
                  <div className="flex-1 w-full max-w-md bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-terracotta-500 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="text-white w-6 h-6" />
                    </div>
                    {/* Mock Chat UI */}
                    <div className="space-y-5">
                       <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-terracotta-600 flex items-center justify-center text-xs font-bold shadow-md">AI</div>
                         <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none text-sm text-coffee-50 leading-relaxed">
                           What kind of flavors do you usually enjoy in your coffee?
                         </div>
                       </div>
                       <div className="flex gap-3 flex-row-reverse">
                         <div className="w-8 h-8 rounded-full bg-coffee-500 flex items-center justify-center text-xs font-bold shadow-md">Me</div>
                         <div className="bg-white text-coffee-900 p-4 rounded-2xl rounded-tr-none text-sm shadow-md">
                           I love something smooth with hints of caramel and maybe some fruitiness.
                         </div>
                       </div>
                       <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-terracotta-600 flex items-center justify-center text-xs font-bold shadow-md">AI</div>
                         <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none text-sm text-coffee-50 leading-relaxed">
                           I'd recommend the <strong className="text-terracotta-300">Colombia Huila</strong>. It has that creamy caramel body you're looking for, balanced with a sweet red apple acidity.
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
          <section className="py-20 px-4 max-w-7xl mx-auto min-h-[80vh]">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-5xl font-serif font-bold text-coffee-900">All Roasts</h2>
              <p className="text-coffee-600 max-w-2xl mx-auto text-lg">
                Explore our full selection of single-origin coffees and signature blends. Sourced ethically, roasted passionately.
              </p>
            </div>
            
            {/* Simple Filter (Visual only for demo) */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {['All', 'Light Roast', 'Medium Roast', 'Dark Roast', 'Espresso'].map((filter, idx) => (
                <button 
                  key={filter} 
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${idx === 0 ? 'bg-coffee-900 text-white shadow-md' : 'bg-white text-coffee-600 hover:bg-terracotta-50 hover:text-terracotta-700 hover:border-terracotta-200 border border-coffee-200'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {/* SOMMELIER PAGE */}
        {currentPage === Page.SOMMELIER && (
          <section className="py-20 px-4 max-w-7xl mx-auto min-h-[80vh] flex flex-col items-center">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-terracotta-100 rounded-full mb-2">
                <Sparkles className="text-terracotta-600 w-6 h-6" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-900">Coffee Sommelier</h2>
              <p className="text-coffee-600 max-w-lg mx-auto text-lg leading-relaxed">
                Not sure what to pick? Chat with our AI expert to discover a roast tailored to your palate.
              </p>
            </div>
            <CoffeeSommelier />
          </section>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-coffee-900 text-white py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center">
               <div className="w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center mr-3">
                 <Coffee className="text-white w-4 h-4" />
               </div>
               <span className="text-2xl font-serif font-bold tracking-tight">AMAYA</span>
            </div>
            <p className="text-coffee-200 max-w-sm text-base leading-relaxed">
              Small batch coffee roaster dedicated to quality, sustainability, and community. Roasting daily in Houston, TX.
            </p>
            <div className="flex space-x-6 pt-2">
              <a href="#" className="text-white/40 hover:text-terracotta-400 transition-colors"><Instagram size={22} /></a>
              <a href="#" className="text-white/40 hover:text-terracotta-400 transition-colors"><Facebook size={22} /></a>
              <a href="#" className="text-white/40 hover:text-terracotta-400 transition-colors"><Twitter size={22} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-terracotta-400">Shop</h4>
            <ul className="space-y-4 text-sm text-coffee-200">
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigateTo(Page.SHOP)}>All Coffee</li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Subscriptions</li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Merchandise</li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Gift Cards</li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-terracotta-400">About</h4>
             <ul className="space-y-4 text-sm text-coffee-200">
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Our Story</li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Wholesale</li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Brew Guides</li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Locations</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center text-sm text-coffee-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024 Amaya Coffee Reimagined.</p>
          <p className="flex items-center gap-2">Built with <span className="text-terracotta-400">♥</span> using React & Gemini</p>
        </div>
      </footer>
    </div>
  );
};

export default App;