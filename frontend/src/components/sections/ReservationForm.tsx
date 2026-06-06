'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';

export default function ReservationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    location: 'INDOOR',
    specialRequests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to make a reservation');
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/reservations', {
        ...formData,
        guests: parseInt(formData.guests),
      });
      toast.success('Reservation request sent! We will confirm soon.');
      setFormData({
        date: '',
        time: '',
        guests: '2',
        location: 'INDOOR',
        specialRequests: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Reservation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glassmorphism p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
              <input 
                type="date" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[var(--primary)] outline-none"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
              <input 
                type="time" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[var(--primary)] outline-none"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[var(--primary)] outline-none appearance-none"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
              >
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n} className="bg-[#0a0a0a]">{n} People</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[var(--primary)] outline-none appearance-none"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              >
                <option value="INDOOR" className="bg-[#0a0a0a]">Indoor</option>
                <option value="OUTDOOR" className="bg-[#0a0a0a]">Outdoor</option>
                <option value="ROOFTOP" className="bg-[#0a0a0a]">Rooftop Terrace</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Special Requests</label>
          <textarea 
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:border-[var(--primary)] outline-none"
            placeholder="Anniversary, dietary restrictions, etc."
            value={formData.specialRequests}
            onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
          />
        </div>

        <button type="submit" disabled={isLoading} className="w-full btn-premium disabled:opacity-50">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Confirm Reservation'}
        </button>
      </form>
    </div>
  );
}
