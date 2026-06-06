'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useCartStore, useAuthStore } from '@/store';
import toast from 'react-hot-toast';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const { user, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-[var(--primary)] uppercase">
          Brew <span className="text-[var(--cream)]">&</span> Dine
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium uppercase tracking-widest text-[var(--cream)] hover:text-[var(--primary)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative group">
            <ShoppingBag className="w-6 h-6 text-[var(--cream)] group-hover:text-[var(--primary)] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {mounted && user ? (
            <div className="relative hidden md:block">
              {/* Invisible backdrop closer */}
              {isDropdownOpen && (
                <div 
                  className="fixed inset-0 z-40 cursor-default" 
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}

              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer text-[var(--cream)] hover:text-[var(--primary)] transition-colors py-2 relative z-50"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-semibold tracking-wider max-w-[120px] truncate text-[var(--cream)]">
                  {user.name.split(' ')[0]}
                </span>
              </button>
              
              {/* Glassmorphic Dropdown */}
              <div className={`absolute right-0 top-full mt-2 w-52 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 transition-all duration-300 z-50 shadow-2xl shadow-black/80 ${
                isDropdownOpen 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}>
                <div className="border-b border-white/5 pb-2 mb-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Logged in as</p>
                  <p className="text-sm font-bold text-[var(--cream)] truncate">{user.name}</p>
                  <p className="text-[10px] text-[var(--primary)] font-bold uppercase tracking-wider">{user.role}</p>
                </div>
                <div className="space-y-1">
                  {user.role === 'ADMIN' && (
                    <Link 
                      href="/admin/dashboard" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 text-xs text-amber-400 hover:text-white py-1.5 px-2 rounded hover:bg-white/5 transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                      toast.success('Successfully logged out');
                    }}
                    className="w-full flex items-center gap-2 text-left text-xs text-red-400 hover:text-red-300 py-1.5 px-2 rounded hover:bg-red-500/10 transition-colors font-medium cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <User className="w-6 h-6 text-[var(--cream)] hover:text-[var(--primary)] transition-colors" />
            </Link>
          )}

          <button className="md:hidden text-[var(--cream)]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-[var(--cream)] hover:text-[var(--primary)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {mounted && user ? (
                <>
                  {user.role === 'ADMIN' && (
                    <Link 
                      href="/admin/dashboard" 
                      className="text-lg font-medium text-amber-400 flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      toast.success('Successfully logged out');
                    }}
                    className="text-left text-lg font-medium text-red-400 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout ({user.name.split(' ')[0]})
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="text-lg font-medium text-[var(--primary)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
