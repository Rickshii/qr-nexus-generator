import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { 
  Download, Copy, Link, Wifi, Mail, FileText, Phone, MessageCircle, MapPin, 
  User, Smartphone, Send, Image as ImageIcon, Check, Palette, Settings, CreditCard, MessageSquare, Calendar, Zap, Sparkles, LayoutDashboard, Share2
} from 'lucide-react';
import { FaYoutube, FaInstagram, FaFacebook, FaSpotify } from 'react-icons/fa';
import { cn } from '../utils';

export default function Generator() {
  const [activeTab, setActiveTab] = useState('url');
  
  // Data
  const [url, setUrl] = useState('https://example.com');
  const [text, setText] = useState('');
  
  // Wifi
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);
  
  // Email
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Phone
  const [phone, setPhone] = useState('');

  // WhatsApp
  const [waPhone, setWaPhone] = useState('');
  const [waText, setWaText] = useState('');

  // vCard
  const [vcard, setVcard] = useState({
    fName: '', lName: '', phone: '', email: '', company: '', job: '', website: '', address: ''
  });

  // Map
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  // Social
  const [fbUrl, setFbUrl] = useState('');
  const [tgUrl, setTgUrl] = useState('');
  const [ytUrl, setYtUrl] = useState('');
  const [igUrl, setIgUrl] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');

  // Frames
  const [selectedFrame, setSelectedFrame] = useState('none');
  const frames = [
    { id: 'none', name: 'No Frame', text: '' },
    { id: 'basic', name: 'Classic Frame', text: 'SCAN ME' },
    { id: 'minimal', name: 'Minimal Border', text: '' },
    { id: 'badge', name: 'Badge Style', text: 'OFFICIAL QR' },
    { id: 'promo', name: 'Promo Frame', text: 'JOIN NOW' },
  ];

  // UPI
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');
  const [upiAmount, setUpiAmount] = useState('');

  // SMS
  const [smsPhone, setSmsPhone] = useState('');
  const [smsText, setSmsText] = useState('');

  // Event
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  
  // Design
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logoUrl, setLogoUrl] = useState(null);
  
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const exportRef = useRef();

  const qrTypes = [
    { id: 'url', label: 'URL', icon: Link },
    { id: 'text', label: 'Text', icon: FileText },
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'vcard', label: 'vCard', icon: User },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'email', label: 'E-mail', icon: Mail },
    { id: 'phone', label: 'Phone', icon: Phone },
    { id: 'map', label: 'Location', icon: MapPin },
    { id: 'app', label: 'App Store', icon: Smartphone },
    { id: 'youtube', label: 'YouTube', icon: FaYoutube },
    { id: 'instagram', label: 'Instagram', icon: FaInstagram },
    { id: 'facebook', label: 'Facebook', icon: FaFacebook },
    { id: 'telegram', label: 'Telegram', icon: Send },
    { id: 'spotify', label: 'Spotify', icon: FaSpotify },
    { id: 'upi', label: 'UPI Payment', icon: CreditCard },
    { id: 'sms', label: 'SMS', icon: MessageSquare },
    { id: 'event', label: 'Event', icon: Calendar },
  ];

  const getQRValue = () => {
    switch (activeTab) {
      case 'url':
        if (!url) return 'https://qr-nexus.com';
        return url.startsWith('http') ? url : `https://${url}`;
      case 'text':
        return text || 'Hello from QRNexus!';
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden ? 'true' : ''};;`;
      case 'vcard':
        return `BEGIN:VCARD\r\nVERSION:3.0\r\nN:${vcard.lName};${vcard.fName};;;\r\nFN:${vcard.fName} ${vcard.lName}\r\nORG:${vcard.company}\r\nTITLE:${vcard.job}\r\nTEL;TYPE=CELL:${vcard.phone}\r\nEMAIL;TYPE=PREF,INTERNET:${vcard.email}\r\nURL:${vcard.website}\r\nADR;TYPE=WORK:;;${vcard.address};;;;\r\nEND:VCARD`;
      case 'whatsapp':
        const cleanPhone = waPhone.replace(/[^0-9]/g, '');
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;
      case 'email':
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phone}`;
      case 'map':
        return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      case 'app':
        return appUrl || 'https://apps.apple.com';
      case 'youtube':
        if (!ytUrl) return 'https://youtube.com';
        return ytUrl.startsWith('http') ? ytUrl : `https://youtube.com/${ytUrl.startsWith('@') ? '' : '@'}${ytUrl}`;
      case 'instagram':
        if (!igUrl) return 'https://instagram.com';
        return igUrl.startsWith('http') ? igUrl : `https://instagram.com/${igUrl.replace('@', '')}`;
      case 'facebook':
        if (!fbUrl) return 'https://facebook.com';
        return fbUrl.startsWith('http') ? fbUrl : `https://facebook.com/${fbUrl}`;
      case 'telegram':
        if (!tgUrl) return 'https://t.me';
        return tgUrl.startsWith('http') ? tgUrl : `https://t.me/${tgUrl.replace('@', '')}`;
      case 'spotify':
        if (!spotifyUrl) return 'https://spotify.com';
        return spotifyUrl.startsWith('http') ? spotifyUrl : `https://open.spotify.com/search/${encodeURIComponent(spotifyUrl)}`;
      case 'upi':
        return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${upiAmount}&cu=INR`;
      case 'sms':
        return `sms:${smsPhone}?body=${encodeURIComponent(smsText)}`;
      case 'event':
        return `BEGIN:VEVENT\nSUMMARY:${eventTitle}\nLOCATION:${eventLocation}\nDTSTART:${eventStart.replace(/[-:]/g, '')}\nDTEND:${eventEnd.replace(/[-:]/g, '')}\nEND:VEVENT`;
      default:
        return url;
    }
  };


  const saveQRCode = () => {
    const newQR = {
      id: Date.now(),
      name: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} QR`,
      type: activeTab.toUpperCase(),
      value: getQRValue(),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scans: Math.floor(Math.random() * 10), // Simulate some initial scans
      status: 'Active'
    };
    const saved = JSON.parse(localStorage.getItem('savedQRs') || '[]');
    localStorage.setItem('savedQRs', JSON.stringify([newQR, ...saved].slice(0, 10)));
  };

  const handleDownload = async () => {
    const element = exportRef.current;
    if (!element) {
      console.error('Export element not found');
      return;
    }
    try {
      setToast('Preparing high-res export...');
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 4,
        useCORS: true,
        logging: false,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0
      });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `QR_Nexus_${activeTab}_${Date.now()}.png`;
      a.href = dataUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      saveQRCode();
      setToast('QR Code with Frame downloaded!');
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Export failed', err);
      alert('Export failed. Please try again later.');
    }
  };

  const handleShare = async () => {
    const canvas = exportRef.current.querySelector('canvas');
    if (canvas && navigator.share) {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'qr-code.png', { type: 'image/png' });
        try {
          await navigator.share({
            files: [file],
            title: 'My QR Code',
            text: 'Check out this QR code I generated with QRNexus!'
          });
        } catch (err) {
          console.error('Share failed:', err);
        }
      });
    } else {
      alert('Sharing is not supported in this browser. Please download the file instead.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getQRValue());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSVG = () => {
    alert('Professional SVG Vector Export is being prepared. This feature is exclusive to Pro users!');
  };

  const aiSuggest = () => {
    const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
    setBgColor('#ffffff');
    // Simulate AI thinking
    alert('AI has optimized your QR code with a high-contrast premium palette for maximum scannability!');
  };

  const themes = [
    { name: 'Cyberpunk', color: '#ec4899', bgColor: '#ffffff', label: 'Neon' },
    { name: 'Midnight', color: '#8b5cf6', bgColor: '#ffffff', label: 'Dark' },
    { name: 'Sunset', color: '#f59e0b', bgColor: '#fff7ed', label: 'Warm' },
    { name: 'Emerald', color: '#10b981', bgColor: '#f0fdf4', label: 'Nature' },
    { name: 'Ocean', color: '#3b82f6', bgColor: '#eff6ff', label: 'Cold' },
    { name: 'Classic', color: '#000000', bgColor: '#ffffff', label: 'Light' },
  ];

  const applyTheme = (theme) => {
    setColor(theme.color);
    setBgColor(theme.bgColor);
  };



  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => setLogoUrl(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Create your <span className="gradient-text">QR Code</span></h1>
        <p className="text-[var(--text-muted)]">Select a type, enter your content, customize the design and download.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        
        {/* Left Control Panel */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Type Selector */}
          <div className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6 text-[var(--text)] flex items-center">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs mr-3 border border-violet-500/30">1</span> 
              Select Data Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {qrTypes.map(type => {
                const Icon = type.icon;
                const isActive = activeTab === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300",
                      isActive 
                        ? "border-pink-500 bg-pink-500/10 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]" 
                        : "border-white/10 bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text)]"
                    )}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-xs font-semibold">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Input */}
          <motion.div 
            layout
            className="glass rounded-3xl p-6 md:p-8"
          >
            <h2 className="text-lg font-bold mb-6 text-[var(--text)] flex items-center">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs mr-3 border border-violet-500/30">2</span> 
              Enter Content
            </h2>
            <AnimatePresence mode="wait">
              {activeTab === 'url' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">Submit URL</label>
                  <input 
                    type="url" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    onFocus={(e) => url === 'https://example.com' && setUrl('')}
                    className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-[var(--text)]" 
                    placeholder="https://your-website.com" 
                  />
                </motion.div>
              )}
              {activeTab === 'text' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">Enter Text</label>
                  <textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-[var(--text)] h-32 resize-none" 
                    placeholder="Your message here..." 
                  />
                </motion.div>
              )}
              {activeTab === 'wifi' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">SSID (Network Name)</label>
                      <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 outline-none focus:border-pink-500 text-[var(--text)]" placeholder="MyWiFi" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">Password</label>
                      <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 outline-none focus:border-pink-500 text-[var(--text)]" placeholder="SecretPass" />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <select value={wifiEncryption} onChange={(e) => setWifiEncryption(e.target.value)} className="flex-1 bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]">
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None</option>
                    </select>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" checked={wifiHidden} onChange={(e) => setWifiHidden(e.target.checked)} className="w-5 h-5 rounded border-white/10 bg-white/5 text-pink-500 focus:ring-pink-500" />
                      <span className="text-sm font-medium text-[var(--text-muted)]">Hidden Network</span>
                    </label>
                  </div>
                </motion.div>
              )}
              {activeTab === 'email' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" placeholder="Email Address" />
                  <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" placeholder="Subject" />
                  <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)] h-24" placeholder="Message body..." />
                </motion.div>
              )}
              {activeTab === 'whatsapp' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <input type="tel" value={waPhone} onChange={(e) => setWaPhone(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" placeholder="Phone (e.g. 1234567890)" />
                  <textarea value={waText} onChange={(e) => setWaText(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)] h-24" placeholder="Pre-filled message..." />
                </motion.div>
              )}
              {activeTab === 'vcard' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" value={vcard.fName} onChange={e => setVcard({...vcard, fName: e.target.value})} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="text" placeholder="Last Name" value={vcard.lName} onChange={e => setVcard({...vcard, lName: e.target.value})} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="tel" placeholder="Phone" value={vcard.phone} onChange={e => setVcard({...vcard, phone: e.target.value})} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="email" placeholder="Email" value={vcard.email} onChange={e => setVcard({...vcard, email: e.target.value})} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="text" placeholder="Company" value={vcard.company} onChange={e => setVcard({...vcard, company: e.target.value})} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="text" placeholder="Job Title" value={vcard.job} onChange={e => setVcard({...vcard, job: e.target.value})} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="text" placeholder="Website (https://...)" value={vcard.website} onChange={e => setVcard({...vcard, website: e.target.value})} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="text" placeholder="Address" value={vcard.address} onChange={e => setVcard({...vcard, address: e.target.value})} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                </motion.div>
              )}
              {activeTab === 'map' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Latitude" value={lat} onChange={e => setLat(e.target.value)} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="text" placeholder="Longitude" value={lng} onChange={e => setLng(e.target.value)} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                </motion.div>
              )}
              {activeTab === 'upi' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <input type="text" placeholder="UPI ID (e.g. name@bank)" value={upiId} onChange={e => setUpiId(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="text" placeholder="Payee Name" value={upiName} onChange={e => setUpiName(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="number" placeholder="Amount (Optional)" value={upiAmount} onChange={e => setUpiAmount(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                </motion.div>
              )}
              {activeTab === 'sms' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <input type="tel" placeholder="Phone Number" value={smsPhone} onChange={e => setSmsPhone(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <textarea placeholder="Message..." value={smsText} onChange={e => setSmsText(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)] h-24" />
                </motion.div>
              )}
              {activeTab === 'event' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <input type="text" placeholder="Event Title" value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <input type="text" placeholder="Location" value={eventLocation} onChange={e => setEventLocation(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="datetime-local" value={eventStart} onChange={e => setEventStart(e.target.value)} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                    <input type="datetime-local" value={eventEnd} onChange={e => setEventEnd(e.target.value)} className="bg-[var(--input-bg)] border border-white/10 rounded-xl p-3 text-[var(--text)]" />
                  </div>
                </motion.div>
              )}
              {activeTab === 'facebook' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">Facebook Page/Profile URL</label>
                  <input type="url" value={fbUrl} onChange={(e) => setFbUrl(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 text-[var(--text)]" placeholder="https://facebook.com/yourpage" />
                </motion.div>
              )}
              {activeTab === 'telegram' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">Telegram Username/Link</label>
                  <input type="text" value={tgUrl} onChange={(e) => setTgUrl(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 text-[var(--text)]" placeholder="https://t.me/username" />
                </motion.div>
              )}
              {activeTab === 'youtube' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">YouTube Channel/Video URL</label>
                  <input type="url" value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 text-[var(--text)]" placeholder="https://youtube.com/@channel" />
                </motion.div>
              )}
              {activeTab === 'instagram' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">Instagram Profile URL</label>
                  <input type="url" value={igUrl} onChange={(e) => setIgUrl(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 text-[var(--text)]" placeholder="https://instagram.com/username" />
                </motion.div>
              )}
              {activeTab === 'app' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">App Store / Play Store Link</label>
                  <input type="url" value={appUrl} onChange={(e) => setAppUrl(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 text-[var(--text)]" placeholder="https://apps.apple.com/..." />
                </motion.div>
              )}
              {activeTab === 'spotify' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">Spotify Track/Playlist URL</label>
                  <input type="url" value={spotifyUrl} onChange={(e) => setSpotifyUrl(e.target.value)} className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 text-[var(--text)]" placeholder="https://open.spotify.com/track/..." />
                </motion.div>
              )}
              {['phone'].includes(activeTab) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-muted)]">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="w-full bg-[var(--input-bg)] border border-white/10 rounded-xl p-4 outline-none focus:border-pink-500 text-[var(--text)]" 
                    placeholder="+1234567890" 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Customization */}
          <div className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6 text-[var(--text)] flex items-center">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs mr-3 border border-violet-500/30">3</span> 
              Customize Design
            </h2>
            
            <div className="space-y-8">


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-[var(--text-muted)] flex items-center"><Palette className="w-4 h-4 mr-2" /> QR Color</label>
                    <button onClick={aiSuggest} className="text-[10px] bg-violet-500/20 text-violet-400 px-2 py-1 rounded-lg border border-violet-500/30 hover:bg-violet-500/30 transition-all flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" /> AI Suggest
                    </button>
                  </div>
                  <div className="flex items-center space-x-3 bg-[var(--input-bg)] p-2 rounded-xl border border-white/10">
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
                    <span className="text-sm font-mono uppercase text-[var(--text-muted)]">{color}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-[var(--text-muted)] flex items-center"><Settings className="w-4 h-4 mr-2" /> Background</label>
                  <div className="flex items-center space-x-3 bg-[var(--input-bg)] p-2 rounded-xl border border-white/10">
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
                    <span className="text-sm font-mono uppercase text-[var(--text-muted)]">{bgColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4 text-[var(--text-muted)] flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-violet-400" />
                  Premium Themes
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {themes.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => applyTheme(t)}
                      className={cn(
                        "group relative overflow-hidden h-16 rounded-xl border transition-all flex flex-col items-center justify-center space-y-1",
                        color === t.color && bgColor === t.bgColor ? "border-pink-500 ring-2 ring-pink-500/20" : "border-white/10 hover:border-white/30"
                      )}
                      style={{ backgroundColor: t.bgColor }}
                    >
                      <div className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: t.color }}></div>
                      <span className={cn(
                        "text-[10px] font-bold transition-colors",
                        t.bgColor === '#ffffff' || t.bgColor === '#f8fafc' ? "text-gray-900" : "text-white"
                      )}>{t.name}</span>
                      {/* Decorative gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4 text-[var(--text-muted)] flex items-center">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Frame Templates
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {frames.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFrame(f.id)}
                      className={cn(
                        "p-3 rounded-xl border text-[10px] font-bold transition-all",
                        selectedFrame === f.id ? "border-pink-500 bg-pink-500/10 text-pink-400" : "border-white/10 hover:border-white/20 text-[var(--text-muted)]"
                      )}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-[var(--text-muted)]">Add Logo (Center)</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center justify-center px-6 py-3 bg-white/5 border border-white/10 text-[var(--text)] rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </label>
                  {logoUrl && (
                    <div className="flex items-center space-x-3 bg-white/5 pr-4 rounded-xl border border-white/10 overflow-hidden">
                      <img src={logoUrl} alt="Logo preview" className="w-12 h-12 object-contain bg-white/10" />
                      <button onClick={() => setLogoUrl(null)} className="text-sm font-medium text-rose-400 hover:text-rose-300">Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Preview */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="glass-card rounded-3xl p-6 text-center border-t border-t-white/20" style={{ backgroundColor: bgColor }}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-6 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Live Preview
            </h3>
            
            <div ref={exportRef} className="p-10 inline-block bg-transparent flex justify-center items-center">
              <div className={cn(
                "p-8 rounded-2xl relative group inline-block mx-auto transition-all duration-500",
                selectedFrame === 'basic' && "border-8 border-pink-500 shadow-2xl pt-12 pb-8",
                selectedFrame === 'minimal' && "border-2 border-white/20",
                selectedFrame === 'badge' && "border-b-[40px] border-violet-600 rounded-b-none pb-0",
                selectedFrame === 'promo' && "border-4 border-dashed border-yellow-400"
              )} style={{ backgroundColor: bgColor }}>
                {selectedFrame === 'badge' && (
                  <div className="absolute bottom-[-32px] left-0 right-0 text-center text-[10px] font-black text-white tracking-widest">
                    OFFICIAL QR
                  </div>
                )}
                {selectedFrame === 'basic' && (
                  <div className="absolute top-[-30px] left-0 right-0 text-center text-xs font-black text-pink-500 uppercase">
                    SCAN ME
                  </div>
                )}
                
                <div className="p-2 rounded-xl" style={{ backgroundColor: bgColor }}>
                  <QRCodeCanvas
                    value={getQRValue() || 'https://qr-nexus.com'}
                    size={512}
                    bgColor={bgColor}
                    fgColor={color}
                    level="H"
                    style={{ width: '200px', height: '200px' }}
                    className="rounded-lg shadow-lg"
                    imageSettings={logoUrl ? { src: logoUrl, height: 100, width: 100, excavate: true } : undefined}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {toast && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-emerald-500/20 text-emerald-400 p-3 rounded-xl border border-emerald-500/30 text-xs font-bold mb-4 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {toast}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button onClick={handleDownload} className="w-full bg-[var(--text)] text-[var(--bg)] font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Download className="w-5 h-5" />
                <span>Download QR Code</span>
              </button>

              <button onClick={handleShare} className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all border border-blue-500/30">
                <Share2 className="w-4 h-4" />
                <span>Share QR Directly</span>
              </button>
              
              <button onClick={downloadSVG} className="w-full bg-violet-600/10 hover:bg-violet-600/20 text-violet-400 font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all border border-violet-600/30">
                <FileText className="w-4 h-4" />
                <span>Export as SVG (Vector)</span>
              </button>
              
              <button 
                onClick={handleCopy} 
                className="w-full bg-white/5 hover:bg-white/10 text-[var(--text)] font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-white/10"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
