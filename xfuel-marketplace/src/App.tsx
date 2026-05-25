import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ListingDetailPage from './pages/ListingDetailPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import FormsPage from './pages/FormsPage';
import {
  AboutPage,
  HowVerificationWorksPage,
  SellerTermsPage,
  BuyerDisclaimerPage,
  PrivacyPolicyPage,
  ContactPage,
} from './pages/StaticPages';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-charcoal font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/seller-dashboard" element={<SellerDashboardPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-verification-works" element={<HowVerificationWorksPage />} />
            <Route path="/seller-terms" element={<SellerTermsPage />} />
            <Route path="/buyer-disclaimer" element={<BuyerDisclaimerPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
