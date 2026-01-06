
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  // Mapping sizes to specific heights to maintain aspect ratio and clarity
  const heights = {
    sm: 'h-14',
    md: 'h-36',
    lg: 'h-64'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img 
        src="logo.png" 
        alt="SY DATA - Affordable, always connected" 
        className={`${heights[size]} w-auto object-contain transition-transform duration-300 hover:scale-105`}
        loading="eager"
        onError={(e) => {
          // Robust fallback: If image isn't found, display the brand name in text
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-fallback')) {
            const fallback = document.createElement('h1');
            fallback.className = 'logo-fallback text-3xl font-black tracking-tighter text-slate-800';
            fallback.innerHTML = 'SY <span class="text-blue-600">DATA</span>';
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};

export default Logo;
