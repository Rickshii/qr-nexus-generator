import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Redirect() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching from a database
    // In this demo, we check localStorage
    const mappings = JSON.parse(localStorage.getItem('qr_mappings') || '{}');
    const mapping = mappings[id];

    if (mapping) {
      // Small delay for effect
      setTimeout(() => {
        window.location.href = mapping.content;
      }, 1500);
    }
  }, [id]);

  const mappings = JSON.parse(localStorage.getItem('qr_mappings') || '{}');
  const exists = !!mappings[id];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="max-w-md w-full glass-card p-8 rounded-3xl text-center">
        {exists ? (
          <div className="space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl animate-pulse"></div>
              <Loader2 className="w-20 h-20 text-violet-500 animate-spin relative z-10" />
            </div>
            <h1 className="text-2xl font-bold text-white">Redirecting...</h1>
            <p className="text-gray-400">Please wait while we take you to your destination.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-white">QR Code Expired</h1>
            <p className="text-gray-400">This dynamic QR code link is invalid or has expired.</p>
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
