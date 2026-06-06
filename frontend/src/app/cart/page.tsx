'use client';

import { useState } from 'react';
import { useCartStore, useAuthStore } from '@/store';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      router.push('/login');
      return;
    }

    setIsCheckingOut(true);
    try {
      const response = await api.post('/orders', {
        items,
        address: '123 Luxury Lane, Food City', // Mock address for now
        phone: '1234567890',
        paymentMethod: 'STRIPE',
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.success('Order placed successfully!');
        clearCart();
        router.push('/order-success');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6">
        <div className="p-10 rounded-full bg-white/5 mb-8">
          <ShoppingBag className="w-16 h-16 text-gray-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-400 mb-8 text-center max-w-xs">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/menu" className="btn-premium">
          Browse Our Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/menu" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-4xl font-bold font-playfair">Your Shopping Bag</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glassmorphism p-6 flex items-center gap-6"
                >
                  <div className="w-24 h-24 rounded-lg bg-[var(--secondary)] flex items-center justify-center font-bold text-[var(--primary)] text-xl">
                    {item.name[0]}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--cream)] mb-1">{item.name}</h3>
                    <p className="text-[var(--primary)] font-bold mb-4">${item.price}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-[var(--primary)] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-[var(--primary)] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glassmorphism p-8 sticky top-32">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="h-px bg-white/5 my-4" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[var(--primary)]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full btn-premium mb-4 disabled:opacity-50"
              >
                {isCheckingOut ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Proceed to Checkout'}
              </button>
              
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
