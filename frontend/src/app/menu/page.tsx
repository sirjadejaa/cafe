'use client';

import { useState, useEffect } from 'react';
import MenuCard from '@/components/ui/MenuCard';
import { Search, Filter, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = ['All', 'Coffee', 'Pizza', 'Burgers', 'Desserts', 'Drinks', 'Main Course'];

export default function MenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get('/menu');
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = items.filter(item => {
    const itemCatName = typeof item.category === 'object' && item.category !== null 
      ? item.category.name 
      : item.categoryName || item.category || 'Coffee';

    const matchesCategory = activeCategory === 'All' || 
                            itemCatName.toLowerCase() === activeCategory.toLowerCase();
                            
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#0a0a0a]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <h1 className="text-5xl font-bold font-playfair text-gradient">Our Culinary Art</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search our menu..."
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:border-[var(--primary)] outline-none w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-[var(--primary)]/20 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-[var(--primary)] border-[var(--primary)] text-white' 
                  : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="py-24 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-500 text-xl">No items found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
