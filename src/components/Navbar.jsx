import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCode, Menu, X, Sparkles, LayoutDashboard, Sun, Moon, Zap, Flower2, Cloud, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { cn } from '../utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const themes = ['dark', 'light', 'cyber', 'aura', 'forest'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Generator', path: '/generator' },
  ];

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
      scrolled ? "bg-[var(--bg)]/80 backdrop-blur-xl border-white/10 py-3" : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-tr from-violet-600 to-pink-500 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-500/20">
            <QrCode className="w-6 h-6 text-[var(--text)]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--text)]">QR<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Nexus</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            link.path.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[var(--text)] text-[var(--text-muted)]"
                )}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[var(--text)]",
                  location.pathname === link.path ? "text-[var(--text)]" : "text-[var(--text-muted)]"
                )}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-white/10 rounded-xl transition-all text-[var(--text-muted)] hover:text-[var(--text)] border border-white/5"
            title="Switch Theme"
          >
            {theme === 'dark' && <Moon className="w-5 h-5" />}
            {theme === 'light' && <Sun className="w-5 h-5 text-yellow-500" />}
            {theme === 'cyber' && <Zap className="w-5 h-5 text-cyan-400" />}
            {theme === 'aura' && <Flower2 className="w-5 h-5 text-pink-400" />}
            {theme === 'forest' && <Cloud className="w-5 h-5 text-emerald-400" />}
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors flex items-center space-x-1">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/generator" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></span>
              <div className="relative bg-[var(--bg)] px-5 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 group-hover:bg-opacity-0">
                <Sparkles className="w-4 h-4 text-pink-400 group-hover:text-[var(--text)] transition-colors" />
                <span className="text-sm font-bold text-[var(--text)]">Create QR</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[var(--text)]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4"
        >
          {links.map((link) => (
            <Link key={link.name} to={link.path} className="text-lg font-medium text-[var(--text-muted)] hover:text-pink-500 transition-colors flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
              <span>{link.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-50" />
            </Link>
          ))}
          <div className="h-px w-full bg-white/10 my-2"></div>
          <Link to="/dashboard" className="text-lg font-medium text-[var(--text-muted)]" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          <Link to="/generator" className="bg-gradient-to-r from-violet-600 to-pink-600 text-[var(--text)] font-bold py-3 rounded-xl text-center" onClick={() => setMobileMenuOpen(false)}>
            Create QR
          </Link>
        </motion.div>
      )}
    </header>
  );
}
