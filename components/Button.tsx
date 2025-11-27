import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-coffee-800 text-white hover:bg-coffee-900 shadow-sm",
    secondary: "bg-coffee-100 text-coffee-900 hover:bg-coffee-200",
    outline: "border border-coffee-800 text-coffee-800 hover:bg-coffee-50",
    ghost: "text-coffee-800 hover:bg-coffee-100/50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};