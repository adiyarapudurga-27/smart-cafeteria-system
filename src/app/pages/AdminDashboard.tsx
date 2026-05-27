import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Clock,
  CheckCircle2,
  DollarSign,
  UtensilsCrossed,
  Users,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Table2,
  CreditCard,
  FileText,
  TrendingUp,
  BarChart3,
  User,
  ChevronDown,
  Save,
  Key,
  UserCog,
  Sparkles
} from 'lucide-react';
import { menuItems as initialMenuItems, MenuItem } from '../data/menuData';

type View = 'dashboard' | 'orders' | 'menu' | 'tables' | 'payments' | 'reports' | 'analytics' | 'users';

interface Order {
  id: string;
  userName: string;
  items: string[];
  status: 'pending' | 'preparing' | 'completed';
  timestamp: Date;
  amount: number;
  paymentMethod?: 'upi' | 'card';
  tableNumber?: string;
}

interface Table {
  id: string;
  number: string;
  capacity: number;
  status: 'free' | 'occupied' | 'reserved';
  currentOrder?: string;
}

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'upi' | 'card';
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  userName: string;
}

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      userName: 'Rajesh Kumar',
      items: ['Veg Meals', 'Tea'],
      status: 'pending',
      timestamp: new Date(),
      amount: 135,
      paymentMethod: 'upi',
      tableNumber: 'T-12'
    },
    {
      id: 'ORD002',
      userName: 'Priya Sharma',
      items: ['Chicken Biryani', 'Mango Juice'],
      status: 'preparing',
      timestamp: new Date(Date.now() - 10 * 60000),
      amount: 230,
      paymentMethod: 'card',
      tableNumber: 'T-5'
    },
    {
      id: 'ORD003',
      userName: 'Amit Patel',
      items: ['Dosa', 'Coffee'],
      status: 'preparing',
      timestamp: new Date(Date.now() - 15 * 60000),
      amount: 70,
      paymentMethod: 'upi',
      tableNumber: 'T-8'
    },
    {
      id: 'ORD004',
      userName: 'Sneha Reddy',
      items: ['Paneer Butter Masala', 'Gulab Jamun'],
      status: 'completed',
      timestamp: new Date(Date.now() - 30 * 60000),
      amount: 190,
      paymentMethod: 'card',
      tableNumber: 'T-3'
    },
  ]);

  const [tables, setTables] = useState<Table[]>([
    { id: 't1', number: 'T-1', capacity: 4, status: 'free' },
    { id: 't2', number: 'T-2', capacity: 2, status: 'free' },
    { id: 't3', number: 'T-3', capacity: 4, status: 'occupied', currentOrder: 'ORD004' },
    { id: 't4', number: 'T-4', capacity: 6, status: 'free' },
    { id: 't5', number: 'T-5', capacity: 4, status: 'occupied', currentOrder: 'ORD002' },
    { id: 't6', number: 'T-6', capacity: 2, status: 'reserved' },
    { id: 't7', number: 'T-7', capacity: 4, status: 'free' },
    { id: 't8', number: 'T-8', capacity: 4, status: 'occupied', currentOrder: 'ORD003' },
    { id: 't9', number: 'T-9', capacity: 6, status: 'free' },
    { id: 't10', number: 'T-10', capacity: 2, status: 'free' },
    { id: 't11', number: 'T-11', capacity: 4, status: 'free' },
    { id: 't12', number: 'T-12', capacity: 4, status: 'occupied', currentOrder: 'ORD001' },
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    { id: 'PAY001', orderId: 'ORD001', amount: 135, method: 'upi', status: 'completed', timestamp: new Date(), userName: 'Rajesh Kumar' },
    { id: 'PAY002', orderId: 'ORD002', amount: 230, method: 'card', status: 'completed', timestamp: new Date(Date.now() - 10 * 60000), userName: 'Priya Sharma' },
    { id: 'PAY003', orderId: 'ORD003', amount: 70, method: 'upi', status: 'pending', timestamp: new Date(Date.now() - 15 * 60000), userName: 'Amit Patel' },
    { id: 'PAY004', orderId: 'ORD004', amount: 190, method: 'card', status: 'completed', timestamp: new Date(Date.now() - 30 * 60000), userName: 'Sneha Reddy' },
  ]);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'breakfast' as MenuItem['category'],
    type: 'veg' as MenuItem['type'],
    description: '',
    prepTime: '',
    image: ''
  });
  const [showProfileModal, setShowProfileModal] = useState(false);

