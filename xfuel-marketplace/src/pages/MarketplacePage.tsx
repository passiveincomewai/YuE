import { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { mockListings } from '../data/mockData';
import { FilterState, SortOption } from '../types';
import ListingCard from '../components/ListingCard';
import ListingFilters from '../components/ListingFilters';

const defaultFilters: FilterState = {
  priceMin: '', priceMax: '', yearMin: '', yearMax: '',
  make: '', vehicleType: '', mileageMax: '', location: '',
  xfuelVerified: false, demoAvailable: false, financingAvailable: false,
  sellerType: '', engineType: '',
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'mileage', label: 'Lowest Mileage' },
  { value: 'verified', label: 'Verified First' },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...mockListings].filter((l) => l.status === 'live');

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((l) =>
        l.title.toLowerCase().includes(q) ||
        l.make.toLowerCase().includes(q) ||
        l.model.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.engine.toLowerCase().includes(q)
      );
    }

    if (filters.priceMin) list = list.filter((l) => l.price >= Number(filters.priceMin));
    if (filters.priceMax) list = list.filter((l) => l.price <= Number(filters.priceMax));
    if (filters.yearMin) list = list.filter((l) => l.year >= Number(filters.yearMin));
    if (filters.yearMax) list = list.filter((l) => l.year <= Number(filters.yearMax));
    if (filters.make) list = list.filter((l) => l.make === filters.make);
    if (filters.vehicleType) list = list.filter((l) => l.vehicle_type === filters.vehicleType);
    if (filters.mileageMax) list = list.filter((l) => l.mileage <= Number(filters.mileageMax));
    if (filters.location) list = list.filter((l) => l.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.sellerType) list = list.filter((l) => l.seller_type === filters.sellerType);
    if (filters.xfuelVerified) list = list.filter((l) => l.xfuel_verified);
    if (filters.demoAvailable) list = list.filter((l) => l.demo_available);
    if (filters.financingAvailable) list = list.filter((l) => l.financing_available);

    switch (sort) {
      case 'price-low': list.sort((a, b) => a.price - b.price); break;
      case 'price-high': list.sort((a, b) => b.price - a.price); break;
      case 'mileage': list.sort((a, b) => a.mileage - b.mileage); break;
      case 'verified': list.sort((a, b) => Number(b.xfuel_verified) - Number(a.xfuel_verified)); break;
      default: list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return list;
  }, [search, filters, sort]);

  return (
    <div className="min-h-screen pt-16">
      {/* Page header */}
      <div className="bg-charcoal-mid border-b border-charcoal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">XFuel Vehicle Marketplace</h1>
          <p className="text-gray-400">Browse verified trucks & commercial vehicles with XFuel installed</p>

          {/* Search bar */}
          <div className="mt-5 flex gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by make, model, location, engine..."
                className="w-full pl-10 pr-4 py-3 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
              />
            </div>
            <div className="relative">
              <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="pl-9 pr-4 py-3 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white focus:outline-none focus:border-neon-blue/60 appearance-none cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Filters sidebar */}
          <div className="w-64 shrink-0 hidden md:block">
            <div className="sticky top-24">
              <ListingFilters
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(defaultFilters)}
                isOpen={true}
                onToggle={() => {}}
                resultCount={filtered.length}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filters */}
            <div className="md:hidden mb-4">
              <ListingFilters
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(defaultFilters)}
                isOpen={filtersOpen}
                onToggle={() => setFiltersOpen(!filtersOpen)}
                resultCount={filtered.length}
              />
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-gray-400 text-sm">
                <span className="text-white font-semibold">{filtered.length}</span> vehicles found
              </p>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-charcoal-mid rounded-xl border border-charcoal-border">
                <Search size={40} className="text-gray-600 mx-auto mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">No vehicles match your filters</h3>
                <p className="text-gray-400 text-sm mb-4">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => { setSearch(''); setFilters(defaultFilters); }}
                  className="px-4 py-2 bg-neon-blue text-black text-sm font-semibold rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
