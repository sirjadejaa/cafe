'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Check, X, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function AdminMenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All Categories');

  // Form Field State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState('');
  const [spiceLevel, setSpiceLevel] = useState(0);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await api.get('/menu');
      const fetchedItems = response.data;
      setItems(fetchedItems);
      
      // Extract unique categories dynamically
      const uniqueCategoriesMap: Record<string, { id: string, name: string }> = {};
      fetchedItems.forEach((item: any) => {
        if (item.category && item.category.id) {
          uniqueCategoriesMap[item.category.id] = {
            id: item.category.id,
            name: item.category.name,
          };
        }
      });
      const uniqueCats = Object.values(uniqueCategoriesMap);
      setCategories(uniqueCats);
    } catch (error) {
      toast.error('Failed to fetch menu');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategoryId(categories[0]?.id || '');
    setImageUrl('');
    setIngredients('');
    setCalories('');
    setSpiceLevel(0);
    setIsAdding(true);
  };

  const openEditModal = (item: any) => {
    setSelectedItem(item);
    setName(item.name || '');
    setDescription(item.description || '');
    setPrice(item.price ? item.price.toString() : '');
    setCategoryId(item.categoryId || item.category?.id || categories[0]?.id || '');
    setImageUrl(item.images && item.images.length > 0 ? item.images[0] : '');
    setIngredients(item.ingredients ? item.ingredients.join(', ') : '');
    setCalories(item.calories ? item.calories.toString() : '');
    setSpiceLevel(item.spiceLevel || 0);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/menu/${id}`);
        setItems(items.filter(i => i.id !== id));
        toast.success('Item deleted successfully');
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categoryId) {
      toast.error('Name, Price, and Category are required');
      return;
    }

    const payload = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description,
      price: parseFloat(price),
      categoryId,
      images: imageUrl ? [imageUrl] : [],
      ingredients: ingredients ? ingredients.split(',').map(i => i.trim()) : [],
      calories: calories ? parseInt(calories) : null,
      spiceLevel,
    };

    try {
      if (isEditing && selectedItem) {
        await api.put(`/menu/${selectedItem.id}`, payload);
        toast.success('Item updated successfully');
      } else {
        await api.post('/menu', payload);
        toast.success('Item added successfully');
      }
      setIsAdding(false);
      setIsEditing(false);
      fetchMenu();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update item' : 'Failed to add item');
    }
  };

  // Filtered menu items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategoryFilter === 'All Categories' || 
                            (item.category && item.category.name === selectedCategoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Menu Management</h1>
          <p className="text-gray-400">Add, edit, or remove items from your menu.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="btn-premium flex items-center gap-2 hover-glow cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      <div className="glassmorphism p-8 border border-white/5 premium-card">
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:border-[var(--primary)] outline-none"
            />
          </div>
          
          <div className="flex items-center gap-4">
             <select 
               value={selectedCategoryFilter}
               onChange={(e) => setSelectedCategoryFilter(e.target.value)}
               className="bg-[#0a0a0a] border border-white/10 rounded-lg py-2 px-4 outline-none text-[var(--cream)]"
             >
                <option value="All Categories" className="bg-[#0a0a0a]">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name} className="bg-[#0a0a0a]">{cat.name}</option>
                ))}
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-24 flex items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 text-sm">
                  <th className="pb-4 font-medium">Item Name</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 font-medium text-[var(--cream)]">{item.name}</td>
                    <td className="py-4 text-gray-400 text-sm">{item.category?.name || 'Uncategorized'}</td>
                    <td className="py-4 font-bold text-[var(--primary)]">${item.price.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.isAvailable ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {item.isAvailable ? 'Available' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl glassmorphism p-10 border border-white/10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--cream)]">
                {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h2>
              <button 
                onClick={() => { setIsAdding(false); setIsEditing(false); }} 
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Item Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Premium Flat White"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-[var(--primary)] text-[var(--cream)]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Category</label>
                    <select 
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-[var(--primary)] text-[var(--cream)]"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-[#0a0a0a]">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      placeholder="4.50"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-[var(--primary)] text-[var(--cream)]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Image URL</label>
                    <input 
                      type="text" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-[var(--primary)] text-[var(--cream)]" 
                    />
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Spice Level (0-3)</label>
                    <input 
                      type="number" 
                      min="0"
                      max="3"
                      value={spiceLevel}
                      onChange={(e) => setSpiceLevel(parseInt(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-[var(--primary)] text-[var(--cream)]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Calories</label>
                    <input 
                      type="number" 
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="Optional"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-[var(--primary)] text-[var(--cream)]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Ingredients (comma-separated)</label>
                    <input 
                      type="text" 
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      placeholder="Espresso, milk, sugar"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-[var(--primary)] text-[var(--cream)]" 
                    />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <textarea 
                    rows={3} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Provide a premium, mouthwatering description of this item..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-[var(--primary)] text-[var(--cream)]"
                  ></textarea>
               </div>

               <button type="submit" className="w-full btn-premium hover-glow cursor-pointer">
                  {isEditing ? 'Save Changes' : 'Create Menu Item'}
               </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
