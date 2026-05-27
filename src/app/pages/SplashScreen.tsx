import React from 'react';
import { useNavigate } from 'react-router';
import { Utensils, ChefHat } from 'lucide-react';

export const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(110, 209, 10, 0.29), rgba(110, 209, 10, 0.29), rgba(236, 151, 72, 0.95)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
        
      }}
    >
      <div className="text-center space-y-8 animate-in fade-in duration-1000">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>
          <div className="relative bg-white rounded-full p-8 shadow-2xl inline-block">
            <div className="flex items-center justify-center gap-3">
              <ChefHat className="w-16 h-16 text-orange-600" strokeWidth={2} />
              <Utensils className="w-16 h-16 text-red-600" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg tracking-tight" >
            Smart Meal
          </h1>
          <p className="text-xl text-white/90 italic font-light">
            " Order Smart, Eat Better"
          </p>
        </div>

        <button
          onClick={() => navigate('/auth')}
          className="mt-8 bg-white text-orange-600 px-10 py-1 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-orange-50"
        >
          Get Started
        </button>

        <div className="mt-12 flex items-center justify-center gap-6 text-white/80">
          <div className="text-center">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm">Daily Orders</p>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-center">
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm">Locations</p>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-center">
            <p className="text-2xl font-bold">50+</p>
            <p className="text-sm">Menu Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};
