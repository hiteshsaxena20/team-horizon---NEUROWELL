import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, MapPin, BarChart3, MessageSquare, AlertTriangle,
  FileText, Bell, User, LogOut, ChevronDown, Menu, X,
  Compass, Settings, Shield
} from 'lucide-react';

interface LayoutProps {
  onLogout: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/nearby-wells', label: 'Nearby Wells', icon: MapPin },
  { path: '/similar-wells', label: 'Well Analysis', icon: BarChart3 },
  { path: '/ai-assistant', label: 'AI Assistant', icon: MessageSquare },
  { path: '/risk-analysis', label: 'Risk Analysis', icon: AlertTriangle },
  { path: '/decision-support', label: 'Decision Support', icon: Compass },
  { path: '/reports', label: 'Reports', icon: FileText },
];

export default function Layout({ onLogout }: LayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const notifications = [
    { id: 1, text: 'High risk detected in WELL-A02 zone', time: '2 min ago', type: 'warning' },
    { id: 2, text: 'AI analysis complete for Field Alpha', time: '15 min ago', type: 'info' },
    { id: 3, text: 'New similar well identified: WELL-C01', time: '1 hr ago', type: 'success' },
    { id: 4, text: 'Lost circulation event report updated', time: '3 hrs ago', type: 'info' },
  ];

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-navy-700/60 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 text-navy-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-wide">eRTMAC-NWIS</h1>
                <p className="text-[10px] text-navy-300 -mt-0.5 hidden sm:block">Nearby Wells Intelligence</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive || (item.path === '/dashboard' && location.pathname === '/')
                      ? 'bg-cyan-500/15 text-cyan-400'
                      : 'text-navy-300 hover:text-white hover:bg-navy-800'
                  }`
                }
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                className="relative p-2.5 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 transition-colors"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-navy-800 border border-navy-600 rounded-xl shadow-2xl animate-fade-in overflow-hidden">
                  <div className="p-3 border-b border-navy-700">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-3 py-3 border-b border-navy-700/50 hover:bg-navy-700/50 transition-colors cursor-pointer">
                        <p className="text-sm text-navy-100">{n.text}</p>
                        <p className="text-xs text-navy-400 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                className="flex items-center gap-2 p-1.5 pl-2 rounded-lg hover:bg-navy-800 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-navy-900">DR</span>
                </div>
                <span className="text-sm text-navy-200 hidden sm:block">Dr. R. Sharma</span>
                <ChevronDown size={14} className="text-navy-400 hidden sm:block" />
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-navy-800 border border-navy-600 rounded-xl shadow-2xl animate-fade-in overflow-hidden">
                  <div className="p-3 border-b border-navy-700">
                    <p className="text-sm font-semibold text-white">Dr. Rajesh Sharma</p>
                    <p className="text-xs text-navy-400">Senior Drilling Engineer</p>
                  </div>
                  <div className="p-1">
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-navy-300 hover:text-white hover:bg-navy-700 rounded-lg transition-colors">
                      <User size={14} /> Profile
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-navy-300 hover:text-white hover:bg-navy-700 rounded-lg transition-colors">
                      <Settings size={14} /> Settings
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-900 border-t border-navy-700/50 animate-fade-in">
            <nav className="p-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-cyan-500/15 text-cyan-400' : 'text-navy-300 hover:text-white hover:bg-navy-800'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)] bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 w-full">
          <Outlet />
        </div>
      </main>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowNotifications(false); setShowProfile(false); }}
        />
      )}
    </div>
  );
}
