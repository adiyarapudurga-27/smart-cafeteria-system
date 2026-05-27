import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { locations } from '../data/menuData';
import { MapPin, ArrowRight } from 'lucide-react';

export const LocationSelection = () => {
  const navigate = useNavigate();
  const { updateLocation, user } = useAuth();

  const handleLocationSelect = (location: string) => {
    updateLocation(location);
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-100 rounded-full p-4 mb-4">
            <MapPin className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Your Location</h1>
          <p className="text-gray-600">Choose your cafeteria location to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => handleLocationSelect(location)}
              className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-orange-600" />
                  <span className="text-lg font-semibold text-gray-800">{location}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Welcome, {user?.fullName}! 👋</p>
        </div>
      </div>
    </div>
  );
};
