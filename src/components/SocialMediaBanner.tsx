
import React from 'react';
import { cn } from '@/lib/utils';

// Social media platforms data
const socialMediaPlatforms = [
  { name: 'Instagram', icon: '📸' },
  { name: 'Facebook', icon: '👍' },
  { name: 'Twitter', icon: '🐦' },
  { name: 'TikTok', icon: '🎵' },
  { name: 'YouTube', icon: '📹' },
  { name: 'LinkedIn', icon: '💼' },
  { name: 'Pinterest', icon: '📌' },
  { name: 'Snapchat', icon: '👻' },
  { name: 'Reddit', icon: '🧠' },
  { name: 'Threads', icon: '🧵' },
];

const SocialMediaBanner = ({ className }: { className?: string }) => {
  // Duplicate the platforms to create the continuous scrolling effect
  const duplicatedPlatforms = [...socialMediaPlatforms, ...socialMediaPlatforms];
  
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="relative w-full py-4">
        {/* Gradient overlay left */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        
        {/* Scrolling content */}
        <div className="flex animate-scroll-fast">
          {duplicatedPlatforms.map((platform, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center mx-6 min-w-max"
            >
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
                <span className="text-xl">{platform.icon}</span>
                <span className="font-medium text-gray-800">{platform.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient overlay right */}
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default SocialMediaBanner;
