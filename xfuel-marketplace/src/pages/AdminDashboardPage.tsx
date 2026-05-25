import { useState } from 'react';
import { mockListings, mockInquiries, mockUsers } from '../data/mockData';
import { Listing } from '../types';
import AdminTable from '../components/AdminTable';
import { ShieldCheck, Truck, MessageSquare, Users, TrendingUp, Download, BarChart3, Eye } from 'lucide-react';

type Tab = 'listings' | 'inquiries' | 'users' | 'analytics';

export default function AdminDashboardPage() {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [activeTab, setActiveTab] = useState<Tab>('listings');
  const [authd, setAuthd] = useState(false);
  const [pw, setPw] = useState('');

  const handleVerify = (id: string) =>
    setListings((ls) => ls.map((l) => l.id === id ? { ...l, xfuel_verified: true } : l));

  const handleFeature = (id: string) =>
    setListings((ls) => ls.map((l) => l.id === id ? { ...l, featured: !l.featured } : l));

  const handleApprove = (id: string) =>
    setListings((ls) => ls.map((l) => l.id === id ? { ...l, status: 'live' } : l));

  const handleReject = (id: string) =>
    setListings((ls) => ls.map((l) => l.id === id ? { ...l, status: 'draft' } : l));

  const exportCSV = () => {
    const headers = ['ID', 'Title', 'Price', 'Seller', 'Status', 'Verified', 'Location', 'Created'];
    const rows = listings.map((l) => [
      l.id, `"${l.title}"`, l.price, `"${l.seller_name}"`, l.status, l.xfuel_verified, l.location, l.created_at,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    a.download = 'xfuel-listings.csv';
    a.click();
  };

  if (!authd) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-neon-blue/10 border border-neon-blue/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={28} className="text-neon-blue" />
            </div>
            <h1 className="text-white text-2xl font-bold">Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-1">XFuel Marketplace Staff Only</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (pw === 'xfuel2024') setAuthd(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Admin Password</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
              />
              <p className="text-gray-600 text-xs mt-1">Demo password: xfuel2024</p>
            </div>
            <button type="submit" className="w-full py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-neon-blue-dark transition-colors">
              Access Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const verified = listings.filter((l) => l.xfuel_verified).length;
  const live = listings.filter((l) => l.status === 'live').length;
  const pending = listings.filter((l) => l.status === 'pending-verification').length;
  const featured = listings.filter((l) => l.featured).length;

  const tabs: { value: Tab; label: string; icon: typeof Truck; count?: number }[] = [
    { value: 'listings', label: 'Listings', icon: Truck, count: listings.length },
    { value: 'inquiries', label: 'Inquiries', icon: MessageSquare, count: mockInquiries.length },
    { value: 'users', label: 'Users', icon: Users, count: mockUsers.length },
    { value: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-charcoal-mid border-b border-charcoal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm mt-0.5">XFuel Marketplace Management</p>
            </div>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 border border-charcoal-border text-gray-300 text-sm font-medium rounded-lg hover:border-neon-blue/40 hover:text-neon-blue transition-colors"
            >
              <Download size={14} /> Export Leads CSV
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: 'Total Listings', value: listings.length, icon: Truck, color: 'text-white' },
              { label: 'Live Listings', value: live, icon: Eye, color: 'text-verified-green' },
              { label: 'Pending Review', value: pending, icon: TrendingUp, color: 'text-yellow-400' },
              { label: 'XFuel Verified', value: verified, icon: ShieldCheck, color: 'text-neon-blue' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-charcoal border border-charcoal-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs">{label}</span>
                  <Icon size={14} className={color} />
                </div>
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-charcoal-border mb-6">
          {tabs.map(({ value, label, icon: Icon, count }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === value ? 'border-neon-blue text-neon-blue' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              <Icon size={14} />
              {label}
              {count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded text-xs ${activeTab === value ? 'bg-neon-blue/20 text-neon-blue' : 'bg-charcoal-border text-gray-400'}`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold">All Listings</h2>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-verified-green/20 text-verified-green">{live} Live</span>
                <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">{pending} Pending</span>
                <span className="px-2 py-1 rounded bg-neon-blue/20 text-neon-blue">{featured} Featured</span>
              </div>
            </div>
            <AdminTable
              listings={listings}
              onVerify={handleVerify}
              onFeature={handleFeature}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold">Recent Inquiries</h2>
            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-charcoal-border bg-charcoal">
                  <tr>
                    {['Name', 'Type', 'Listing', 'Email', 'Date'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-border">
                  {mockInquiries.map((inq) => {
                    const listing = mockListings.find((l) => l.id === inq.listing_id);
                    return (
                      <tr key={inq.id} className="hover:bg-charcoal/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="text-white font-medium">{inq.name}</div>
                          <div className="text-gray-500 text-xs">{inq.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-neon-blue/20 text-neon-blue text-xs font-semibold capitalize">
                            {inq.inquiry_type.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-300 text-xs max-w-[200px] truncate">
                          {listing?.title || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{inq.email}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {new Date(inq.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold">Registered Users</h2>
            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-charcoal-border bg-charcoal">
                  <tr>
                    {['User', 'Email', 'Role', 'Joined'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-border">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-charcoal/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-charcoal-border rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
                          </div>
                          <span className="text-white font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${user.role === 'admin' ? 'bg-neon-blue/20 text-neon-blue' : user.role === 'seller' ? 'bg-verified-green/20 text-verified-green' : 'bg-gray-500/20 text-gray-400'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Listings by Status', items: [
                { key: 'Live', value: live, color: 'bg-verified-green' },
                { key: 'Pending', value: pending, color: 'bg-yellow-500' },
                { key: 'Draft', value: listings.filter(l => l.status === 'draft').length, color: 'bg-gray-500' },
                { key: 'Sold', value: listings.filter(l => l.status === 'sold').length, color: 'bg-purple-500' },
              ]},
              { label: 'Listings by Seller Type', items: [
                { key: 'Fleet', value: listings.filter(l => l.seller_type === 'fleet').length, color: 'bg-neon-blue' },
                { key: 'Dealer', value: listings.filter(l => l.seller_type === 'dealer').length, color: 'bg-blue-500' },
                { key: 'Private', value: listings.filter(l => l.seller_type === 'private').length, color: 'bg-purple-500' },
                { key: 'XFuel Partner', value: listings.filter(l => l.seller_type === 'xfuel-partner').length, color: 'bg-verified-green' },
              ]},
            ].map(({ label, items }) => (
              <div key={label} className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
                <h3 className="text-white font-semibold mb-5">{label}</h3>
                <div className="space-y-3">
                  {items.map(({ key, value, color }) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{key}</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                      <div className="h-2 bg-charcoal rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${color} transition-all`}
                          style={{ width: `${(value / listings.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
              <h3 className="text-white font-semibold mb-5">Average MPG Improvements</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Avg Before MPG</span>
                  <span className="text-white font-bold text-xl">
                    {(listings.reduce((s, l) => s + l.before_mpg, 0) / listings.length).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Avg After MPG</span>
                  <span className="text-verified-green font-bold text-xl">
                    {(listings.reduce((s, l) => s + l.after_mpg, 0) / listings.length).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-charcoal-border pt-3">
                  <span className="text-gray-400 text-sm">Avg Annual Savings</span>
                  <span className="text-neon-blue font-bold text-xl">
                    ${Math.round(listings.reduce((s, l) => s + l.estimated_savings, 0) / listings.length).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
              <h3 className="text-white font-semibold mb-5">Quick Actions</h3>
              <div className="space-y-2">
                <button onClick={exportCSV} className="w-full text-left px-4 py-3 bg-charcoal border border-charcoal-border rounded-lg text-sm text-gray-300 hover:text-white hover:border-neon-blue/30 transition-colors flex items-center gap-2">
                  <Download size={14} className="text-neon-blue" /> Export All Listings as CSV
                </button>
                <button className="w-full text-left px-4 py-3 bg-charcoal border border-charcoal-border rounded-lg text-sm text-gray-300 hover:text-white hover:border-neon-blue/30 transition-colors flex items-center gap-2">
                  <Download size={14} className="text-neon-blue" /> Export Inquiries as CSV
                </button>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="w-full text-left px-4 py-3 bg-charcoal border border-charcoal-border rounded-lg text-sm text-gray-300 hover:text-white hover:border-neon-blue/30 transition-colors flex items-center gap-2"
                >
                  <ShieldCheck size={14} className="text-verified-green" /> Review Pending Verifications ({pending})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
