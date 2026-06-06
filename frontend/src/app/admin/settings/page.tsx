'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Coffee, CreditCard, Clock, Sliders } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('Brew & Dine');
  const [openingTime, setOpeningTime] = useState('08:00');
  const [closingTime, setClosingTime] = useState('22:00');
  const [taxRate, setTaxRate] = useState(8);
  const [autoApprove, setAutoApprove] = useState(false);
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Configuration settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-8 text-[var(--cream)] max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Configuration</h1>
        <p className="text-gray-400">Tweak operational restaurant hours, tax models, and payment gate keys.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand details */}
        <div className="glassmorphism p-6 border border-white/5 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-3 text-[var(--primary)]">
            <Coffee className="w-5 h-5" /> Brand Identity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Restaurant Name</label>
              <input 
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-[var(--primary)] outline-none transition-colors text-sm"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="glassmorphism p-6 border border-white/5 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-3 text-[var(--primary)]">
            <Clock className="w-5 h-5" /> Operating Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Opening Hour</label>
              <input 
                type="time"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-[var(--primary)] outline-none transition-colors text-sm"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Closing Hour</label>
              <input 
                type="time"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-[var(--primary)] outline-none transition-colors text-sm"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Finance & Checkout */}
        <div className="glassmorphism p-6 border border-white/5 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-3 text-[var(--primary)]">
            <CreditCard className="w-5 h-5" /> Checkout & Payments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sales Tax Rate (%)</label>
              <input 
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-[var(--primary)] outline-none transition-colors text-sm"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between md:pt-8 bg-white/5 p-4 rounded-xl border border-white/5">
              <div>
                <p className="text-sm font-bold">Stripe Checkout Integration</p>
                <p className="text-xs text-gray-500 mt-0.5">Collect digital payments during shopping carts</p>
              </div>
              <input 
                type="checkbox"
                checked={stripeEnabled}
                onChange={(e) => setStripeEnabled(e.target.checked)}
                className="w-5 h-5 accent-[var(--primary)] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Operations */}
        <div className="glassmorphism p-6 border border-white/5 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-3 text-[var(--primary)]">
            <Sliders className="w-5 h-5" /> Seating Operations
          </h2>
          <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
            <div>
              <p className="text-sm font-bold">Automated Booking Approval</p>
              <p className="text-xs text-gray-500 mt-0.5">Instantly approve online customer seating requests</p>
            </div>
            <input 
              type="checkbox"
              checked={autoApprove}
              onChange={(e) => setAutoApprove(e.target.checked)}
              className="w-5 h-5 accent-[var(--primary)] cursor-pointer"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSaving}
            className="btn-premium flex items-center gap-2 py-3 px-8 text-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Saving Settings...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
