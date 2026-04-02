import React from 'react';
import { classNames } from '@/lib/utils';
import Link from 'next/link';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  className?: string;
  link?: string;
}

export function AnimatedButton({ 
  children, 
  link="/contact",
  variant = 'accent', 
  size = 'md', 
  showArrow = true,
  className = '',
  ...props
  
}: AnimatedButtonProps) {
  
  const sizeClasses = {
    sm: 'px-6 py-2 text-sm min-w-[120px]',
    md: 'px-6 py-3 text-base min-w-[140px]',
    lg: 'px-8 py-3 text-lg min-w-[160px]'
  };

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    accent: 'bg-accent text-white hover:bg-accent-hover',
    outline: 'bg-bg-surface border border-primary text-primary hover:bg-primary hover:text-white'
  };

  return (
   <Link href={`${link}`}>
    <button
      className={classNames(
        'relative overflow-hidden font-normal rounded-lg group transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {/* Hover Background */}
      <span className="absolute inset-0 bg-black/80 transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
        {children}
        {showArrow && <span>↗</span>}
      </span>
    </button>
   </Link>
  );
}