const [profileData, setProfileData] = useState({
  name: user?.fullName || '',
  phone: '',
  location: 'Current Location Not Set'
});


  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0)
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const deleteMenuItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.description || !newItem.prepTime) {
      alert('Please fill all fields');
      return;
    }

    const item: MenuItem = {
      id: 'custom-' + Date.now(),
      name: newItem.name,
      price: parseInt(newItem.price),
      category: newItem.category,
      type: newItem.type,
      tags: ['popular'],
      description: newItem.description,
      prepTime: parseInt(newItem.prepTime),
      image: newItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
    };

    setMenuItems([...menuItems, item]);

    if (confirm('Item added! Do you want to add another item?')) {
      setNewItem({
        name: '',
        price: '',
        category: 'breakfast',
        type: 'veg',
        description: '',
        prepTime: '',
        image: ''
      });
    } else {
      setShowAddItem(false);
      setNewItem({
        name: '',
        price: '',
        category: 'breakfast',
        type: 'veg',
        description: '',
        prepTime: '',
        image: ''
      });
    }
  };

  const handleEditItem = () => {
    if (!editingItem) return;

    setMenuItems(menuItems.map(item =>
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
    alert('Item updated successfully!');
  };

  const updateTableStatus = (tableId: string, status: Table['status']) => {
    setTables(tables.map(t => t.id === tableId ? { ...t, status } : t));
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Go to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-lg flex flex-col h-screen">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Smart Meal
          </h1>
          <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
          
          
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {[
            { id: 'dashboard' as View, icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'orders' as View, icon: ShoppingBag, label: 'Orders' },
            { id: 'menu' as View, icon: UtensilsCrossed, label: 'Menu Management' },
            { id: 'tables' as View, icon: Table2, label: 'Table Management' },
            { id: 'payments' as View, icon: CreditCard, label: 'Payments' },
            { id: 'reports' as View, icon: FileText, label: 'Reports' },
            { id: 'analytics' as View, icon: BarChart3, label: 'AI Analytics' },
            { id: 'users' as View, icon: Users, label: 'Users' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          <div className="p-4 border-t border-gray-200 relative">
  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
     onClick={() => setShowProfileMenu(!showProfileMenu)}>
    
    {/* Profile Icon */}
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
      {user?.fullName?.charAt(0) || "A"}
    </div>

    {/* Name + Role */}
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-800">
        {user?.fullName || "Admin"}
      </p>
      <p className="text-xs text-gray-500 capitalize">
        {user?.role}
      </p>
    </div>

    {/* Dropdown icon (optional) */}
    <ChevronDown className="w-4 h-4 text-gray-500" />
  </div>
</div>
{showProfileMenu && (
  <div className="absolute bottom-20 left-4 w-56 bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden z-50">

    <button
      onClick={() => {
        setShowProfileModal(true);
        setShowProfileMenu(false);
      }}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
    >
      👤 View Profile
    </button>

    <button
      onClick={() => {
        alert("Settings page coming soon 🚀");
        setShowProfileMenu(false);
      }}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
    >
      ⚙️ Settings
    </button>

    <button
      onClick={() => {
        const newLocation = prompt("Enter new location:");
        if (newLocation) {
          setProfileData({ ...profileData, location: newLocation });
        }
        setShowProfileMenu(false);
      }}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
    >
      📍 Change Location
    </button>

    <button
      onClick={() => {
        logout();
        navigate("/login");
      }}
      className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 text-sm border-t"
    >
      🚪 Logout
    </button>

  </div>
)}
        </nav>

        
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={<ShoppingBag className="w-8 h-8" />}
                label="Total Orders"
                value={stats.totalOrders}
                color="blue"
              />
              <StatCard
                icon={<Clock className="w-8 h-8" />}
                label="Pending Orders"
                value={stats.pendingOrders}
                color="orange"
              />
              <StatCard
                icon={<CheckCircle2 className="w-8 h-8" />}
                label="Completed Orders"
                value={stats.completedOrders}
                color="green"
              />
              <StatCard
                icon={<DollarSign className="w-8 h-8" />}
                label="Total Revenue"
                value={`₹${stats.totalRevenue}`}
                color="purple"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.userName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">₹{order.amount}</p>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Live Orders</h2>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{order.id}</h3>
                      <p className="text-gray-600">{order.userName}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.timestamp.toLocaleTimeString()} • Table: {order.tableNumber}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-800">₹{order.amount}</p>
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Accept Order
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-800">Menu Management</h2>
              <button
                onClick={() => setShowAddItem(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add New Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <span className="font-bold text-orange-600">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMenuItem(item.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'tables' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Table Management</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 border-2 border-green-200">
                <p className="text-sm text-gray-600">Free Tables</p>
                <p className="text-3xl font-bold text-green-600">
                  {tables.filter(t => t.status === 'free').length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-red-200">
                <p className="text-sm text-gray-600">Occupied Tables</p>
                <p className="text-3xl font-bold text-red-600">
                  {tables.filter(t => t.status === 'occupied').length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-yellow-200">
                <p className="text-sm text-gray-600">Reserved Tables</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {tables.filter(t => t.status === 'reserved').length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                <p className="text-sm text-gray-600">Total Tables</p>
                <p className="text-3xl font-bold text-blue-600">{tables.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`p-6 rounded-2xl border-2 ${
                    table.status === 'free'
                      ? 'bg-green-50 border-green-300'
                      : table.status === 'occupied'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{table.number}</h3>
                    <Table2 className={`w-6 h-6 ${
                      table.status === 'free'
                        ? 'text-green-600'
                        : table.status === 'occupied'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Capacity: {table.capacity} people</p>
                  <p className={`text-sm font-semibold mb-3 ${
                    table.status === 'free'
                      ? 'text-green-700'
                      : table.status === 'occupied'
                      ? 'text-red-700'
                      : 'text-yellow-700'
                  }`}>
                    {table.status.toUpperCase()}
                  </p>
                  {table.currentOrder && (
                    <p className="text-xs text-gray-500 mb-3">Order: {table.currentOrder}</p>
                  )}
                  <select
                    value={table.status}
                    onChange={(e) => updateTableStatus(table.id, e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="free">Free</option>
                    <option value="occupied">Occupied</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'payments' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Payment Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 mb-1">UPI Payments</p>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{payments.filter(p => p.method === 'upi').reduce((sum, p) => sum + p.amount, 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {payments.filter(p => p.method === 'upi').length} transactions
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500">
                <p className="text-sm text-gray-600 mb-1">Card Payments</p>
                <p className="text-3xl font-bold text-purple-600">
                  ₹{payments.filter(p => p.method === 'card').reduce((sum, p) => sum + p.amount, 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {payments.filter(p => p.method === 'card').length} transactions
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{payments.reduce((sum, p) => sum + p.amount, 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">{payments.length} transactions</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">Payment Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {payment.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {payment.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ₹{payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            payment.method === 'upi'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {payment.method.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            payment.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : payment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {payment.timestamp.toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {currentView === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Reports</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Daily Sales</h3>
                <p className="text-4xl font-bold mb-2">₹{stats.totalRevenue}</p>
                <p className="text-sm text-blue-100">{stats.totalOrders} orders today</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Weekly Sales</h3>
                <p className="text-4xl font-bold mb-2">₹{stats.totalRevenue * 7}</p>
                <p className="text-sm text-purple-100">{stats.totalOrders * 7} orders this week</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Monthly Sales</h3>
                <p className="text-4xl font-bold mb-2">₹{stats.totalRevenue * 30}</p>
                <p className="text-sm text-green-100">{stats.totalOrders * 30} orders this month</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Foods</h3>
              <div className="space-y-4">
                {[
                  { name: 'Chicken Biryani', orders: 145, revenue: 26100 },
                  { name: 'Veg Meals', orders: 132, revenue: 15840 },
                  { name: 'Dosa', orders: 118, revenue: 5900 },
                  { name: 'Paneer Butter Masala', orders: 95, revenue: 14250 },
                  { name: 'Samosa', orders: 87, revenue: 1740 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">₹{item.revenue}</p>
                      <p className="text-xs text-gray-500">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">AI Analytics Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                  Peak Hours Analysis
                </h3>
                <div className="space-y-3">
                  {[
                    { time: '8:00 AM - 9:30 AM', orders: 45, status: 'high' },
                    { time: '12:30 PM - 2:00 PM', orders: 89, status: 'very-high' },
                    { time: '4:00 PM - 5:30 PM', orders: 32, status: 'medium' },
                    { time: '7:00 PM - 8:30 PM', orders: 56, status: 'high' },
                  ].map((slot, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{slot.time}</p>
                        <p className="text-sm text-gray-600">{slot.orders} orders</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        slot.status === 'very-high'
                          ? 'bg-red-500 text-white'
                          : slot.status === 'high'
                          ? 'bg-orange-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {slot.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Most Ordered Items
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Chicken Biryani', count: 145, trend: '+12%' },
                    { name: 'Veg Meals', count: 132, trend: '+8%' },
                    { name: 'Dosa', count: 118, trend: '+15%' },
                    { name: 'Tea', count: 105, trend: '+5%' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.count} orders</p>
                      </div>
                      <span className="text-green-600 font-semibold text-sm">{item.trend}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                  Wait Time Trends
                </h3>
                <div className="space-y-3">
                  {[
                    { period: 'Morning (8-11 AM)', avgWait: '12 min', color: 'green' },
                    { period: 'Lunch (12-2 PM)', avgWait: '18 min', color: 'orange' },
                    { period: 'Evening (4-6 PM)', avgWait: '10 min', color: 'green' },
                    { period: 'Dinner (7-9 PM)', avgWait: '15 min', color: 'yellow' },
                  ].map((slot, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-800">{slot.period}</p>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        slot.color === 'green'
                          ? 'bg-green-100 text-green-700'
                          : slot.color === 'orange'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {slot.avgWait}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                  Personalized Recommendation Patterns
                </h3>
                <div className="space-y-3">
                  {[
                    { pattern: 'Biryani → Raita', success: '85%' },
                    { pattern: 'Dosa → Coffee', success: '78%' },
                    { pattern: 'Meals → Dessert', success: '62%' },
                    { pattern: 'Snacks → Tea', success: '71%' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-800">{item.pattern}</p>
                        <span className="text-green-600 font-semibold text-sm">{item.success}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                          style={{ width: item.success }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'users' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">User Management</h2>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {[
                  { name: 'Rajesh Kumar', email: 'rajesh@company.com', orders: 45, role: 'Employee' },
                  { name: 'Priya Sharma', email: 'priya@company.com', orders: 32, role: 'Employee' },
                  { name: 'Amit Patel', email: 'amit@company.com', orders: 28, role: 'Staff' },
                  { name: 'Sneha Reddy', email: 'sneha@company.com', orders: 51, role: 'Employee' },
                ].map((user, idx) => (
                  <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">{user.orders} orders</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddItem(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Menu Item</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="e.g., Masala Dosa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="e.g., 60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="meals">Meals</option>
                  <option value="snacks">Snacks</option>
                  <option value="drinks">Drinks</option>
                  <option value="desserts">Desserts</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  rows={3}
                  placeholder="Brief description of the dish"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (minutes)</label>
                <input
                  type="number"
                  value={newItem.prepTime}
                  onChange={(e) => setNewItem({ ...newItem, prepTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="e.g., 15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="https://..."
                />
              </div>

              <button
                onClick={handleAddItem}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Menu Item</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (minutes)</label>
                <input
                  type="number"
                  value={editingItem.prepTime}
                  onChange={(e) => setEditingItem({ ...editingItem, prepTime: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <button
                onClick={handleEditItem}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${colors[color as keyof typeof colors]} text-white mb-3`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700',
    preparing: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
