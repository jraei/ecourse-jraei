
import React, { useEffect, useRef } from 'react';
import SocialMediaBanner from './SocialMediaBanner';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Add a subtle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollPosition = window.scrollY;
      // Translate the background slightly based on scroll position
      heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.05}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-gradient-to-b from-white via-brand-light/30 to-white"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237367f0' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* Floating elements for visual interest */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-brand-purple/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute top-60 right-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      {/* Main hero content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center stagger-fade-in">
          {/* Tagline */}
          <div className="inline-block mb-6 px-4 py-1.5 bg-brand-purple/10 rounded-full">
            <span className="text-brand-purple font-medium">TINPED SMM - Boost Your Social Presence</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            Skyrocket Your Social Media <br className="hidden md:block" />
            <span className="text-brand-purple text-glow">Presence & Engagement</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get authentic followers, likes, and comments for all your social media accounts
            with our premium SMM services. Real results, real growth.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="/register" 
              className="btn-shine w-full sm:w-auto px-8 py-3.5 bg-brand-purple text-white rounded-full shadow-glow-sm hover:shadow-glow-md transition-all duration-300 font-medium text-lg"
            >
              Get Started Now
            </a>
            <a 
              href="#services" 
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-800 rounded-full shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 font-medium text-lg"
            >
              Explore Services
            </a>
          </div>
          
          {/* Stats/trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-brand-purple">99.9%</h3>
              <p className="text-gray-600">Uptime</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-brand-purple">24/7</h3>
              <p className="text-gray-600">Support</p>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-brand-purple">10K+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social media platforms banner */}
      <div className="absolute bottom-0 left-0 right-0">
        <SocialMediaBanner />
      </div>
      
      {/* Diagonal separator */}
      <div className="absolute -bottom-10 left-0 right-0 h-20 bg-white transform -skew-y-2"></div>
    </div>
  );
};

export default Hero;
