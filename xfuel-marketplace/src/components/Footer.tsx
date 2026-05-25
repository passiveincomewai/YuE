import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-mid border-t border-charcoal-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-neon-blue rounded flex items-center justify-center shadow-neon-sm">
                <Zap size={18} className="text-black" fill="black" />
              </div>
              <div>
                <span className="text-white font-bold text-lg leading-none">XFuel</span>
                <span className="block text-neon-blue text-xs font-medium leading-none tracking-wider">MARKETPLACE</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The trusted marketplace for XFuel-equipped trucks and commercial vehicles. Connecting buyers and sellers across North America.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={14} />
              <span>North America</span>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Marketplace</h3>
            <ul className="space-y-2">
              {[
                { to: '/marketplace', label: 'Browse All Listings' },
                { to: '/marketplace', label: 'Semi Trucks' },
                { to: '/marketplace', label: 'Dump Trucks' },
                { to: '/marketplace', label: 'Pickup Trucks' },
                { to: '/marketplace', label: 'Fleet Vehicles' },
                { to: '/seller-dashboard', label: 'List Your Truck' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-400 hover:text-neon-blue text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {[
                { to: '/about', label: 'About XFuel Marketplace' },
                { to: '/how-verification-works', label: 'How Verification Works' },
                { to: '/forms', label: 'Request a Demo' },
                { to: '/forms', label: 'Fleet Buyer Request' },
                { to: '/forms', label: 'Financing Request' },
                { to: '/admin', label: 'Admin Portal' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-400 hover:text-neon-blue text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:marketplace@xfuel.net" className="flex items-center gap-2 text-gray-400 hover:text-neon-blue text-sm transition-colors">
                  <Mail size={14} />
                  marketplace@xfuel.net
                </a>
              </li>
              <li>
                <a href="tel:+18005555000" className="flex items-center gap-2 text-gray-400 hover:text-neon-blue text-sm transition-colors">
                  <Phone size={14} />
                  1-800-555-0000
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                to="/forms"
                className="inline-block px-4 py-2 bg-neon-blue text-black text-sm font-semibold rounded hover:bg-neon-blue-dark transition-colors shadow-neon-sm"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-charcoal-border">
          <div className="bg-charcoal rounded-lg p-4 mb-6">
            <p className="text-gray-500 text-xs leading-relaxed">
              <strong className="text-gray-400">Disclaimer:</strong> XFuel Marketplace connects buyers and sellers of vehicles equipped with XFuel systems. Fuel economy results may vary based on vehicle condition, driving habits, load, terrain, maintenance, and installation quality. Listings and performance claims should be verified independently before purchase. XFuel Marketplace does not guarantee the accuracy of seller-provided information.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} XFuel Marketplace. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/seller-terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Seller Terms</Link>
              <Link to="/buyer-disclaimer" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Buyer Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
