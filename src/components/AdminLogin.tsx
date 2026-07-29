import React from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStorefront: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStorefront }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@jiaddah.com' && password === 'admin123') {
      onLoginSuccess();
    } else {
      setError('Invalid executive credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-4 font-poppins text-left">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/30 shadow-2xl space-y-6 relative overflow-hidden">
        
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F4E8C1] flex items-center justify-center text-white font-playfair font-bold text-2xl mx-auto shadow-md">
            M
          </div>
          <h2 className="font-playfair text-2xl font-bold text-[#2C2C2C]">
            Admin Concierge Login
          </h2>
          <p className="text-xs text-gray-500 font-light">
            Modest & Modern By Jiaddah Executive Portal
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs" autoComplete="off">
          <div>
            <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email..."
                autoComplete="off"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] outline-none"
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#2C2C2C] mb-2 uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                autoComplete="current-password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] outline-none"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#AA8B22] text-white text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-xl hover:brightness-105 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <button
            onClick={onBackToStorefront}
            className="hover:text-[#D4AF37] underline cursor-pointer"
          >
            Back to Public Storefront
          </button>

          <div className="flex items-center space-x-1 text-[10px] text-emerald-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted Portal</span>
          </div>
        </div>

      </div>
    </div>
  );
};
