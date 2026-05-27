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
  X
} from 'lucide-react';
import { menuItems as initialMenuItems, MenuItem } from '../data/menuData';

type View = 'dashboard' | 'orders' | 'menu' | 'users' | 'settings';

interface Order {
  id: string;
  userName: string;
  items: string[];
  status: 'pending' | 'preparing' | 'completed';
  timestamp: Date;
  amount: number;
}

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      userName: 'Rajesh Kumar',
      items: ['Veg Thali', 'Masala Chai'],
      status: 'pending',
      timestamp: new Date(),
      amount: 135
    },
    {
      id: 'ORD002',
      userName: 'Priya Sharma',
      items: ['Chicken Biryani', 'Mango Lassi'],
      status: 'preparing',
      timestamp: new Date(Date.now() - 10 * 60000),
      amount: 230
    },
    {
      id: 'ORD003',
      userName: 'Amit Patel',
      items: ['Masala Dosa', 'Filter Coffee'],
      status: 'preparing',
      timestamp: new Date(Date.now() - 15 * 60000),
      amount: 80
    },
    {
      id: 'ORD004',
      userName: 'Sneha Reddy',
      items: ['Paneer Butter Masala', 'Gulab Jamun'],
      status: 'completed',
      timestamp: new Date(Date.now() - 30 * 60000),
      amount: 180
    },
  ]);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);

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
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Smart Meal
          </h1>
          <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard' as View, icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'orders' as View, icon: ShoppingBag, label: 'Orders' },
            { id: 'menu' as View, icon: UtensilsCrossed, label: 'Menu Management' },
            { id: 'users' as View, icon: Users, label: 'Users' },
            { id: 'settings' as View, icon: Settings, label: 'Settings' },
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
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
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
                        {order.timestamp.toLocaleTimeString()}
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
                  <div className="h-32 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-4xl">
                    {item.category === 'breakfast' && '🌅'}
                    {item.category === 'meals' && '🍛'}
                    {item.category === 'snacks' && '🍟'}
                    {item.category === 'drinks' && '☕'}
                    {item.category === 'desserts' && '🍰'}
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

        {currentView === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Settings</h2>

            <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.fullName}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue={user?.phoneNumber}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
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
