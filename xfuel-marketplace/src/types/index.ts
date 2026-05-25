export type SellerType = 'private' | 'dealer' | 'fleet' | 'xfuel-partner';
export type ListingStatus = 'draft' | 'pending-verification' | 'live' | 'sold';
export type InquiryType = 'general' | 'demo' | 'financing' | 'offer' | 'verification-report';
export type UserRole = 'buyer' | 'seller' | 'admin';
export type VehicleType = 'semi-truck' | 'dump-truck' | 'pickup' | 'box-truck' | 'flatbed' | 'tanker' | 'utility' | 'snow-removal' | 'other';

export interface Listing {
  id: string;
  title: string;
  price: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  engine: string;
  transmission: string;
  drivetrain: string;
  vehicle_type: VehicleType;
  location: string;
  description: string;
  image_urls: string[];
  seller_name: string;
  seller_email: string;
  seller_phone: string;
  seller_type: SellerType;
  xfuel_installed: boolean;
  xfuel_verified: boolean;
  install_date: string;
  installer_name: string;
  before_mpg: number;
  after_mpg: number;
  estimated_savings: number;
  towing_capacity: string;
  condition: 'excellent' | 'good' | 'fair';
  vin?: string;
  test_route_notes?: string;
  demo_available: boolean;
  financing_available: boolean;
  status: ListingStatus;
  created_at: string;
  featured?: boolean;
}

export interface Inquiry {
  id: string;
  listing_id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiry_type: InquiryType;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface FilterState {
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  make: string;
  vehicleType: string;
  mileageMax: string;
  location: string;
  xfuelVerified: boolean;
  demoAvailable: boolean;
  financingAvailable: boolean;
  sellerType: string;
  engineType: string;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'mileage' | 'verified';
