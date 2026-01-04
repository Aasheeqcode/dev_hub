import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  glow?: boolean;
  icon?: React.ReactNode;
}
export function NeonButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  glow = true,
  icon,
  ...props
}: NeonButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';
  const variants = {
    primary: 'bg-gradient-to-r from-neon-violet to-neon-blue text-white border border-transparent hover:shadow-neon-violet',
    secondary: 'bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:border-white/20 backdrop-blur-md',
    outline: 'bg-transparent text-white border border-neon-blue/50 hover:border-neon-blue hover:shadow-neon-blue text-neon-blue',
    ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base'
  };
  return <motion.button whileHover={{
    scale: 1.02
  }} whileTap={{
    scale: 0.98
  }} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}
      <span className="relative z-10">{children}</span>

      {/* Glow effect overlay for primary buttons */}
      {variant === 'primary' && glow && <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />}
    </motion.button>;
}