import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, Smartphone, Clock, TrendingUp, Sparkles, X } from 'lucide-react';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const [showAI, setShowAI] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | null>(null);
  const [tableNumber, setTableNumber] = useState('');
  const [showWaitTimeModal, setShowWaitTimeModal] = useState(false);
  const [showPeakHoursModal, setShowPeakHoursModal] = useState(false);
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);

  const currentHour = new Date().getHours();
  const currentOrders = Math.floor(Math.random() * 15) + 5;

  const estimatedWaitTime = useMemo(() => {
    const baseTime = cart.reduce((sum, item) => sum + item.prepTime * item.quantity, 0);
    const loadMultiplier = 1 + (currentOrders * 0.05);
    return Math.ceil(baseTime * loadMultiplier);
  }, [cart, currentOrders]);

  const peakHours = useMemo(() => {
    const peaks = [
      { time: '8:00 AM - 9:30 AM', level: 'high', reason: 'Breakfast rush' },
      { time: '12:30 PM - 2:00 PM', level: 'very-high', reason: 'Lunch peak' },
      { time: '4:00 PM - 5:30 PM', level: 'medium', reason: 'Evening snacks' },
      { time: '7:00 PM - 8:30 PM', level: 'high', reason: 'Dinner time' },
    ];

    const isPeakNow = (currentHour >= 8 && currentHour < 10) ||
                      (currentHour >= 12 && currentHour < 14) ||
                      (currentHour >= 16 && currentHour < 18) ||
                      (currentHour >= 19 && currentHour < 21);

    return { peaks, isPeakNow };
  }, [currentHour]);

  const recommendations = useMemo(() => {
    const cartCategories = new Set(cart.map(item => item.category));
    const allItems = [
      { id: 'd2', name: 'Filter Coffee', category: 'drinks' },
      { id: 'ds1', name: 'Gulab Jamun', category: 'desserts' },
      { id: 's1', name: 'Samosa', category: 'snacks' },
    ];

    return allItems.filter(item => !cartCategories.has(item.category as any));
  }, [cart]);

  const handleCheckout = () => {
    if (!selectedPayment || !tableNumber) {
      alert('Please select payment method and enter table number');
      return;
    }

    clearCart();
    navigate('/order-success', {
      state: {
        waitTime: estimatedWaitTime,
        tableNumber,
        amount: totalAmount
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">Back to Menu</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          <div className="w-24"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {showAI && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 relative">
            <button
              onClick={() => setShowAI(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">AI Insights</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowWaitTimeModal(true)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-800">Wait Time</span>
                </div>
                <p className="text-3xl font-bold text-orange-600">{estimatedWaitTime} min</p>
                <p className="text-sm text-gray-600 mt-1">
                  Based on {currentOrders} current orders
                </p>
                <p className="text-xs text-blue-600 mt-2 font-medium">Click for details →</p>
              </button>

              <button
                onClick={() => setShowPeakHoursModal(true)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-gray-800">Peak Hours</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {peakHours.isPeakNow ? '🔴 Peak time now!' : '✅ Off-peak time'}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Next peak: {peakHours.peaks.find(p => parseInt(p.time) > currentHour)?.time || 'Tomorrow morning'}
                </p>
                <p className="text-xs text-blue-600 mt-2 font-medium">Click for details →</p>
              </button>

              <button
                onClick={() => setShowRecommendationsModal(true)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-800">For You</span>
                </div>
                <p className="text-sm text-gray-700">
                  {recommendations.length > 0
                    ? `Try ${recommendations[0].name}`
                    : 'Great choices!'}
                </p>
                <p className="text-xs text-gray-600 mt-1">Based on your order</p>
                <p className="text-xs text-blue-600 mt-2 font-medium">Click for details →</p>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="p-6 flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price} each</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-24 text-right font-bold text-gray-800">
                  ₹{item.price * item.quantity}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
            <div className="flex items-center justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span className="text-orange-600">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Table Number</h2>
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Enter table number (e.g., T-12)"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedPayment('upi')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedPayment === 'upi'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Smartphone className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-semibold text-gray-800">UPI Payment</h3>
              <p className="text-sm text-gray-600">GPay, PhonePe, Paytm</p>
            </button>

            <button
              onClick={() => setSelectedPayment('card')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedPayment === 'card'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Card Payment</h3>
              <p className="text-sm text-gray-600">Credit / Debit Card</p>
            </button>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={!selectedPayment || !tableNumber}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl text-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Place Order - ₹{totalAmount}
        </button>
      </div>

      {/* Wait Time Modal */}
      {showWaitTimeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative animate-in zoom-in duration-300">
            <button
              onClick={() => setShowWaitTimeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Waiting Time Prediction</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Estimated Preparation Time</p>
                <p className="text-4xl font-bold text-orange-600">{estimatedWaitTime} minutes</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Predict preparation time</p>
                    <p className="text-sm text-gray-600">Based on current kitchen load</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Current Orders: {currentOrders}</p>
                    <p className="text-sm text-gray-600">Real-time system monitoring</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Helps user planning</p>
                    <p className="text-sm text-gray-600">Reduces confusion during busy hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>How it works:</strong> Our AI analyzes the number of current orders and overall system load to provide accurate wait time estimates.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Peak Hours Modal */}
      {showPeakHoursModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative animate-in zoom-in duration-300">
            <button
              onClick={() => setShowPeakHoursModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Peak Hours Analysis</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Current Status</p>
                <p className="text-2xl font-bold text-red-600">
                  {peakHours.isPeakNow ? '🔴 Peak Time Now' : '✅ Off-Peak Time'}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-3">Today's Peak Hours:</p>
                <div className="space-y-2">
                  {peakHours.peaks.map((peak, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-2 ${
                        peak.level === 'very-high'
                          ? 'bg-red-50 border-red-300'
                          : peak.level === 'high'
                          ? 'bg-orange-50 border-orange-300'
                          : 'bg-yellow-50 border-yellow-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">{peak.time}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          peak.level === 'very-high'
                            ? 'bg-red-500 text-white'
                            : peak.level === 'high'
                            ? 'bg-orange-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}>
                          {peak.level.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{peak.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>How it works:</strong> AI analyzes usage data to identify the busiest times. Order during off-peak hours to avoid long wait times!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Modal */}
      {showRecommendationsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative animate-in zoom-in duration-300">
            <button
              onClick={() => setShowRecommendationsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-full">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Food Recommendations</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Personalized For You</p>
                <p className="text-xl font-bold text-purple-600">
                  {recommendations.length > 0
                    ? recommendations.map(r => r.name).join(', ')
                    : 'Your cart looks perfect!'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Based on user history</p>
                    <p className="text-sm text-gray-600">Your previous order patterns</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Suggest frequent items</p>
                    <p className="text-sm text-gray-600">Items you order regularly</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Personalized experience</p>
                    <p className="text-sm text-gray-600">Helps make faster decisions</p>
                  </div>
                </div>
              </div>

              {recommendations.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="font-semibold text-gray-800">Recommended items:</p>
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <span className="text-gray-800">{rec.name}</span>
                      <button
                        onClick={() => {
                          setShowRecommendationsModal(false);
                          navigate('/menu');
                        }}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Add →
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>How it works:</strong> AI learns from your order history and preferences to suggest items you'll love!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
