import React from 'react';
import { motion } from 'framer-motion';
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: 'default' | 'neon-border';
  onClick?: () => void;
}
export function GlassCard({
  children,
  className = '',
  hoverEffect = false,
  variant = 'default',
  onClick
}: GlassCardProps) {
  return <motion.div whileHover={hoverEffect ? {
    y: -4,
    boxShadow: '0 10px 30px -10px rgba(127, 0, 255, 0.2)'
  } : undefined} transition={{
    duration: 0.2
  }} onClick={onClick} className={`
        relative overflow-hidden rounded-xl backdrop-blur-md
        bg-navy-800/40 border border-white/5
        ${variant === 'neon-border' ? 'hover:border-neon-violet/50' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>;
}