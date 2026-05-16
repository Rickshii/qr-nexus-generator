import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, QrCode, Users, ArrowUpRight, Clock, MoreVertical, Download, ExternalLink, Trash2, Plus, MapPin, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils';

export default function Dashboard() {
  const [savedQRs, setSavedQRs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedQRs') || '[]');
    setSavedQRs(saved);
  }, []);

  const stats = [
    { title: 'Total Scans', value: savedQRs.reduce((acc, qr) => acc + (qr.scans || 0), 0).toLocaleString(), change: '+14.5%', icon: BarChart3 },
    { title: 'Active QRs', value: savedQRs.length.toString(), change: `+${savedQRs.length > 0 ? 1 : 0}`, icon: QrCode },
    { title: 'Top Location', value: 'New York, US', change: 'Live', icon: MapPin },
  ];

  const devices = [
    { name: 'iPhone', value: 45, color: 'bg-violet-500' },
    { name: 'Android', value: 38, color: 'bg-pink-500' },
    { name: 'Desktop', value: 17, color: 'bg-emerald-500' },
  ];

  const handleDelete = (id) => {
    const updated = savedQRs.filter(qr => qr.id !== id);
    setSavedQRs(updated);
    localStorage.setItem('savedQRs', JSON.stringify(updated));
  };

  const handleDownload = (qr) => {
    // In a real app, we'd regenerate the canvas or use the stored image
    // For now, we'll alert the user we're preparing their download
    alert(`Downloading ${qr.name}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Rick!</h1>
          <p className="text-[var(--text-muted)]">Here's what's happening with your QR codes today.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors">
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass p-6 rounded-2xl border border-white/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl text-pink-400">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {stat.change}
              </span>
            </div>
            <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-[var(--text)]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-3xl p-8 border border-white/5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center">
              <Globe className="w-5 h-5 mr-2 text-pink-500" />
              Scan Heatmap
            </h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[var(--text-muted)] border border-white/10">Global</span>
            </div>
          </div>
          
          <div className="h-[250px] relative flex items-center justify-center">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-contain bg-no-repeat bg-center invert grayscale brightness-150"></div>
            
            {/* Pulsing Scan Locations */}
            <div className="absolute top-[35%] left-[25%]">
              <div className="w-3 h-3 bg-pink-500 rounded-full relative">
                <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            <div className="absolute top-[45%] right-[35%]">
              <div className="w-3 h-3 bg-violet-500 rounded-full relative">
                <div className="absolute inset-0 bg-violet-500 rounded-full animate-ping opacity-75 animation-delay-1000"></div>
              </div>
            </div>
            <div className="absolute bottom-[25%] left-[45%]">
              <div className="w-3 h-3 bg-emerald-500 rounded-full relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75 animation-delay-2000"></div>
              </div>
            </div>
            
            <div className="relative z-10 text-center bg-[var(--bg)]/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
              <p className="text-[var(--text)] font-black text-xl mb-1">LIVE ACTIVITY</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[var(--text-muted)] text-sm font-medium tracking-wider">3 GLOBAL SCANS DETECTED</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 border border-white/5"
        >
          <h2 className="text-xl font-bold mb-8 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-violet-500" />
            Device Usage
          </h2>
          <div className="space-y-6">
            {devices.map((device) => (
              <div key={device.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-[var(--text)]">{device.name}</span>
                  <span className="text-[var(--text-muted)]">{device.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${device.value}%` }}
                    className={cn("h-full rounded-full", device.color)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Most of your scans are coming from <span className="text-pink-400 font-bold">iPhone</span> in North America.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl border border-white/5 overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[var(--text)]">Your QR History</h2>
          <Link to="/generator" className="text-sm bg-pink-500 hover:bg-pink-600 text-[var(--text)] px-4 py-2 rounded-lg font-bold flex items-center space-x-2 transition-all">
            <Plus className="w-4 h-4" />
            <span>Create New</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          {savedQRs.length === 0 ? (
            <div className="p-20 text-center">
              <QrCode className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-muted)] mb-2">No QR codes yet</h3>
              <p className="text-gray-600 mb-6">Create your first QR code to see it appear here.</p>
              <Link to="/generator" className="text-pink-400 hover:text-pink-300 font-bold underline">Go to Generator</Link>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[var(--text-muted)] text-sm">
                  <th className="p-6 font-medium">Name</th>
                  <th className="p-6 font-medium">Type</th>
                  <th className="p-6 font-medium">Scans</th>
                  <th className="p-6 font-medium">Created</th>
                  <th className="p-6 font-medium">Status</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {savedQRs.map((qr) => (
                  <tr key={qr.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6 font-medium flex items-center space-x-3 text-[var(--text)]">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-pink-400" />
                      </div>
                      <span>{qr.name}</span>
                    </td>
                    <td className="p-6 text-[var(--text-muted)]">
                      <span className="bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10 uppercase">{qr.type}</span>
                    </td>
                    <td className="p-6 font-mono text-[var(--text-muted)]">{qr.scans}</td>
                    <td className="p-6 text-[var(--text-muted)] flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="whitespace-nowrap">{qr.date}</span>
                    </td>
                    <td className="p-6">
                      <span className="flex items-center space-x-2 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>{qr.status}</span>
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleDownload(qr)}
                          className="p-2 hover:bg-white/10 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(qr.id)}
                          className="p-2 hover:bg-white/10 rounded-lg text-rose-400 hover:text-rose-300 transition-colors"
                          title="Delete"
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
      </motion.div>
    </div>
  );
}
