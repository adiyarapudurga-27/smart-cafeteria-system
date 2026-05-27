import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { menuItems, MenuItem } from '../data/menuData';
import { Search, Mic, ShoppingCart, Filter, Leaf, Drumstick, TrendingUp, Star, Sparkles, Clock, LogOut, MapPin, User, Mail, BadgeCheck, Phone, HelpCircle, ChevronDown } from 'lucide-react';


type Category = 'all' | 'drinks' | 'meals' | 'snacks' | 'breakfast' | 'desserts';
type FilterTag = 'all' | 'veg' | 'non-veg' | 'healthy' | 'popular' | 'recommended' | 'special';

export const MenuPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedFilter, setSelectedFilter] = useState<FilterTag>('all');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const getTimeSlot = () => {
  const hour = new Date().getHours();

  if (hour < 11) return 'breakfast';
  if (hour < 16) return 'lunch';
  return 'dinner';
};


  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All', icon: <Filter className="w-5 h-5" /> },
    { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { id: 'meals', label: 'Meals', icon: '🍛' },
    { id: 'snacks', label: 'Snacks', icon: '🍟' },
    { id: 'drinks', label: 'Drinks', icon: '☕' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
  ];

  const filters: { id: FilterTag; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All', icon: <Filter className="w-4 h-4" /> },
    { id: 'veg', label: 'Veg', icon: <Leaf className="w-4 h-4" /> },
    { id: 'non-veg', label: 'Non-Veg', icon: <Drumstick className="w-4 h-4" /> },
    { id: 'healthy', label: 'Healthy', icon: '💚' },
    { id: 'popular', label: 'Popular', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'recommended', label: 'Recommended', icon: <Star className="w-4 h-4" /> },
    { id: 'special', label: "Today's Special", icon: <Sparkles className="w-4 h-4" /> },
  ];

  const filteredItems = useMemo(() => {
  return menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesFilter =
      selectedFilter === 'all' ||
      item.type === selectedFilter ||
      item.tags.includes(selectedFilter as any);

    return matchesSearch && matchesCategory && matchesFilter;
  });
}, [searchQuery, selectedCategory, selectedFilter]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const startVoiceSearch = async () => {
  try {
    // Browser support check
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser');
      return;
    }

    // Mic permission request
    await navigator.mediaDevices.getUserMedia({ audio: true });

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.start();

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      console.log('You said:', transcript);

      setSearchQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.log('Speech error:', event.error);

      if (event.error === 'not-allowed') {
        alert('Microphone permission denied');
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  } catch (error) {
    console.log(error);
    alert('Please enable microphone permission in browser settings');
    setIsListening(false);
  }
};
const getAISuggestion = (item: MenuItem) => {
  const foodMap: Record<string, string[]> = {
    Burger: ['French Fries', 'Coke', 'Pepsi'],
    Pizza: ['Coke', 'Pepsi', 'Garlic Bread'],
    'Pizza Slice': ['Coke', 'Pepsi'],
    'Chicken Biryani': ['Raita', 'Gulab Jamun'],
    Biryani: ['Raita', 'Curd'],
    Idli: ['Tea', 'Filter Coffee'],
    Dosa: ['Tea', 'Coffee'],
    Samosa: ['Tea', 'Coffee'],
    Sandwich: ['Coffee', 'Juice'],
    Pasta: ['Garlic Bread', 'Cold Drink'],
    Coffee: ['Cookies', 'Sandwich'],
    Tea: ['Biscuits', 'Toast'],
    Fries: ['Burger', 'Coke'],
    IceCream: ['Brownie', 'Coffee'],
    Juice: ['Snacks', 'Sandwich'],
  };

  const options = foodMap[item.name];

  if (!options) return null;

  const randomItem =
    options[Math.floor(Math.random() * options.length)];

  return menuItems.find((i) => i.name === randomItem) || null;
};
const getTopAISuggestions = (item: MenuItem) => {
  const suggestions = new Set<MenuItem>();

  for (let i = 0; i < 15; i++) {
    const sug = getAISuggestion(item);
    if (sug) suggestions.add(sug);
  }

  return Array.from(suggestions);
};

