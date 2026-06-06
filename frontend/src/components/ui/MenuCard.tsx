'use client';

import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

import Link from 'next/link';

interface MenuCardProps {
  item: {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    images: string[];
    ratings: number;
  };
}

export default function MenuCard({ item }: MenuCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.images[0] || '/placeholder-food.jpg',
    });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glassmorphism p-4 group"
    >
      <Link href={`/menu/${item.slug}`}>
        <div className="relative h-64 w-full mb-4 overflow-hidden rounded-xl bg-white/5 border border-white/5 shadow-inner cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
          {item.images && item.images.length > 0 && item.images[0] ? (
            <img 
              src={item.images[0]} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-[var(--secondary)]/20 flex items-center justify-center">
               <span className="text-3xl text-[var(--primary)] font-bold tracking-widest opacity-40">BRWD</span>
            </div>
          )}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold border border-white/10 text-[var(--cream)]">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{item.ratings}</span>
          </div>
        </div>
      </Link>
      
      <div className="flex justify-between items-start mb-2">
        <Link href={`/menu/${item.slug}`}>
          <h3 className="text-xl font-semibold text-[var(--cream)] group-hover:text-[var(--primary)] transition-colors cursor-pointer">
            {item.name}
          </h3>
        </Link>
        <span className="text-lg font-bold text-[var(--primary)]">${item.price}</span>
      </div>
      
      <p className="text-sm text-gray-400 mb-6 line-clamp-2">
        {item.description}
      </p>
      
      <button 
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-300"
      >
        <Plus className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </motion.div>
  );
}
