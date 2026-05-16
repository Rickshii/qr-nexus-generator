import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, BarChart3, ArrowRight, LayoutDashboard } from 'lucide-react';
import { cn } from '../utils';
import { QRCodeCanvas } from 'qrcode.react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between z-10 overflow-visible">
        {/* Background Blobs Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-600/30 rounded-full blur-[128px] animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-600/30 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-[var(--text-muted)]">The Future of QR Codes is Here</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Create <span className="gradient-text">Dynamic</span><br/> QR Codes in Seconds
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[var(--text-muted)] mb-10 max-w-2xl mx-auto lg:mx-0"
          >
            Design, manage, and track beautiful AI-powered QR codes for your brand. Elevate your marketing with our premium creation suite.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link to="/generator" className="glow-border w-full sm:w-auto">
              <button className="w-full bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <span>Start Creating For Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-white/5 border border-white/10 text-[var(--text)] font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center">
              Explore Features
            </a>
          </motion.div>
        </div>

        {/* Floating 3D Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 mt-16 lg:mt-0 relative"
        >
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 glass-card rounded-3xl p-8 max-w-md mx-auto"
            style={{ transform: 'perspective(1000px) rotateY(-15deg) rotateX(10deg)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-pink-500/20 rounded-3xl blur-xl -z-10"></div>
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs font-semibold text-[var(--text-muted)]">Preview</div>
              </div>
              <div className="flex justify-center bg-gray-50 rounded-xl p-8">
                <QRCodeCanvas 
                  value="https://example.com" 
                  size={200}
                  fgColor="#8b5cf6"
                  bgColor="#ffffff"
                  level="H"
                />
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">Powerful tools packed into a beautiful, easy-to-use interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Generate QR codes instantly with our highly optimized edge network.' },
              { icon: Sparkles, title: 'AI Powered Design', desc: 'Let our AI suggest the best colors and styles for your brand automatically.' },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Track scans, locations, devices and more in real-time.' },
              { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption and secure dynamic routing for all your links.' },
              { icon: LayoutDashboard, title: 'Multiple Types', desc: 'Support for URL, vCard, WiFi, Email, SMS, Crypto and 10+ more formats.' },
              { icon: ArrowRight, title: 'Custom Export', desc: 'Download in ultra high-res PNG, SVG or PDF for print-ready quality.' }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Link 
                  to="/generator"
                  key={i}
                  className="block"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-8 rounded-3xl hover:bg-white/10 transition-all group h-full border border-white/5 hover:border-pink-500/30"
                  >
                    <div className="bg-gradient-to-br from-violet-500/20 to-pink-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--text)]">{feature.title}</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">{feature.desc}</p>
                    <div className="mt-6 flex items-center text-pink-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Try it now</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <PricingSection />
    </div>
  );
}

{/* Pricing Section */}
function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative z-10 bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">Choose the plan that fits your needs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Free', price: '$0', features: ['Unlimited Static QRs', 'Standard Customization', 'PNG Export'], button: 'Get Started' },
            { title: 'Pro', price: '$19', features: ['Everything in Free', 'Dynamic QRs', 'Advanced Analytics', 'SVG/PDF Export'], button: 'Go Pro', premium: true },
            { title: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'White-labeling', 'API Access', '24/7 Support'], button: 'Contact Us' }
          ].map((plan, i) => (
            <div key={i} className={cn(
              "glass p-8 rounded-3xl border transition-all flex flex-col",
              plan.premium ? "border-pink-500 bg-pink-500/5 scale-105" : "border-white/10 hover:border-white/20"
            )}>
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal text-[var(--text-muted)]">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-[var(--text-muted)] flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-pink-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={cn(
                "w-full py-4 rounded-xl font-bold transition-all",
                plan.premium ? "bg-white text-black hover:bg-gray-100" : "bg-white/10 text-[var(--text)] hover:bg-white/20"
              )}>
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
