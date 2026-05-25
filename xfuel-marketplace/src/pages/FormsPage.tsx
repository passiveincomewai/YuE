import { useState } from 'react';
import { CheckCircle, Truck, Users, PlayCircle, CreditCard, Star, MessageSquare } from 'lucide-react';

type FormType = 'buyer' | 'seller' | 'fleet' | 'demo' | 'financing' | 'influencer';

const forms: { type: FormType; icon: typeof Truck; label: string; desc: string; color: string }[] = [
  { type: 'buyer', icon: MessageSquare, label: 'Buyer Inquiry', desc: 'Ask about a specific vehicle or the marketplace.', color: 'text-neon-blue' },
  { type: 'seller', icon: Truck, label: 'Seller Application', desc: 'Apply to list your XFuel-equipped vehicle.', color: 'text-verified-green' },
  { type: 'fleet', icon: Users, label: 'Fleet Buyer Request', desc: 'Sourcing multiple trucks for your fleet.', color: 'text-purple-400' },
  { type: 'demo', icon: PlayCircle, label: 'Demo Truck Request', desc: 'Schedule a demo drive of an XFuel truck.', color: 'text-yellow-400' },
  { type: 'financing', icon: CreditCard, label: 'Financing Request', desc: 'Apply for commercial truck financing.', color: 'text-blue-400' },
  { type: 'influencer', icon: Star, label: 'Influencer Collaboration', desc: 'Partner with XFuel for content collaboration.', color: 'text-pink-400' },
];

