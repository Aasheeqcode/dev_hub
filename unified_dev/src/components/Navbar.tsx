import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Video, Trophy, Code2, MessageSquare, Bot, Bell, Search, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from './NeonButton';
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [{
    name: 'Home',
    path: '/',
    icon: <Home className="w-5 h-5" />
  }, {
    name: 'Meet',
    path: '/meet',
    icon: <Video className="w-5 h-5" />
  }, {
    name: 'Contests',
    path: '/contests',
    icon: <Trophy className="w-5 h-5" />
  }, {
    name: 'Dev Studio',
    path: '/studio',
    icon: <Code2 className="w-5 h-5" />
  }, {
    name: 'Practice',
    path: '/practice',
    icon: <Code2 className="w-5 h-5" />
  }, {
    name: 'Forum',
    path: '/forum',
    icon: <MessageSquare className="w-5 h-5" />
  }, {
    name: 'AI Chat',
    path: '/chat',
    icon: <Bot className="w-5 h-5" />
  }];
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };
  return <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-navy-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center group-hover:shadow-neon-violet transition-all duration-300">
              <span className="font-mono font-bold text-white text-lg">
                &lt;/&gt;
              </span>
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-white">
              Dev<span className="text-neon-blue">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`
                  relative px-3 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors
                  ${isActive(item.path) ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}>
                {item.icon}
                <span>{item.name}</span>
                {isActive(item.path) && <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-violet to-neon-blue" />}
              </Link>)}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
              </div>
              <input type="text" placeholder="Search..." className="block w-64 pl-10 pr-3 py-1.5 border border-white/10 rounded-full leading-5 bg-navy-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-navy-800 focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 sm:text-sm transition-all duration-300" />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-neon-violet ring-2 ring-navy-900" />
            </button>

            {/* Profile */}
            <Link to="/profile">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue p-[1px] cursor-pointer hover:shadow-neon-blue transition-all">
                <div className="h-full w-full rounded-full bg-navy-900 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden border-t border-white/5 bg-navy-900/95 backdrop-blur-xl overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`
                    block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3
                    ${isActive(item.path) ? 'text-white bg-white/10 border-l-2 border-neon-blue' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>)}
              <div className="pt-4 pb-2 border-t border-white/5">
                <div className="flex items-center px-3 space-x-3">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full border border-white/10" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="" />
                  </div>
                  <div>
                    <div className="text-base font-medium leading-none text-white">
                      Alex Coder
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400 mt-1">
                      alex@devhub.io
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
}