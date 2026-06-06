'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Plus, Minus, Loader2, Leaf, Clock, Award } from 'lucide-react';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import Link from 'next/link';

const MOCK_ITEMS = [
  { 
    id: '1', 
    name: 'Artisan Espresso', 
    slug: 'artisan-espresso', 
    price: 4.5, 
    description: 'A triple-shot of our signature high-altitude dark roast Arabica beans, featuring a deep body, heavy velvet crema, and soft notes of dark cocoa and honey.', 
    images: ['https://images.unsplash.com/photo-151097252790b-af4f90dbf97d?auto=format&fit=crop&q=80&w=800'], 
    ratings: 4.9,
    ingredients: ['100% Gesha Arabica', 'Sartorial Micro-Roast', 'Purified Artesian Water'],
    prepTime: '3 mins',
    origin: 'Panama Highlands'
  },
  { 
    id: '2', 
    name: 'Truffle Burger', 
    slug: 'truffle-burger', 
    price: 18.0, 
    description: 'A premium chef-selected 8oz Wagyu beef patty, grilled over cedar embers, layered with house-made black winter truffle aioli, melted aged cave Gruyère, and caramelized shallots on a toasted gold-leaf brioche bun.', 
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'], 
    ratings: 4.8,
    ingredients: ['A5 Wagyu Beef', 'Black Winter Truffle', 'Cave-Aged Gruyere', 'Organic Brioche Bun'],
    prepTime: '15 mins',
    origin: 'Kobe, Japan'
  },
  { 
    id: '3', 
    name: 'Gold Leaf Pasta', 
    slug: 'gold-leaf-pasta', 
    price: 24.0, 
    description: 'Exquisite hand-rolled yolk pappardelle pasta tossed in a luxurious Iranian saffron cream reduction, garnished with freshly grated Pecorino Romano and delicate sheets of 24-karat edible gold leaf.', 
    images: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'], 
    ratings: 5.0,
    ingredients: ['Handmade Egg Pappardelle', 'Iranian Saffron', 'Pecorino Romano', '24k Edible Gold Leaf'],
    prepTime: '12 mins',
    origin: 'Abruzzo, Italy'
  },
  { 
    id: '4', 
    name: 'Panama Gesha Cold Brew', 
    slug: 'panama-gesha-cold-brew', 
    price: 9.0, 
    description: 'An elite single-origin Panama Gesha cold brew coffee, cold-steeped over crystal ice filters for 24 hours. Possesses an aromatic clarity of jasmine, white peach, and orange blossom.', 
    images: ['https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800'], 
    ratings: 4.9,
    ingredients: ['Panama Gesha Beans', 'Cold Ice Steeped', 'Filtered Crystallized Springs'],
    prepTime: '2 mins',
    origin: 'Boquete, Panama'
  },
  { 
    id: '5', 
    name: 'Gold Chocolate Lava', 
    slug: 'gold-chocolate-lava', 
    price: 14.5, 
    description: 'A decadent molten lava cake crafted from 70% single-origin Venezuelan dark chocolate, with a soft flowing core, topped with Madagascar vanilla bean gelato and finished with gold leaf flakes.', 
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800'], 
    ratings: 5.0,
    ingredients: ['70% Venezuelan Chocolate', 'Organic Butter', 'Madagascar Vanilla Bean', '24k Gold Flakes'],
    prepTime: '8 mins',
    origin: 'Caracas, Venezuela'
  }
];

export default function MenuItemDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/menu/${slug}`);
        setItem(response.data);
      } catch (error) {
        console.error('Failed to fetch item, utilizing mock details...');
        const matched = MOCK_ITEMS.find(i => i.slug === slug);
        if (matched) {
          setItem(matched);
        } else {
          toast.error('Dish details not found.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [slug]);

  const handleAddToCart = () => {
    if (!item) return;
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      image: item.images?.[0] || '/placeholder-food.jpg',
    });
    toast.success(`${quantity}x ${item.name} added to cart`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 px-6 text-center text-[var(--cream)]">
        <h1 className="text-3xl font-bold mb-4 font-playfair">Gourmet Creation Not Found</h1>
        <p className="text-gray-400 mb-8">We could not locate this culinary creation on our menu.</p>
        <Link href="/menu" className="btn-premium py-3 px-8">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[var(--cream)] pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[var(--primary)]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Back Button */}
        <Link 
          href="/menu" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--cream)] hover:text-[var(--primary)] mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Selection
        </Link>

        {/* Core Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Premium Food Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[450px] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
            <img 
              src={item.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
            />
            <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1.5 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{item.ratings || '5.0'} / 5.0 (Michelin Rated)</span>
            </div>
          </motion.div>

          {/* Right: Gourmet details */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-3 text-xs font-extrabold uppercase tracking-widest text-[var(--primary)]">
                <span className="bg-[var(--primary)]/10 px-3 py-1 rounded-md border border-[var(--primary)]/20">Chef Recommended</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.prepTime || '10 mins'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-playfair text-gradient mb-4">{item.name}</h1>
              <p className="text-2xl font-bold text-[var(--primary)]">${item.price}</p>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm">
              {item.description}
            </p>

            {/* Ingredients */}
            <div className="space-y-4 border-y border-white/5 py-6">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-gray-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-green-500" /> Curated Ingredients
              </h3>
              <div className="grid grid-cols-2 gap-3.5">
                {(item.ingredients || ['Single-Origin Beans', 'Standard roast', 'Filtered Water']).map((ing: string) => (
                  <div key={ing} className="flex items-center gap-2 text-xs text-[var(--cream)] bg-white/5 border border-white/5 px-3 py-2 rounded-xl">
                    <Award className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
              <div className="flex items-center gap-4 border border-white/10 rounded-full p-1 bg-white/5">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors cursor-pointer text-gray-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors cursor-pointer text-gray-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="btn-premium flex-1 flex items-center justify-center gap-2 py-4 px-8 w-full font-bold shadow-lg shadow-[var(--primary)]/10"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Order • ${(item.price * quantity).toFixed(2)}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
