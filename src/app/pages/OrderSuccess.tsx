import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { CheckCircle, Clock, MapPin } from 'lucide-react';

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { waitTime: number; tableNumber: string; amount: number } || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="inline-block bg-green-100 rounded-full p-6 mb-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-600 mb-8">Your order has been confirmed successfully</p>

        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Estimated Time</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">{state.waitTime || 15} min</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Table Number</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{state.tableNumber || 'N/A'}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Amount Paid</span>
              <span className="text-2xl font-bold text-purple-600">₹{state.amount || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-yellow-800 font-medium italic">
            "Great food is the foundation of genuine happiness." - Auguste Escoffier
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/menu')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
          >
            Order More
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