const getPersonalizedItems = (items: MenuItem[]) => {
  const timeSlot = getTimeSlot();
  const prefs = user?.preferences;

  return items
    .map(item => {
      let score = 0;

      if (prefs?.frequentOrders.includes(item.name)) score += 5;

      if (prefs?.likedItems.includes(item.name)) score += 4;

      if (prefs?.timeBasedLikes?.[timeSlot]?.includes(item.name)) score += 6;

      if (item.tags.includes('popular')) score += 2;

      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(x => x.item);
};
  return (
    
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Smart Meal
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{user?.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/cart')}
                className="relative p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 pr-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowProfileMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden z-20 border border-gray-200">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            <User className="w-7 h-7 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-bold">{user?.fullName}</p>
                            <p className="text-sm text-white/90 capitalize">{user?.role}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        {user?.role === 'employee' && (
                          <>
                            <div className="px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                              <BadgeCheck className="w-5 h-5 text-gray-600" />
                              <div>
                                <p className="text-xs text-gray-500">Employee ID</p>
                                <p className="font-medium text-gray-800">{user?.employeeId}</p>
                              </div>
                            </div>
                            <div className="px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                              <Mail className="w-5 h-5 text-gray-600" />
                              <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-gray-800 text-sm">{user?.email}</p>
                              </div>
                            </div>
                          </>
                        )}

                        {user?.role !== 'employee' && (
                          <div className="px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="font-medium text-gray-800">{user?.phoneNumber}</p>
                            </div>
                          </div>
                        )}

                        <button className="w-full px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 text-left">
                          <HelpCircle className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-800">Help & Support</span>
                        </button>

                        <div className="border-t border-gray-200 my-2"></div>

                        <button
                          onClick={() => {
                            logout();
                            navigate('/');
                          }}
                          className="w-full px-4 py-3 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3 text-left text-red-600"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for dishes..."
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
            <button
  onClick={startVoiceSearch}
  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-white transition-colors ${
    isListening
      ? 'bg-red-600 animate-pulse'
      : 'bg-orange-500 hover:bg-orange-600'
  }`}
>
  <Mic className="w-5 h-5" />
</button>
          </div>
        </div>
        {aiMessage && (
  <div className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg animate-bounce">
    <p className="font-bold text-lg mb-1">
      ✨ AI Suggestion
    </p>

    <p className="text-sm">
      {aiMessage}
    </p>
  </div>
)}

        <div className="border-t border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {typeof cat.icon === 'string' ? (
                  <span>{cat.icon}</span>
                ) : (
                  cat.icon
                )}
                <span className="font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-orange-500'
                }`}
              >
                {typeof filter.icon === 'string' ? (
                  <span>{filter.icon}</span>
                ) : (
                  filter.icon
                )}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <p className="text-xl text-gray-600">No items found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
  <MenuItemCard
    key={item.id}
    item={item}
    onAddToCart={(selectedItem) => {
  addToCart(selectedItem);

  const suggestion = getAISuggestion(selectedItem);

  // 🔥 force fresh update (fix stale state issue)
  setAiMessage('');

  setTimeout(() => {
    if (suggestion) {
      setAiMessage(
        `${suggestion.name} goes really well with ${selectedItem.name} 😋`
      );
    }
  }, 50);

  // auto clear
  setTimeout(() => {
    setAiMessage('');
  }, 4000);
}}
  />
))}
          </div>
        )}
      </div>
    </div>
  );
};


const MenuItemCard = ({
  item,
  onAddToCart,
}: {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}) => {
    return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
          {item.type === 'veg' ? (
            <div className="bg-green-500 text-white p-1.5 rounded-full shadow-lg">
              <Leaf className="w-4 h-4" />
            </div>
          ) : (
            <div className="bg-red-500 text-white p-1.5 rounded-full shadow-lg">
              <Drumstick className="w-4 h-4" />
            </div>
          )}
          {item.tags.includes('special') && (
            <div className="bg-yellow-400 text-white p-1.5 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{item.prepTime} min</span>
          </div>

          <button
            onClick={() => onAddToCart(item)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
          >
            Add
          </button>
        </div>
      </div>
      
    </div>
    
    
  );
};
