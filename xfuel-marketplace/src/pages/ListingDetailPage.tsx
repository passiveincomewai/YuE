import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Gauge, Fuel, Calendar, Wrench, DollarSign, Phone, Mail, FileText, PlayCircle, CreditCard, MessageSquare, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import { mockListings } from '../data/mockData';
import { Listing } from '../types';
import ListingGallery from '../components/ListingGallery';
import InquiryForm from '../components/InquiryForm';
import VerificationBadge from '../components/VerificationBadge';
import ListingCard from '../components/ListingCard';

const specsMap = (l: Listing) => [
  { label: 'Year', value: l.year },
  { label: 'Make', value: l.make },
  { label: 'Model', value: l.model },
  { label: 'Trim', value: l.trim },
  { label: 'Engine', value: l.engine },
  { label: 'Transmission', value: l.transmission },
  { label: 'Drivetrain', value: l.drivetrain },
  { label: 'Mileage', value: `${l.mileage.toLocaleString()} miles` },
  { label: 'Towing Capacity', value: l.towing_capacity },
  { label: 'Condition', value: l.condition.charAt(0).toUpperCase() + l.condition.slice(1) },
  ...(l.vin ? [{ label: 'VIN', value: l.vin }] : []),
];

export default function ListingDetailPage() {
  const { id } = useParams();
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-2">Listing Not Found</h2>
          <p className="text-gray-400 mb-6">This listing may have been removed or sold.</p>
          <Link to="/marketplace" className="px-6 py-3 bg-neon-blue text-black font-semibold rounded-lg">Browse All Listings</Link>
        </div>
      </div>
    );
  }

  const mpgGain = ((listing.after_mpg - listing.before_mpg) / listing.before_mpg * 100).toFixed(0);
  const specs = specsMap(listing as typeof mockListings[number]);
  const related = mockListings.filter((l) => l.id !== id && l.vehicle_type === listing.vehicle_type).slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <div className="bg-charcoal-mid border-b border-charcoal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-[200px]">{listing.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <ListingGallery images={listing.image_urls} title={listing.title} />

            {/* Title & price */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <VerificationBadge verified={listing.xfuel_verified} installed={listing.xfuel_installed} size="lg" />
                  {listing.featured && (
                    <span className="px-3 py-1.5 rounded-full bg-neon-blue/15 border border-neon-blue/40 text-neon-blue text-sm font-semibold">Featured</span>
                  )}
                  {listing.demo_available && (
                    <span className="px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-sm font-semibold">Demo Available</span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">{listing.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                  <span className="flex items-center gap-1"><MapPin size={13} /> {listing.location}</span>
                  <span className="flex items-center gap-1"><Gauge size={13} /> {listing.mileage.toLocaleString()} mi</span>
                  <span className="flex items-center gap-1 capitalize"><Wrench size={13} /> {listing.condition}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-white">${listing.price.toLocaleString()}</div>
                <div className="text-gray-500 text-sm">{listing.seller_type.replace('-', ' ')} seller</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
              <h2 className="text-white font-bold mb-3">Description</h2>
              <p className="text-gray-300 leading-relaxed text-sm">{listing.description}</p>
            </div>

            {/* Vehicle Specs */}
            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
              <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                <Wrench size={18} className="text-neon-blue" />
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-charcoal rounded-lg p-3">
                    <div className="text-gray-500 text-xs mb-0.5">{spec.label}</div>
                    <div className="text-white text-sm font-semibold">{String(spec.value)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* XFuel Upgrade Section */}
            <div className="bg-charcoal-mid border border-neon-blue/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent pointer-events-none" />
              <h2 className="text-white font-bold mb-4 flex items-center gap-2 relative">
                <Fuel size={18} className="text-neon-blue" />
                XFuel Upgrade Details
              </h2>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-charcoal rounded-lg p-4">
                  <div className="text-gray-500 text-xs mb-1">Install Date</div>
                  <div className="text-white font-semibold">{new Date(listing.install_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div className="bg-charcoal rounded-lg p-4">
                  <div className="text-gray-500 text-xs mb-1">Installer / Partner</div>
                  <div className="text-white font-semibold text-sm">{listing.installer_name}</div>
                </div>
                <div className="bg-charcoal rounded-lg p-4">
                  <div className="text-gray-500 text-xs mb-1">Verification Status</div>
                  <VerificationBadge verified={listing.xfuel_verified} installed={listing.xfuel_installed} />
                </div>
                <div className="bg-charcoal rounded-lg p-4">
                  <div className="text-gray-500 text-xs mb-1">Est. Annual Fuel Savings</div>
                  <div className="text-verified-green font-bold text-lg">${listing.estimated_savings.toLocaleString()}</div>
                </div>
              </div>

              {/* MPG Improvement Visual */}
              <div className="bg-charcoal rounded-xl p-5">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <TrendingUp size={14} className="text-verified-green" />
                  Documented MPG Improvement
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-gray-500 text-xs mb-1">Before XFuel</div>
                    <div className="text-2xl font-bold text-gray-300">{listing.before_mpg} <span className="text-base font-normal text-gray-500">MPG</span></div>
                    <div className="mt-2 h-2 bg-charcoal-border rounded-full">
                      <div className="h-2 rounded-full bg-gray-500" style={{ width: `${(listing.before_mpg / 20) * 100}%` }} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neon-blue">→</div>
                  <div className="flex-1">
                    <div className="text-gray-500 text-xs mb-1">After XFuel</div>
                    <div className="text-2xl font-bold text-verified-green">{listing.after_mpg} <span className="text-base font-normal text-gray-500">MPG</span></div>
                    <div className="mt-2 h-2 bg-charcoal-border rounded-full">
                      <div className="h-2 rounded-full bg-verified-green" style={{ width: `${(listing.after_mpg / 20) * 100}%` }} />
                    </div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-3xl font-black text-neon-blue">+{mpgGain}%</div>
                    <div className="text-gray-500 text-xs">efficiency gain</div>
                  </div>
                </div>
              </div>

              {listing.test_route_notes && (
                <div className="mt-4 bg-charcoal rounded-lg p-4">
                  <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Test Route Notes</div>
                  <p className="text-gray-300 text-sm">{listing.test_route_notes}</p>
                </div>
              )}

              {listing.xfuel_verified && (
                <div className="mt-4 flex items-start gap-3 bg-verified-green/10 border border-verified-green/20 rounded-lg p-4">
                  <ShieldCheck size={18} className="text-verified-green shrink-0 mt-0.5" />
                  <div>
                    <div className="text-verified-green font-semibold text-sm">XFuel Verified Install</div>
                    <div className="text-gray-400 text-xs mt-0.5">This listing has been reviewed and the XFuel installation has been independently verified by XFuel staff.</div>
                  </div>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
              <h2 className="text-white font-bold mb-4">Seller Information</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-charcoal-border rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{listing.seller_name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{listing.seller_name}</div>
                  <div className="text-neon-blue text-sm capitalize">{listing.seller_type.replace('-', ' ')} Seller</div>
                  <div className="mt-3 space-y-2">
                    <a href={`mailto:${listing.seller_email}`} className="flex items-center gap-2 text-gray-400 hover:text-neon-blue text-sm transition-colors">
                      <Mail size={14} /> {listing.seller_email}
                    </a>
                    <a href={`tel:${listing.seller_phone}`} className="flex items-center gap-2 text-gray-400 hover:text-neon-blue text-sm transition-colors">
                      <Phone size={14} /> {listing.seller_phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <AlertTriangle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-yellow-200/70 text-xs leading-relaxed">
                XFuel Marketplace connects buyers and sellers of vehicles equipped with XFuel systems. Fuel economy results may vary based on vehicle condition, driving habits, load, terrain, maintenance, and installation quality. Listings and performance claims should be verified independently before purchase.
              </p>
            </div>
          </div>

          {/* Right — contact panel */}
          <div className="space-y-4">
            <div className="sticky top-24 space-y-4">
              {/* Quick actions */}
              <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5 space-y-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</div>
                {[
                  { icon: MessageSquare, label: 'Contact Seller', type: 'general' as const, style: 'bg-neon-blue text-black hover:bg-neon-blue-dark shadow-neon-sm' },
                  { icon: FileText, label: 'Request Verification Report', type: 'verification-report' as const, style: 'border border-verified-green/40 text-verified-green hover:bg-verified-green/10' },
                  { icon: PlayCircle, label: 'Schedule Demo Drive', type: 'demo' as const, style: 'border border-purple-400/40 text-purple-300 hover:bg-purple-400/10' },
                  { icon: CreditCard, label: 'Apply for Financing', type: 'financing' as const, style: 'border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10' },
                  { icon: DollarSign, label: 'Make an Offer', type: 'offer' as const, style: 'border border-charcoal-border text-gray-300 hover:border-gray-400' },
                ].map(({ icon: Icon, label, style }) => (
                  <button
                    key={label}
                    onClick={() => {
                      document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${style}`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Numbers</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Before MPG</span>
                    <span className="text-white font-semibold">{listing.before_mpg}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">After MPG</span>
                    <span className="text-verified-green font-semibold">{listing.after_mpg}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">MPG Improvement</span>
                    <span className="text-neon-blue font-bold">+{mpgGain}%</span>
                  </div>
                  <div className="border-t border-charcoal-border pt-3 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Est. Annual Savings</span>
                    <span className="text-verified-green font-bold">${listing.estimated_savings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Financing Available</span>
                    <span className={`text-sm font-semibold ${listing.financing_available ? 'text-neon-blue' : 'text-gray-500'}`}>
                      {listing.financing_available ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div id="inquiry-form" className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5">
                <h3 className="text-white font-bold mb-4">Send an Inquiry</h3>
                <InquiryForm listingId={listing.id} listingTitle={listing.title} />
              </div>

              {/* Calendar */}
              <div className="bg-charcoal border border-charcoal-border rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">Listed</div>
                <div className="text-white text-sm font-semibold">
                  {new Date(listing.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={11} /> {listing.year}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} /> {listing.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-5">Similar Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
