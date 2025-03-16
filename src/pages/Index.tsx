
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Index = () => {
  // Add page load animations
  useEffect(() => {
    // Add a class to the body when the page loads
    document.body.classList.add('animate-fade-in');
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <Hero />
      
      {/* You can add more sections here such as Services, Features, Pricing, etc. */}
      <div className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to transform your social media presence?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Join thousands of influencers and businesses who trust TINPED SMM for their social media growth.
          </p>
          <a 
            href="/register" 
            className="btn-shine inline-block px-8 py-3.5 bg-brand-purple text-white rounded-full shadow-glow-sm hover:shadow-glow-md transition-all duration-300 font-medium text-lg"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
