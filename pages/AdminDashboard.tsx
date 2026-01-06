
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, Package, Search, LogOut } from 'lucide-react';
import { Order } from '../types';
import Logo from '../components/Logo';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('sy_data_orders') || '[]');
    setOrders(savedOrders.filter((o: Order) => o.method === 'MANUAL'));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid admin password!");
    }
  };

  const markAsSent = (id: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: 'SENT' } as Order : o);
    setOrders(updated);
    
    // Update master storage
    const master = JSON.parse(localStorage.getItem('sy_data_orders') || '[]');
    const updatedMaster = master.map((o: Order) => o.id === id ? { ...o, status: 'SENT' } : o);
    localStorage.setItem('sy_data_orders', JSON.stringify(updatedMaster));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 bg-slate-900">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 space-y-6 shadow-2xl">
          <Logo size="sm" />
          <div className="text-center">
            <h2 className="text-xl font-bold">Admin Portal</h2>
            <p className="text-slate-500 text-sm">Enter password to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingCount = orders.filter(o => o.status === 'PENDING').length;

  return (
    <div className="flex-1 bg-slate-50">
      {/* Sidebar/Nav */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-2 text-slate-600 font-bold">
            <LayoutDashboard size={20} />
            Admin Dashboard
          </div>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Pending Manual</p>
              <h3 className="text-3xl font-black text-slate-900">{pendingCount}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <Package size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Manual Orders</p>
              <h3 className="text-3xl font-black text-slate-900">{orders.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Search size={24} />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h4 className="font-bold text-slate-800">Manual Order Management</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Network</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Phone Number</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No manual orders found yet.
                    </td>
                  </tr>
                ) : (
                  orders.sort((a,b) => b.createdAt - a.createdAt).map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-widest ${
                          order.network === 'MTN' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {order.network}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{order.plan}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{order.phoneNumber}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">₦{order.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'SENT' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.status === 'PENDING' && (
                          <button
                            onClick={() => markAsSent(order.id)}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-sm"
                          >
                            <CheckCircle size={14} />
                            Mark as Sent
                          </button>
                        )}
                        {order.status === 'SENT' && (
                          <span className="text-slate-400 text-xs flex items-center gap-1 italic">
                            <CheckCircle size={14} className="text-green-500" /> Finished
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
