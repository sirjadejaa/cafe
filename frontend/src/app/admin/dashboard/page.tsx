'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import api from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd have an /admin/stats endpoint
    // For now, we'll simulate the fetch but keep it structured for real data
    const fetchStats = async () => {
      try {
        // const response = await api.get('/admin/stats');
        // setStats(response.data);
        
        // Mocking the data structure that would come from the API
        setStats([
          { name: 'Total Revenue', value: '$24,560', change: '+12.5%', isPositive: true, icon: DollarSign },
          { name: 'Total Orders', value: '1,234', change: '+18.2%', isPositive: true, icon: ShoppingBag },
          { name: 'Active Users', value: '856', change: '-2.4%', isPositive: false, icon: Users },
          { name: 'Average Rating', value: '4.9', change: '+0.1%', isPositive: true, icon: TrendingUp },
        ]);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, Administrator. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glassmorphism p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div className={`flex items-center text-sm ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.name}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glassmorphism p-8 border border-white/5 h-96">
          <h3 className="text-xl font-bold mb-6">Revenue Analytics</h3>
          <div className="w-full h-full flex items-center justify-center text-gray-500">
             {/* Chart.js or Recharts would go here */}
             Chart Visualization Placeholder
          </div>
        </div>
        
        <div className="glassmorphism p-8 border border-white/5 h-96 overflow-y-auto">
          <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-[var(--primary)]">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[var(--cream)]">Order #204{i}</p>
                    <p className="text-xs text-gray-500">2 mins ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-[var(--primary)]">$45.00</p>
                  <p className="text-[10px] uppercase text-green-500 font-bold">Paid</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
