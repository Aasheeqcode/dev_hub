import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlassCard } from './GlassCard';
interface SidebarItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string;
}
interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  className?: string;
}
export function Sidebar({
  items,
  title,
  className = ''
}: SidebarProps) {
  const location = useLocation();
  return <div className={`space-y-4 ${className}`}>
      {title && <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          {title}
        </h3>}
      <div className="space-y-1">
        {items.map(item => {
        const isActive = location.pathname === item.path;
        return <Link key={item.name} to={item.path} className={`
                group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive ? 'bg-gradient-to-r from-neon-violet/20 to-transparent text-white border-l-2 border-neon-violet' : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}>
              <div className="flex items-center">
                {item.icon && <span className={`mr-3 ${isActive ? 'text-neon-violet' : 'text-gray-500 group-hover:text-white'}`}>
                    {item.icon}
                  </span>}
                <span>{item.name}</span>
              </div>
              {item.badge && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-white">
                  {item.badge}
                </span>}
            </Link>;
      })}
      </div>
    </div>;
}