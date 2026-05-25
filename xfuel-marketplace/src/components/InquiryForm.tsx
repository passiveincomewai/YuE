import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { InquiryType } from '../types';

interface Props {
  listingId: string;
  listingTitle: string;
  defaultType?: InquiryType;
}

const inquiryTypes: { value: InquiryType; label: string }[] = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'demo', label: 'Schedule Demo Drive' },
  { value: 'financing', label: 'Apply for Financing' },
  { value: 'offer', label: 'Make an Offer' },
  { value: 'verification-report', label: 'Request XFuel Verification Report' },
];

export default function InquiryForm({ listingId, listingTitle, defaultType = 'general' }: Props) {
  const [type, setType] = useState<InquiryType>(defaultType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const inquiry = {
        id: Date.now().toString(),
        listing_id: listingId,
        name, email, phone, message,
        inquiry_type: type,
        created_at: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('xfuel_inquiries') || '[]');
      localStorage.setItem('xfuel_inquiries', JSON.stringify([...existing, inquiry]));
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-verified-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-verified-green" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">Inquiry Sent!</h3>
        <p className="text-gray-400 text-sm mb-4">
          Your {inquiryTypes.find(t => t.value === type)?.label.toLowerCase()} has been received. The seller will contact you at <strong className="text-white">{email}</strong> within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-neon-blue text-sm hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Inquiry type */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Inquiry Type</label>
        <div className="flex flex-wrap gap-2">
          {inquiryTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${type === t.value ? 'bg-neon-blue text-black' : 'bg-charcoal border border-charcoal-border text-gray-300 hover:border-neon-blue/40'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name *</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2.5 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2.5 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 000-0000"
          className="w-full px-3 py-2.5 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5">Message</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Tell the seller about your interest in: ${listingTitle}`}
          className="w-full px-3 py-2.5 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-neon-blue-dark transition-colors shadow-neon-sm disabled:opacity-70"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {loading ? 'Sending...' : 'Send Inquiry'}
      </button>

      <p className="text-gray-600 text-xs text-center">
        By submitting, you agree to our <a href="/privacy" className="text-gray-500 hover:text-neon-blue">Privacy Policy</a>.
        Your contact info is shared only with the seller.
      </p>
    </form>
  );
}
