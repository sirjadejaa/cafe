'use client';

import { useState, useEffect } from 'react';
import MenuCard from '../ui/MenuCard';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

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
    category: { name: 'Coffee', slug: 'coffee' }
  },
  { 
    id: '2', 
    name: 'Truffle Burger', 
    slug: 'truffle-burger', 
    price: 18.0, 
    description: 'A premium chef-selected 8oz Wagyu beef patty, grilled over cedar embers, layered with house-made black winter truffle aioli, melted aged cave Gruyère, and caramelized shallots on a toasted gold-leaf brioche bun.', 
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'], 
    ratings: 4.8,
    category: { name: 'Burgers', slug: 'burgers' }
  },
  { 
    id: '3', 
    name: 'Gold Leaf Pasta', 
    slug: 'gold-leaf-pasta', 
    price: 24.0, 
    description: 'Exquisite hand-rolled yolk pappardelle pasta tossed in a luxurious Iranian saffron cream reduction, garnished with freshly grated Pecorino Romano and delicate sheets of 24-karat edible gold leaf.', 
    images: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'], 
    ratings: 5.0,
    category: { name: 'Main Course', slug: 'main-course' }
  }
];

export default function FeaturedMenu() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get('/menu');
        setItems(response.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured menu, using mock items:', error);
        setItems(MOCK_ITEMS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--primary)] mb-4 font-bold">Selection</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-playfair">Chef's Recommendations</h3>
          </div>
          <Link href="/menu" className="text-[var(--primary)] font-medium border-b border-[var(--primary)] hover:opacity-70 transition-opacity">
            View All Dishes
          </Link>
        </div>

        {isLoading ? (
          <div className="py-24 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