function SuccessScreen({ formType, email, onReset }: { formType: FormType; email: string; onReset: () => void }) {
  const form = forms.find((f) => f.type === formType)!;
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="w-20 h-20 bg-verified-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-verified-green" />
      </div>
      <h2 className="text-white text-2xl font-bold mb-2">{form.label} Received!</h2>
      <p className="text-gray-400 mb-6">
        Your {form.label.toLowerCase()} has been submitted. We'll contact you at <strong className="text-white">{email}</strong> within 1-2 business days.
      </p>
      <button onClick={onReset} className="px-6 py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-neon-blue-dark transition-colors">
        Submit Another Form
      </button>
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60";
const selectCls = "w-full px-3 py-2 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white focus:outline-none focus:border-neon-blue/60";

function FormFields({ type, onSubmit }: { type: FormType; onSubmit: (email: string) => void }) {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const upd = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('xfuel_forms') || '[]');
      localStorage.setItem('xfuel_forms', JSON.stringify([...stored, { type, ...data, submitted_at: new Date().toISOString() }]));
      setLoading(false);
      onSubmit(data.email || '');
    }, 800);
  };

  const commonFields = (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name *</label>
          <input className={inputCls} required placeholder="Your name" onChange={(e) => upd('name', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email *</label>
          <input className={inputCls} type="email" required placeholder="your@email.com" onChange={(e) => upd('email', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Phone</label>
          <input className={inputCls} type="tel" placeholder="(555) 000-0000" onChange={(e) => upd('phone', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Company / Organization</label>
          <input className={inputCls} placeholder="Company name" onChange={(e) => upd('company', e.target.value)} />
        </div>
      </div>
    </>
  );

  const fieldSets: Record<FormType, React.ReactNode> = {
    buyer: (
      <>
        {commonFields}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">What are you looking for?</label>
          <select className={selectCls} onChange={(e) => upd('vehicle_type', e.target.value)}>
            <option value="">Select vehicle type</option>
            <option>Semi Truck / Long-Haul</option>
            <option>Dump Truck</option>
            <option>Pickup Truck</option>
            <option>Box Truck</option>
            <option>Utility / Work Truck</option>
            <option>Snow Removal</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Budget Range</label>
          <select className={selectCls} onChange={(e) => upd('budget', e.target.value)}>
            <option value="">Select budget</option>
            <option>Under $50,000</option>
            <option>$50,000 – $100,000</option>
            <option>$100,000 – $200,000</option>
            <option>$200,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Message</label>
          <textarea className={inputCls + ' resize-none'} rows={3} placeholder="Tell us what you're looking for..." onChange={(e) => upd('message', e.target.value)} />
        </div>
      </>
    ),
    seller: (
      <>
        {commonFields}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Year</label>
            <input className={inputCls} type="number" placeholder="2021" onChange={(e) => upd('year', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Make</label>
            <input className={inputCls} placeholder="Peterbilt" onChange={(e) => upd('make', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Model</label>
            <input className={inputCls} placeholder="389" onChange={(e) => upd('model', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Asking Price ($)</label>
          <input className={inputCls} type="number" placeholder="165000" onChange={(e) => upd('price', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">XFuel Installer Name</label>
          <input className={inputCls} placeholder="e.g. Gulf Coast Diesel Solutions" onChange={(e) => upd('installer', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Notes</label>
          <textarea className={inputCls + ' resize-none'} rows={3} placeholder="Any additional info about your truck or XFuel install..." onChange={(e) => upd('notes', e.target.value)} />
        </div>
      </>
    ),
    fleet: (
      <>
        {commonFields}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Fleet Size (number of trucks needed)</label>
          <select className={selectCls} onChange={(e) => upd('fleet_size', e.target.value)}>
            <option value="">Select quantity</option>
            <option>2-5 trucks</option>
            <option>6-10 trucks</option>
            <option>11-25 trucks</option>
            <option>25+ trucks</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Industry / Use Case</label>
          <select className={selectCls} onChange={(e) => upd('industry', e.target.value)}>
            <option value="">Select industry</option>
            <option>Long-Haul / Freight</option>
            <option>Oilfield / Energy</option>
            <option>Construction / Aggregate</option>
            <option>Municipal / Government</option>
            <option>Snow Removal</option>
            <option>Logistics / Last-Mile</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Total Budget</label>
          <select className={selectCls} onChange={(e) => upd('budget', e.target.value)}>
            <option value="">Select budget</option>
            <option>Under $500K</option>
            <option>$500K – $1M</option>
            <option>$1M – $5M</option>
            <option>$5M+</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Timeline</label>
          <select className={selectCls} onChange={(e) => upd('timeline', e.target.value)}>
            <option value="">Select timeline</option>
            <option>ASAP (within 30 days)</option>
            <option>1-3 months</option>
            <option>3-6 months</option>
            <option>6+ months</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Additional Requirements</label>
          <textarea className={inputCls + ' resize-none'} rows={3} placeholder="Specific makes, models, spec requirements, delivery locations..." onChange={(e) => upd('notes', e.target.value)} />
        </div>
      </>
    ),
    demo: (
      <>
        {commonFields}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Preferred Demo Location</label>
          <input className={inputCls} placeholder="City, State" onChange={(e) => upd('location', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Preferred Date(s)</label>
          <input className={inputCls} type="date" onChange={(e) => upd('demo_date', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Type of Vehicle for Demo</label>
          <select className={selectCls} onChange={(e) => upd('vehicle_type', e.target.value)}>
            <option value="">Select type</option>
            <option>Class 8 Semi Truck</option>
            <option>Dump Truck</option>
            <option>Pickup / Super Duty</option>
            <option>Box Truck / Medium Duty</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Number of Attendees</label>
          <input className={inputCls} type="number" placeholder="e.g. 3" onChange={(e) => upd('attendees', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Notes</label>
          <textarea className={inputCls + ' resize-none'} rows={3} placeholder="Any specific requirements for the demo..." onChange={(e) => upd('notes', e.target.value)} />
        </div>
      </>
    ),
    financing: (
      <>
        {commonFields}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Financing Amount Needed ($)</label>
          <input className={inputCls} type="number" placeholder="e.g. 150000" onChange={(e) => upd('amount', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Credit Score Range</label>
          <select className={selectCls} onChange={(e) => upd('credit', e.target.value)}>
            <option value="">Select range</option>
            <option>750+</option>
            <option>700-749</option>
            <option>650-699</option>
            <option>600-649</option>
            <option>Below 600</option>
            <option>Not Sure</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Time in Business</label>
          <select className={selectCls} onChange={(e) => upd('time_in_business', e.target.value)}>
            <option value="">Select</option>
            <option>Less than 1 year</option>
            <option>1-2 years</option>
            <option>2-5 years</option>
            <option>5+ years</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Annual Revenue</label>
          <select className={selectCls} onChange={(e) => upd('revenue', e.target.value)}>
            <option value="">Select range</option>
            <option>Under $250K</option>
            <option>$250K – $500K</option>
            <option>$500K – $1M</option>
            <option>$1M – $5M</option>
            <option>$5M+</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Vehicle Details (if known)</label>
          <textarea className={inputCls + ' resize-none'} rows={2} placeholder="Year, Make, Model, Price..." onChange={(e) => upd('vehicle', e.target.value)} />
        </div>
      </>
    ),
    influencer: (
      <>
        {commonFields}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Platform(s)</label>
          <input className={inputCls} placeholder="YouTube, TikTok, Instagram..." onChange={(e) => upd('platform', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Audience Size</label>
          <select className={selectCls} onChange={(e) => upd('audience', e.target.value)}>
            <option value="">Select range</option>
            <option>Under 10K followers</option>
            <option>10K – 50K</option>
            <option>50K – 250K</option>
            <option>250K – 1M</option>
            <option>1M+</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Content Niche</label>
          <input className={inputCls} placeholder="e.g. Trucking, Fleet, Diesel, Commercial Vehicles" onChange={(e) => upd('niche', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Profile / Website URL</label>
          <input className={inputCls} type="url" placeholder="https://..." onChange={(e) => upd('url', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Collaboration Idea</label>
          <textarea className={inputCls + ' resize-none'} rows={3} placeholder="Tell us your content idea and how you'd like to work with XFuel..." onChange={(e) => upd('idea', e.target.value)} />
        </div>
      </>
    ),
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {fieldSets[type]}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-neon-blue-dark transition-colors shadow-neon-sm disabled:opacity-70"
      >
        {loading && <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

export default function FormsPage() {
  const [activeForm, setActiveForm] = useState<FormType>('buyer');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const currentForm = forms.find((f) => f.type === activeForm)!;

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-charcoal-mid border-b border-charcoal-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Request Forms</h1>
          <p className="text-gray-400">Submit a request and our team will follow up within 1-2 business days.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form selector */}
          <div className="lg:col-span-1 space-y-2">
            {forms.map(({ type, icon: Icon, label, desc, color }) => (
              <button
                key={type}
                onClick={() => { setActiveForm(type); setSubmitted(false); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${activeForm === type ? 'border-neon-blue/40 bg-neon-blue/5' : 'border-charcoal-border bg-charcoal-mid hover:border-charcoal-border/80'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={activeForm === type ? color : 'text-gray-500'} />
                  <div>
                    <div className={`font-semibold text-sm ${activeForm === type ? 'text-white' : 'text-gray-300'}`}>{label}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Form panel */}
          <div className="lg:col-span-2">
            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
              {submitted ? (
                <SuccessScreen
                  formType={activeForm}
                  email={submittedEmail}
                  onReset={() => setSubmitted(false)}
                />
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-charcoal-border">
                    <currentForm.icon size={20} className={currentForm.color} />
                    <div>
                      <h2 className="text-white font-bold">{currentForm.label}</h2>
                      <p className="text-gray-400 text-sm">{currentForm.desc}</p>
                    </div>
                  </div>
                  <FormFields
                    key={activeForm}
                    type={activeForm}
                    onSubmit={(email) => { setSubmittedEmail(email); setSubmitted(true); }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
