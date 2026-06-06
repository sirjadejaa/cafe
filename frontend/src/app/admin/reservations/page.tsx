'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Check, X, Users, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_RESERVATIONS = [
  { id: 'RES-882', name: 'Robert Downey', email: 'robert@tony.com', date: 'May 20, 2026', time: '19:00', guests: 4, location: 'INDOOR', table: 'Table #3', status: 'PENDING', note: 'Anniversary celebration. Prefer window table.' },
  { id: 'RES-854', name: 'Scarlett Johansson', email: 'scarlett@widow.com', date: 'May 21, 2026', time: '20:30', guests: 2, location: 'OUTDOOR', table: 'Table #6', status: 'ACCEPTED', note: 'No special requests.' },
  { id: 'RES-811', name: 'Chris Evans', email: 'chris@cap.com', date: 'May 18, 2026', time: '18:00', guests: 6, location: 'INDOOR', table: 'Table #5', status: 'ACCEPTED', note: 'Wheelchair access required.' },
  { id: 'RES-769', name: 'Mark Ruffalo', email: 'mark@hulk.com', date: 'May 17, 2026', time: '21:00', guests: 2, location: 'OUTDOOR', table: 'Table #7', status: 'CANCELLED', note: 'Allergies to gluten.' },
];

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleStatusUpdate = (id: string, status: string) => {
    setReservations(prev => 
      prev.map(res => res.id === id ? { ...res, status } : res)
    );
    if (status === 'ACCEPTED') {
      toast.success(`Reservation ${id} APPROVED and table confirmed.`);
    } else if (status === 'CANCELLED') {
      toast.error(`Reservation ${id} REJECTED.`);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'ACCEPTED': return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'CANCELLED': return 'bg-red-500/10 border-red-500/20 text-red-400';
      default: return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || res.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 text-[var(--cream)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reservations & Bookings</h1>
          <p className="text-gray-400">Review and allocate tables for prospective restaurant diners.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search guests..."
              className="bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:border-[var(--primary)] outline-none w-64 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {['ALL', 'PENDING', 'ACCEPTED', 'CANCELLED'].map((filter) => (
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

      {/* Grid of Reservation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReservations.map((res, idx) => (
          <motion.div 
            key={res.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="glassmorphism p-6 border border-white/5 rounded-2xl flex flex-col justify-between gap-6 hover-glow premium-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-[var(--primary)]/30 to-[var(--accent)]/30 pointer-events-none"></div>
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">{res.id}</span>
                <h3 className="text-xl font-bold text-[var(--cream)] mt-1">{res.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{res.email}</p>
              </div>
              <span className={`inline-flex items-center border text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusClass(res.status)}`}>
                {res.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 rounded-xl p-4 border border-white/5 text-xs text-gray-400">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Date</p>
                <p className="font-bold text-[var(--cream)] mt-1">{res.date}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Time slot</p>
                <p className="font-bold text-[var(--cream)] mt-1">{res.time}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Guests</p>
                <p className="font-bold text-[var(--cream)] mt-1 flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[var(--primary)]" /> {res.guests}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Seating</p>
                <p className="font-bold text-[var(--cream)] mt-1">{res.location} ({res.table})</p>
              </div>
            </div>

            {res.note && (
              <div className="flex gap-2.5 items-start text-xs text-gray-400 bg-amber-500/5 border border-amber-500/10 rounded-xl p-3.5">
                <MessageSquare className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="italic">"{res.note}"</p>
              </div>
            )}

            {res.status === 'PENDING' && (
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <button 
                  onClick={() => handleStatusUpdate(res.id, 'ACCEPTED')}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Approve Bookings
                </button>
                <button 
                  onClick={() => handleStatusUpdate(res.id, 'CANCELLED')}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-500/20 bg-red-950/20 hover:bg-red-500/20 text-red-400 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" /> Decline
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredReservations.length === 0 && (
        <div className="py-16 text-center">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No reservations matches your filter.</p>
        </div>
      )}
    </div>
  );
}
