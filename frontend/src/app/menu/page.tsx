'use client';

import { useState, useEffect } from 'react';
import MenuCard from '@/components/ui/MenuCard';
import { Search, Filter, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = ['All', 'Coffee', 'Pizza', 'Burgers', 'Desserts', 'Drinks', 'Main Course'];

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
  },
  { 
    id: '4', 
    name: 'Panama Gesha Cold Brew', 
    slug: 'panama-gesha-cold-brew', 
    price: 9.0, 
    description: 'An elite single-origin Panama Gesha cold brew coffee, cold-steeped over crystal ice filters for 24 hours. Possesses an aromatic clarity of jasmine, white peach, and orange blossom.', 
    images: ['https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800'], 
    ratings: 4.9,
    category: { name: 'Coffee', slug: 'coffee' }
  },
  { 
    id: '5', 
    name: 'Gold Chocolate Lava', 
    slug: 'gold-chocolate-lava', 
    price: 14.5, 
    description: 'A decadent molten lava cake crafted from 70% single-origin Venezuelan dark chocolate, with a soft flowing core, topped with Madagascar vanilla bean gelato and finished with gold leaf flakes.', 
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800'], 
    ratings: 5.0,
    category: { name: 'Desserts', slug: 'desserts' }
  }
];

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
        console.error('Failed to fetch menu, using mock items:', error);
        setItems(MOCK_ITEMS);
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
