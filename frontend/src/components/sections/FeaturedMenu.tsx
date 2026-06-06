'use client';

import { useState, useEffect } from 'react';
import MenuCard from '../ui/MenuCard';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

import Link from 'next/link';

export default function FeaturedMenu() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get('/menu');
        setItems(response.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured menu:', error);
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
