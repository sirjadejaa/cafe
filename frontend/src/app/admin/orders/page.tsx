'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, CheckCircle, Clock, Ban, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_ORDERS = [
  { id: 'ORD-9021', customer: 'Jane Doe', items: 'Gold Leaf Pasta, Artisan Espresso', total: 28.5, status: 'PREPARING', date: 'Just now', payment: 'STRIPE' },
  { id: 'ORD-8943', customer: 'John Smith', items: 'Truffle Burger, Panama Gesha Cold Brew', total: 27.0, status: 'PENDING', date: '12 mins ago', payment: 'CASH' },
  { id: 'ORD-8711', customer: 'Alice Johnson', items: 'Gold Chocolate Lava, Artisan Espresso', total: 19.0, status: 'COMPLETED', date: '1 hour ago', payment: 'STRIPE' },
  { id: 'ORD-8654', customer: 'David Miller', items: 'Truffle Burger, Gold Leaf Pasta', total: 42.0, status: 'CANCELLED', date: '3 hours ago', payment: 'STRIPE' },
  { id: 'ORD-8532', customer: 'Emily Davis', items: 'Gold Leaf Pasta, Gold Chocolate Lava', total: 38.5, status: 'COMPLETED', date: 'Yesterday', payment: 'STRIPE' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(prev => 
      prev.map(ord => ord.id === id ? { ...ord, status: newStatus } : ord)
    );
    toast.success(`Order ${id} status updated to ${newStatus}`);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'PREPARING': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'COMPLETED': return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'CANCELLED': return 'bg-red-500/10 border-red-500/20 text-red-400';
      default: return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  const filteredOrders = orders.filter(ord => {
    const matchesSearch = ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ord.items.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || ord.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 text-[var(--cream)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-gray-400">Monitor and update customer culinary orders in real-time.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search orders..."
              className="bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:border-[var(--primary)] outline-none w-64 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {['ALL', 'PENDING', 'PREPARING', 'COMPLETED', 'CANCELLED'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 ${
              activeFilter === filter 
                ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20' 
                : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders Grid/List */}
      <div className="glassmorphism border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-400">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Dishes Ordered</th>
                <th className="py-4 px-6">Total</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Placed</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord, idx) => (
                <motion.tr 
                  key={ord.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors text-sm"
                >
                  <td className="py-4 px-6 font-bold text-[var(--primary)]">{ord.id}</td>
                  <td className="py-4 px-6 font-medium">{ord.customer}</td>
                  <td className="py-4 px-6 text-gray-400 max-w-[200px] truncate">{ord.items}</td>
                  <td className="py-4 px-6 font-bold">${ord.total.toFixed(2)}</td>
                  <td className="py-4 px-6"><span className="text-xs font-semibold text-gray-400 bg-white/5 px-2.5 py-1 rounded-md">{ord.payment}</span></td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center border text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusBadgeClass(ord.status)}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-500">{ord.date}</td>
                  <td className="py-4 px-6 text-right">
                    <select 
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="bg-[#0f0f0f] border border-white/10 rounded-lg text-xs font-semibold text-[var(--cream)] p-2 outline-none focus:border-[var(--primary)] cursor-pointer"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PREPARING">Preparing</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-16 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No orders matches your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
