import { Listing } from '../types';
import { ShieldCheck, Star, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import VerificationBadge from './VerificationBadge';

interface Props {
  listings: Listing[];
  onVerify: (id: string) => void;
  onFeature: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function AdminTable({ listings, onVerify, onFeature, onApprove, onReject }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-charcoal-border">
      <table className="w-full text-sm">
        <thead className="bg-charcoal-mid border-b border-charcoal-border">
          <tr>
            {['Vehicle', 'Seller', 'Price', 'Status', 'Verification', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal-border">
          {listings.map((listing) => (
            <tr key={listing.id} className="bg-charcoal hover:bg-charcoal-mid transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={listing.image_urls[0]}
                    alt={listing.title}
                    className="w-12 h-8 rounded object-cover shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=80&fit=crop'; }}
                  />
                  <div>
                    <div className="text-white font-medium text-xs leading-snug max-w-[200px] truncate">{listing.title}</div>
                    <div className="text-gray-500 text-xs">{listing.year} · {listing.location}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-white text-xs">{listing.seller_name}</div>
                <div className="text-gray-500 text-xs capitalize">{listing.seller_type.replace('-', ' ')}</div>
              </td>
              <td className="px-4 py-3 text-white font-semibold text-xs whitespace-nowrap">
                ${listing.price.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                  listing.status === 'live' ? 'bg-verified-green/20 text-verified-green' :
                  listing.status === 'pending-verification' ? 'bg-yellow-500/20 text-yellow-400' :
                  listing.status === 'sold' ? 'bg-gray-500/20 text-gray-400' :
                  'bg-charcoal-border text-gray-400'
                }`}>
                  {listing.status.replace('-', ' ')}
                </span>
              </td>
              <td className="px-4 py-3">
                <VerificationBadge verified={listing.xfuel_verified} installed={listing.xfuel_installed} size="sm" />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <Link
                    to={`/listing/${listing.id}`}
                    className="p-1.5 rounded bg-charcoal-mid hover:bg-charcoal-border text-gray-400 hover:text-white transition-colors"
                    title="View Listing"
                  >
                    <Eye size={14} />
                  </Link>
                  {!listing.xfuel_verified && (
                    <button
                      onClick={() => onVerify(listing.id)}
                      className="p-1.5 rounded bg-verified-green/10 hover:bg-verified-green/20 text-verified-green transition-colors"
                      title="Mark as Verified"
                    >
                      <ShieldCheck size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => onFeature(listing.id)}
                    className={`p-1.5 rounded transition-colors ${listing.featured ? 'bg-yellow-500/20 text-yellow-400' : 'bg-charcoal-mid hover:bg-charcoal-border text-gray-400 hover:text-yellow-400'}`}
                    title={listing.featured ? 'Unfeature' : 'Feature'}
                  >
                    <Star size={14} fill={listing.featured ? 'currentColor' : 'none'} />
                  </button>
                  {listing.status !== 'live' && (
                    <button
                      onClick={() => onApprove(listing.id)}
                      className="p-1.5 rounded bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue transition-colors"
                      title="Approve"
                    >
                      <CheckCircle size={14} />
                    </button>
                  )}
                  {listing.status === 'live' && (
                    <button
                      onClick={() => onReject(listing.id)}
                      className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Reject/Remove"
                    >
                      <XCircle size={14} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
