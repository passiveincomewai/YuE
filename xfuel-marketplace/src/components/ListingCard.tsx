import { Link } from 'react-router-dom';
import { MapPin, Gauge, Fuel, TrendingUp, Calendar } from 'lucide-react';
import { Listing } from '../types';
import VerificationBadge from './VerificationBadge';

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  const mpgGain = ((listing.after_mpg - listing.before_mpg) / listing.before_mpg * 100).toFixed(0);

  return (
    <div className="group bg-charcoal-mid border border-charcoal-border rounded-xl overflow-hidden shadow-card hover:border-neon-blue/40 hover:shadow-neon transition-all duration-200">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-charcoal">
        <img
          src={listing.image_urls[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <VerificationBadge verified={listing.xfuel_verified} installed={listing.xfuel_installed} size="sm" />
          {listing.featured && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-neon-blue/90 text-black text-xs font-bold">
              Featured
            </span>
          )}
        </div>

        {listing.demo_available && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded-full bg-purple-500/80 text-white text-xs font-semibold">Demo Available</span>
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="text-white font-bold text-xl drop-shadow-lg">
            ${listing.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-snug mb-3 line-clamp-2 group-hover:text-neon-blue transition-colors">
          {listing.title}
        </h3>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <MapPin size={12} className="text-neon-blue/60 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Gauge size={12} className="text-neon-blue/60 shrink-0" />
            <span>{listing.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Fuel size={12} className="text-neon-blue/60 shrink-0" />
            <span className="truncate">{listing.engine.split(' ').slice(0, 3).join(' ')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Calendar size={12} className="text-neon-blue/60 shrink-0" />
            <span>{listing.year}</span>
          </div>
        </div>

        {/* MPG improvement */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-charcoal border border-charcoal-border mb-3">
          <TrendingUp size={14} className="text-verified-green shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-400">Est. MPG Improvement</div>
            <div className="text-sm font-semibold">
              <span className="text-gray-300">{listing.before_mpg}</span>
              <span className="text-gray-500 mx-1">→</span>
              <span className="text-verified-green">{listing.after_mpg} MPG</span>
              <span className="text-verified-green ml-1 text-xs">(+{mpgGain}%)</span>
            </div>
          </div>
          {listing.financing_available && (
            <span className="text-xs text-neon-blue border border-neon-blue/30 rounded px-1.5 py-0.5 shrink-0">Financing</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="text-xs text-gray-500 capitalize">{listing.seller_type.replace('-', ' ')} seller</div>
          <Link
            to={`/listing/${listing.id}`}
            className="px-4 py-2 bg-neon-blue text-black text-xs font-bold rounded hover:bg-neon-blue-dark transition-colors shadow-neon-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
