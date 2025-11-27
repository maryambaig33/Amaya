import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Coffee, User } from 'lucide-react';
import { getCoffeeRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Button } from './Button';

export const CoffeeSommelier: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to the Amaya Tasting Room. I'm your AI Sommelier. Tell me what kind of flavors you enjoy, or how you brew your coffee, and I'll find your perfect match." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Build context from previous messages for better continuity (simplified)
    // In a production app, we would use the chat history API properly.
    const contextPrompt = messages.slice(-4).map(m => `${m.role === 'user' ? 'Customer' : 'Sommelier'}: ${m.text}`).join('\n') + `\nCustomer: ${input}`;

    try {
      const responseText = await getCoffeeRecommendation(contextPrompt);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, I'm having trouble connecting to the tasting database." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-coffee-100">
      <div className="bg-coffee-800 p-4 flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-full">
          <Sparkles className="w-5 h-5 text-yellow-200" />
        </div>
        <div>
          <h3 className="text-white font-serif font-medium">Amaya AI Sommelier</h3>
          <p className="text-coffee-200 text-xs">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-coffee-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-coffee-600' : 'bg-emerald-700'}`}>
                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Coffee size={14} className="text-white" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-coffee-600 text-white rounded-tr-none' 
                  : 'bg-white text-coffee-900 border border-coffee-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-coffee-100 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-xs text-coffee-400 font-medium">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-coffee-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="I like coffee that tastes like..."
            className="flex-1 px-4 py-2 bg-coffee-50 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 text-coffee-900 placeholder:text-coffee-300"
          />
          <Button onClick={handleSend} disabled={isLoading} className="!px-4">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};