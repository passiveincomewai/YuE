import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-neon-blue rounded flex items-center justify-center shadow-neon-sm">
              <Zap size={18} className="text-black" fill="black" />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none">XFuel</span>
              <span className="block text-neon-blue text-xs font-medium leading-none tracking-wider">MARKETPLACE</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${isActive('/') ? 'text-neon-blue' : 'text-gray-300 hover:text-white'}`}
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${isActive('/marketplace') ? 'text-neon-blue' : 'text-gray-300 hover:text-white'}`}
            >
              Browse Listings
            </Link>
            <Link
              to="/seller-dashboard"
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${isActive('/seller-dashboard') ? 'text-neon-blue' : 'text-gray-300 hover:text-white'}`}
            >
              Sell a Truck
            </Link>

            {/* Pages dropdown */}
            <div className="relative">
              <button
                onClick={() => setPagesOpen(!pagesOpen)}
                className="flex items-center gap-1 px-4 py-2 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Resources <ChevronDown size={14} />
              </button>
              {pagesOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-charcoal-mid border border-charcoal-border rounded-lg shadow-card overflow-hidden">
                  {[
                    { to: '/about', label: 'About XFuel Marketplace' },
                    { to: '/how-verification-works', label: 'How Verification Works' },
                    { to: '/forms', label: 'Request Forms' },
                    { to: '/contact', label: 'Contact' },
                    { to: '/seller-terms', label: 'Seller Terms' },
                    { to: '/privacy', label: 'Privacy Policy' },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setPagesOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-charcoal-border transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/admin"
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${isActive('/admin') ? 'text-neon-blue' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Admin
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/forms"
              className="px-4 py-2 text-sm font-medium text-neon-blue border border-neon-blue/40 rounded hover:bg-neon-blue/10 transition-colors"
            >
              Request Demo
            </Link>
            <Link
              to="/seller-dashboard"
              className="px-4 py-2 text-sm font-semibold bg-neon-blue text-black rounded hover:bg-neon-blue-dark transition-colors shadow-neon-sm"
            >
              List Your Truck
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-charcoal-border bg-charcoal-mid">
          <div className="px-4 py-3 space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/marketplace', label: 'Browse Listings' },
              { to: '/seller-dashboard', label: 'Sell a Truck' },
              { to: '/forms', label: 'Request Forms' },
              { to: '/about', label: 'About' },
              { to: '/how-verification-works', label: 'How Verification Works' },
              { to: '/contact', label: 'Contact' },
              { to: '/admin', label: 'Admin Dashboard' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded text-sm font-medium ${isActive(item.to) ? 'text-neon-blue bg-neon-blue/10' : 'text-gray-300 hover:text-white'}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-charcoal-border flex flex-col gap-2">
              <Link
                to="/seller-dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold bg-neon-blue text-black rounded"
              >
                List Your Truck
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
