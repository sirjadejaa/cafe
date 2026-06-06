'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, MapPin, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { useEffect } from 'react';

export default function OrderSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  // Clear the cart on successful completion
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[var(--cream)] pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[var(--primary)]/5 to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full glassmorphism p-8 md:p-12 text-center border border-white/5 rounded-3xl shadow-2xl relative"
      >
        <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] pointer-events-none rounded-t-3xl" />
        
        {/* Animated Check Ring */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-24 h-24 bg-[var(--primary)]/10 border-2 border-[var(--primary)]/20 rounded-full flex items-center justify-center relative"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1.1 }}
              className="absolute inset-0 bg-[var(--primary)]/5 rounded-full animate-ping pointer-events-none"
            />
            <CheckCircle className="w-12 h-12 text-[var(--primary)]" />
          </motion.div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-gradient">
          Culinary Feast Placed!
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Your order has been successfully placed. Our Michelin-standard kitchen is already hand-crafting your dishes using pristine ingredients.
        </p>

        {/* Order Details Panel */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-left text-xs text-gray-400 space-y-4 mb-10">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-500 uppercase tracking-widest">Order ID</span>
            <span className="font-bold text-[var(--cream)]">BRWD-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          
          <div className="h-px bg-white/5" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 items-start">
              <Clock className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[var(--cream)]">25 - 35 Mins</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Estimated Preparation</p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[var(--cream)]">Dine-in / Delivery</p>
                <p className="text-[10px] text-gray-500 mt-0.5">123 Luxury Lane</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/menu" className="btn-premium flex-1 py-3.5 px-6 font-bold flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Browse More Menu
          </Link>
          <Link 
            href="/" 
            className="flex-1 py-3.5 px-6 border border-white/10 hover:border-white/20 rounded-xl hover:bg-white/5 transition-all text-xs font-bold flex items-center justify-center text-gray-400 hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
