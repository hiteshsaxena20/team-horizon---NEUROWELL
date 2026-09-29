import { useState } from 'react';
import { Shield, Eye, EyeOff, ChevronRight, Droplets, Activity } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  const handleDemo = () => {
    setEmail('demo@ertmac-nwis.gov.in');
    setPassword('demo123');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 opacity-10">
          <Droplets size={40} className="text-cyan-400" />
        </div>
        <div className="absolute bottom-32 right-32 opacity-10">
          <Activity size={40} className="text-cyan-400" />
        </div>
        {/* Floating circles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-cyan-500/10"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              top: `${15 + i * 12}%`,
              left: `${5 + i * 15}%`,
              animation: `pulse ${3 + i}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="glass-card p-8 sm:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 mb-4 shadow-lg shadow-cyan-500/20">
              <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">eRTMAC-NWIS</h1>
            <p className="text-sm text-navy-300 mt-1.5 leading-relaxed">
              Nearby Wells Intelligence &<br />Decision Support System
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-navy-600" />
              <span className="text-[10px] tracking-[0.2em] text-navy-500 uppercase">SIH26121</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-navy-600" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-navy-300 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineer@ertmac-nwis.gov.in"
                className="w-full px-4 py-3 bg-navy-900/80 border border-navy-600/50 rounded-xl text-sm text-white placeholder-navy-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-navy-900/80 border border-navy-600/50 rounded-xl text-sm text-white placeholder-navy-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ChevronRight size={16} />
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-navy-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-navy-800/50 text-navy-500">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemo}
              disabled={loading}
              className="w-full py-3 bg-navy-800 hover:bg-navy-700 border border-navy-600/50 text-navy-200 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Activity size={16} className="text-cyan-400" />
              Demo Login
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-navy-500 leading-relaxed">
              AI-Powered Drilling Decision Support Platform
            </p>
            <p className="text-[10px] text-navy-600 mt-1">
              Smart India Hackathon 2024 • Team Horizon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
