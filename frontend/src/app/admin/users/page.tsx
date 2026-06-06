'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Mail, DollarSign, Calendar } from 'lucide-react';

const MOCK_USERS = [
  { id: 'USR-291', name: 'Jane Doe', email: 'jane@example.com', role: 'CUSTOMER', joined: 'May 10, 2026', spent: 184.50 },
  { id: 'USR-284', name: 'John Smith', email: 'john@example.com', role: 'CUSTOMER', joined: 'May 08, 2026', spent: 96.00 },
  { id: 'USR-110', name: 'Admin User', email: 'admin@cafe.com', role: 'ADMIN', joined: 'Apr 12, 2026', spent: 0.00 },
  { id: 'USR-265', name: 'Alice Johnson', email: 'alice@example.com', role: 'CUSTOMER', joined: 'May 02, 2026', spent: 342.00 },
  { id: 'USR-244', name: 'Bob Roberts', email: 'bob@example.com', role: 'CUSTOMER', joined: 'Apr 28, 2026', spent: 154.00 },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = MOCK_USERS.filter(usr => 
    usr.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    usr.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    usr.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-[var(--cream)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Customer & User Directory</h1>
          <p className="text-gray-400">View and manage registered diner and administrative staff accounts.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search directory..."
              className="bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:border-[var(--primary)] outline-none w-64 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="glassmorphism border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-400">
                <th className="py-4 px-6">User ID</th>
                <th className="py-4 px-6">Profile</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Registered On</th>
                <th className="py-4 px-6 text-right">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((usr, idx) => (
                <motion.tr 
                  key={usr.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors text-sm"
                >
                  <td className="py-4 px-6 font-bold text-gray-500">{usr.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center font-bold text-[var(--primary)] text-sm border border-white/10">
                        {usr.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-[var(--cream)]">{usr.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3 text-[var(--primary)]" /> {usr.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center border text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      usr.role === 'ADMIN' 
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                    }`}>
                      {usr.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-600" /> {usr.joined}</div>
                  </td>
                  <td className="py-4 px-6 text-right font-extrabold text-[var(--primary)]">
                    {usr.role === 'ADMIN' ? '-' : `$${usr.spent.toFixed(2)}`}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-16 text-center">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No customers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
