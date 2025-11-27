import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Coffee, User, Trash2 } from 'lucide-react';
import { getCoffeeRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Button } from './Button';

const SUGGESTIONS = [
  "Recommend a light roast",
  "I love dark chocolate notes",
  "Something low acidity",
  "Best beans for Espresso"
];

const INITIAL_MESSAGE: ChatMessage = { 
  role: 'model', 
  text: "Welcome to the Amaya Tasting Room. I'm your AI Sommelier. Tell me what kind of flavors you enjoy, or how you brew your coffee, and I'll find your perfect match." 
};

export const CoffeeSommelier: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Build context from previous messages for better continuity
    const contextPrompt = messages.slice(-4).map(m => `${m.role === 'user' ? 'Customer' : 'Sommelier'}: ${m.text}`).join('\n') + `\nCustomer: ${textToSend}`;

    try {
      const responseText = await getCoffeeRecommendation(contextPrompt);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, I'm having trouble connecting to the tasting database. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-coffee-100">
      <div className="bg-coffee-900 p-4 flex items-center justify-between border-b border-coffee-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-terracotta-500 to-coffee-700 rounded-full shadow-lg relative">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-coffee-900 rounded-full"></span>
          </div>
          <div>
            <h3 className="text-white font-serif font-medium tracking-wide">Amaya AI Sommelier</h3>
            <p className="text-coffee-300 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-terracotta-500 rounded-full animate-pulse"></span>
              Powered by Gemini 2.5
            </p>
          </div>
        </div>
        <button 
          onClick={handleClear}
          className="text-coffee-400 hover:text-terracotta-400 transition-colors p-2 hover:bg-white/5 rounded-full"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-coffee-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-coffee-700' : 'bg-terracotta-600'}`}>
                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Coffee size={14} className="text-white" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-coffee-700 text-white rounded-tr-none' 
                  : 'bg-white text-coffee-900 border border-coffee-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex items-start gap-3">
               <div className="w-8 h-8 rounded-full bg-terracotta-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                 <Coffee size={14} className="text-white" />
               </div>
               <div className="flex items-center gap-2 bg-white px-5 py-4 rounded-2xl rounded-tl-none border border-coffee-100 shadow-sm h-12">
                  <div className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-coffee-100 space-y-3">
        {/* Suggestion Chips */}
        {!isLoading && messages.length < 5 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSend(suggestion)}
                className="whitespace-nowrap px-3 py-1.5 bg-coffee-50 hover:bg-terracotta-50 text-coffee-600 hover:text-terracotta-700 border border-coffee-200 hover:border-terracotta-200 rounded-full text-xs font-medium transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe your taste..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-coffee-50 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 text-coffee-900 placeholder:text-coffee-400 transition-all"
          />
          <Button 
            onClick={() => handleSend()} 
            disabled={isLoading || !input.trim()} 
            className="!px-4 bg-coffee-900 hover:bg-terracotta-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};