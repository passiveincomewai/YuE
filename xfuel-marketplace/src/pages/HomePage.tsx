import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap, PlayCircle, Users, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { mockListings } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import StatCard from '../components/StatCard';

const steps = [
  { num: '01', title: 'Seller Lists XFuel-Equipped Truck', desc: 'Sellers submit their vehicle details, XFuel install documentation, before/after MPG data, and photos.' },
  { num: '02', title: 'XFuel Verifies the Install', desc: 'Our team reviews installer credentials, documentation, and independently validates fuel economy claims.' },
  { num: '03', title: 'Buyer Requests Info, Financing, or Demo', desc: 'Buyers browse verified listings, request verification reports, schedule demo drives, or apply for financing.' },
  { num: '04', title: 'Transaction via Approved Partners', desc: 'Deals are completed directly or through XFuel-approved financing and logistics partners.' },
];

const segments = [
  { label: 'Fleet Owners', desc: 'Reduce your fuel spend across your entire fleet.' },
  { label: 'Long-Haul Operators', desc: 'Every MPG gained is thousands saved annually.' },
  { label: 'Snow Removal Companies', desc: 'Idle-heavy equipment benefits most from XFuel.' },
  { label: 'Oilfield Operators', desc: 'Harsh conditions, high loads — XFuel delivers.' },
  { label: 'Municipalities', desc: 'Lower costs, better public ROI on diesel fleets.' },
  { label: 'Logistics & Delivery', desc: 'Improve P&L on every urban cycle route.' },
];

export default function HomePage() {
  const featured = mockListings.filter((l) => l.featured);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop"
            alt="XFuel equipped truck"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50" />
          {/* Neon grid effect */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-blue/40 bg-neon-blue/10 text-neon-blue text-xs font-semibold mb-6">
              <Zap size={12} fill="currentColor" />
              XFuel Hydrolysis Technology
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6">
              Buy XFuel-Equipped Trucks{' '}
              <span className="text-neon-blue">Ready for the Future</span>{' '}
              of Diesel Efficiency
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Browse verified trucks and commercial vehicles upgraded with XFuel hydrolysis technology. Proven MPG improvements. Documented installs. Fleet-ready inventory.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neon-blue text-black font-bold text-base rounded-lg hover:bg-neon-blue-dark transition-colors shadow-neon"
              >
                <Truck size={18} />
                Browse Listings
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/seller-dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neon-blue/40 text-neon-blue font-bold text-base rounded-lg hover:bg-neon-blue/10 transition-colors"
              >
                List Your XFuel Truck
              </Link>
              <Link
                to="/forms"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium text-base rounded-lg hover:border-white/40 transition-colors"
              >
                <PlayCircle size={16} />
                Request a Demo
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4">
              {[
                { icon: ShieldCheck, text: 'XFuel Verified Installs' },
                { icon: Award, text: 'Certified Partner Network' },
                { icon: TrendingUp, text: 'Documented MPG Gains' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon size={14} className="text-neon-blue" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal-mid border-y border-charcoal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={ShieldCheck} value="847+" label="Verified XFuel Installs" sub="Across North America" accent />
            <StatCard icon={Truck} value="312" label="Fleet-Ready Vehicles" sub="Listed & available" />
            <StatCard icon={TrendingUp} value="23-31%" label="Diesel Efficiency Gains" sub="Documented average" />
            <StatCard icon={PlayCircle} value="48" label="Demo Trucks Available" sub="Schedule a drive" />
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Listings</h2>
              <p className="text-gray-400 mt-1">Hand-picked XFuel-equipped vehicles</p>
            </div>
            <Link
              to="/marketplace"
              className="flex items-center gap-1 text-neon-blue text-sm font-semibold hover:underline"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-charcoal-mid border-y border-charcoal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">How XFuel Marketplace Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">A transparent, verified process from listing to purchase.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-neon-blue/40 to-transparent z-0" />
                )}
                <div className="relative bg-charcoal border border-charcoal-border rounded-xl p-6 hover:border-neon-blue/30 transition-colors">
                  <div className="text-4xl font-black text-neon-blue/30 mb-3">{step.num}</div>
                  <h3 className="text-white font-bold mb-2 leading-snug">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Fleet Buyers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-charcoal-mid border border-neon-blue/20 rounded-2xl p-8 sm:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/30 text-neon-blue text-xs font-semibold mb-4">
                  <Users size={12} />
                  Fleet Buyers
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Buying Multiple Trucks for Your Fleet?
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  XFuel Marketplace works directly with fleet buyers to source multiple XFuel-equipped vehicles, coordinate demo drives, arrange financing, and manage verification documentation for your entire acquisition.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {segments.map((s) => (
                    <div key={s.label} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-1.5 shrink-0" />
                      <div>
                        <div className="text-white text-sm font-semibold">{s.label}</div>
                        <div className="text-gray-500 text-xs">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Link
                  to="/forms"
                  className="flex items-center justify-between w-full px-6 py-4 bg-neon-blue text-black font-bold rounded-xl hover:bg-neon-blue-dark transition-colors shadow-neon group"
                >
                  <span>Submit Fleet Buyer Request</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/forms"
                  className="flex items-center justify-between w-full px-6 py-4 border border-neon-blue/30 text-neon-blue font-semibold rounded-xl hover:bg-neon-blue/10 transition-colors group"
                >
                  <span>Schedule a Fleet Demo</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/forms"
                  className="flex items-center justify-between w-full px-6 py-4 border border-charcoal-border text-gray-300 font-medium rounded-xl hover:border-gray-500 transition-colors group"
                >
                  <span>Request Financing Options</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-charcoal border border-charcoal-border rounded-xl p-5">
            <p className="text-gray-500 text-xs leading-relaxed text-center">
              <strong className="text-gray-400">Disclaimer:</strong> XFuel Marketplace connects buyers and sellers of vehicles equipped with XFuel systems. Fuel economy results may vary based on vehicle condition, driving habits, load, terrain, maintenance, and installation quality. Listings and performance claims should be verified independently before purchase.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
