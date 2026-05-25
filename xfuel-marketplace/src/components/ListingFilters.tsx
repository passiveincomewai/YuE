import { FilterState } from '../types';
import { X, SlidersHorizontal } from 'lucide-react';

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
  resultCount: number;
}

const makes = ['All Makes', 'Peterbilt', 'Kenworth', 'Freightliner', 'Volvo', 'Mack', 'International', 'Western Star', 'Ford', 'Ram', 'Chevrolet', 'GMC'];
const vehicleTypes = ['All Types', 'semi-truck', 'dump-truck', 'pickup', 'box-truck', 'flatbed', 'tanker', 'utility', 'snow-removal', 'other'];
const sellerTypes = ['All Sellers', 'private', 'dealer', 'fleet', 'xfuel-partner'];

export default function ListingFilters({ filters, onChange, onReset, isOpen, onToggle, resultCount }: Props) {
  const update = (key: keyof FilterState, value: string | boolean) =>
    onChange({ ...filters, [key]: value });

  const labelMap: Record<string, string> = {
    'semi-truck': 'Semi Truck', 'dump-truck': 'Dump Truck', 'box-truck': 'Box Truck',
    'snow-removal': 'Snow Removal', 'xfuel-partner': 'XFuel Partner',
  };
  const fmt = (v: string) => labelMap[v] || v.charAt(0).toUpperCase() + v.slice(1);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={onToggle}
        className="flex md:hidden items-center gap-2 px-4 py-2.5 bg-charcoal-mid border border-charcoal-border rounded-lg text-sm font-medium text-white w-full justify-center mb-4"
      >
        <SlidersHorizontal size={16} />
        Filters & Sort
        {resultCount > 0 && (
          <span className="ml-auto bg-neon-blue text-black text-xs font-bold px-2 py-0.5 rounded-full">{resultCount}</span>
        )}
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-neon-blue" />
                Filter Results
              </h3>
              <p className="text-gray-500 text-xs mt-0.5">{resultCount} vehicles found</p>
            </div>
            <button onClick={onReset} className="text-xs text-gray-400 hover:text-neon-blue flex items-center gap-1 transition-colors">
              <X size={12} /> Reset
            </button>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min $"
                value={filters.priceMin}
                onChange={(e) => update('priceMin', e.target.value)}
                className="flex-1 px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
              />
              <input
                type="number"
                placeholder="Max $"
                value={filters.priceMax}
                onChange={(e) => update('priceMax', e.target.value)}
                className="flex-1 px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
              />
            </div>
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Year</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="From"
                value={filters.yearMin}
                onChange={(e) => update('yearMin', e.target.value)}
                className="flex-1 px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
              />
              <input
                type="number"
                placeholder="To"
                value={filters.yearMax}
                onChange={(e) => update('yearMax', e.target.value)}
                className="flex-1 px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
              />
            </div>
          </div>

          {/* Make */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Make</label>
            <select
              value={filters.make}
              onChange={(e) => update('make', e.target.value)}
              className="w-full px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white focus:outline-none focus:border-neon-blue/60"
            >
              {makes.map((m) => <option key={m} value={m === 'All Makes' ? '' : m}>{m}</option>)}
            </select>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Vehicle Type</label>
            <select
              value={filters.vehicleType}
              onChange={(e) => update('vehicleType', e.target.value)}
              className="w-full px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white focus:outline-none focus:border-neon-blue/60"
            >
              {vehicleTypes.map((t) => (
                <option key={t} value={t === 'All Types' ? '' : t}>{t === 'All Types' ? 'All Types' : fmt(t)}</option>
              ))}
            </select>
          </div>

          {/* Max Mileage */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Max Mileage</label>
            <input
              type="number"
              placeholder="e.g. 500000"
              value={filters.mileageMax}
              onChange={(e) => update('mileageMax', e.target.value)}
              className="w-full px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Location</label>
            <input
              type="text"
              placeholder="City, State"
              value={filters.location}
              onChange={(e) => update('location', e.target.value)}
              className="w-full px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
            />
          </div>

          {/* Seller Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Seller Type</label>
            <select
              value={filters.sellerType}
              onChange={(e) => update('sellerType', e.target.value)}
              className="w-full px-3 py-2 bg-charcoal border border-charcoal-border rounded text-sm text-white focus:outline-none focus:border-neon-blue/60"
            >
              {sellerTypes.map((t) => (
                <option key={t} value={t === 'All Sellers' ? '' : t}>{t === 'All Sellers' ? 'All Sellers' : fmt(t)}</option>
              ))}
            </select>
          </div>

          {/* Toggle Filters */}
          <div className="space-y-2.5 pt-1 border-t border-charcoal-border">
            {[
              { key: 'xfuelVerified' as const, label: 'XFuel Verified Only' },
              { key: 'demoAvailable' as const, label: 'Demo Available' },
              { key: 'financingAvailable' as const, label: 'Financing Available' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => update(key, !filters[key])}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${filters[key] ? 'bg-neon-blue' : 'bg-charcoal-border'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
