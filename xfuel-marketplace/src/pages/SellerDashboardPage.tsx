import { useState } from 'react';
import { CheckCircle, Upload, Plus, Trash2 } from 'lucide-react';

type Status = 'draft' | 'pending-verification' | 'live' | 'sold';

interface FormData {
  title: string; price: string; make: string; model: string; year: string; trim: string;
  mileage: string; engine: string; transmission: string; drivetrain: string; vehicle_type: string;
  location: string; description: string; seller_name: string; seller_email: string; seller_phone: string;
  seller_type: string; xfuel_install_date: string; installer_name: string; before_mpg: string;
  after_mpg: string; estimated_savings: string; demo_available: boolean; financing_available: boolean;
  towing_capacity: string; condition: string; vin: string; status: Status;
}

const initialForm: FormData = {
  title: '', price: '', make: '', model: '', year: '', trim: '',
  mileage: '', engine: '', transmission: '', drivetrain: '', vehicle_type: '',
  location: '', description: '', seller_name: '', seller_email: '', seller_phone: '',
  seller_type: 'private', xfuel_install_date: '', installer_name: '', before_mpg: '',
  after_mpg: '', estimated_savings: '', demo_available: false, financing_available: false,
  towing_capacity: '', condition: 'good', vin: '', status: 'draft',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
    <h2 className="text-white font-bold text-base mb-5 pb-3 border-b border-charcoal-border">{title}</h2>
    {children}
  </div>
);

const Field = ({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
      {label}{required && <span className="text-neon-blue ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full px-3 py-2.5 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60";
const selectCls = "w-full px-3 py-2.5 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white focus:outline-none focus:border-neon-blue/60";

export default function SellerDashboardPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const upd = (key: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addPhotoUrl = () => setPhotos((p) => [...p, '']);
  const updatePhoto = (i: number, v: string) => setPhotos((p) => p.map((u, idx) => idx === i ? v : u));
  const removePhoto = (i: number) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const listing = {
        id: Date.now().toString(),
        ...form,
        image_urls: photos.filter(Boolean),
        xfuel_installed: true,
        xfuel_verified: false,
        created_at: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('xfuel_listings') || '[]');
      localStorage.setItem('xfuel_listings', JSON.stringify([...existing, listing]));
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-verified-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-verified-green" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-3">Listing Submitted!</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Your listing has been submitted for XFuel verification review. You'll receive a confirmation at <strong className="text-white">{form.seller_email}</strong> once it's approved and live on the marketplace.
          </p>
          <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5 text-left space-y-2 mb-6">
            <div className="flex justify-between text-sm"><span className="text-gray-400">Status</span><span className="text-yellow-400 font-semibold">Pending Verification</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Vehicle</span><span className="text-white">{form.year} {form.make} {form.model}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Price Listed</span><span className="text-white">${Number(form.price).toLocaleString()}</span></div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm(initialForm); setPhotos([]); }}
            className="px-6 py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-neon-blue-dark transition-colors"
          >
            Submit Another Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-charcoal-mid border-b border-charcoal-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">List Your XFuel Truck</h1>
          <p className="text-gray-400">Submit your XFuel-equipped vehicle to the marketplace. Our team will review and verify your installation details.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Vehicle Info */}
        <Section title="Vehicle Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Listing Title" required>
              <input className={inputCls} placeholder="e.g. 2021 Peterbilt 389 — XFuel Verified" value={form.title} onChange={(e) => upd('title', e.target.value)} required />
            </Field>
            <Field label="Asking Price ($)" required>
              <input className={inputCls} type="number" placeholder="e.g. 165000" value={form.price} onChange={(e) => upd('price', e.target.value)} required />
            </Field>
            <Field label="Year" required>
              <input className={inputCls} type="number" placeholder="2021" value={form.year} onChange={(e) => upd('year', e.target.value)} required />
            </Field>
            <Field label="Make" required>
              <select className={selectCls} value={form.make} onChange={(e) => upd('make', e.target.value)} required>
                <option value="">Select Make</option>
                {['Peterbilt', 'Kenworth', 'Freightliner', 'Volvo', 'Mack', 'International', 'Western Star', 'Ford', 'Ram', 'Chevrolet', 'GMC', 'Other'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </Field>
            <Field label="Model" required>
              <input className={inputCls} placeholder="e.g. 389" value={form.model} onChange={(e) => upd('model', e.target.value)} required />
            </Field>
            <Field label="Trim">
              <input className={inputCls} placeholder="e.g. Glider, Sleeper" value={form.trim} onChange={(e) => upd('trim', e.target.value)} />
            </Field>
            <Field label="Mileage" required>
              <input className={inputCls} type="number" placeholder="e.g. 312000" value={form.mileage} onChange={(e) => upd('mileage', e.target.value)} required />
            </Field>
            <Field label="Engine" required>
              <input className={inputCls} placeholder="e.g. Cummins X15 565HP" value={form.engine} onChange={(e) => upd('engine', e.target.value)} required />
            </Field>
            <Field label="Transmission">
              <input className={inputCls} placeholder="e.g. Eaton Fuller 18-Speed" value={form.transmission} onChange={(e) => upd('transmission', e.target.value)} />
            </Field>
            <Field label="Drivetrain">
              <select className={selectCls} value={form.drivetrain} onChange={(e) => upd('drivetrain', e.target.value)}>
                <option value="">Select</option>
                {['4x2', '4x4', '6x2', '6x4', '8x4'].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Vehicle Type">
              <select className={selectCls} value={form.vehicle_type} onChange={(e) => upd('vehicle_type', e.target.value)}>
                <option value="">Select Type</option>
                {[['semi-truck', 'Semi Truck'], ['dump-truck', 'Dump Truck'], ['pickup', 'Pickup Truck'], ['box-truck', 'Box Truck'], ['flatbed', 'Flatbed'], ['tanker', 'Tanker'], ['utility', 'Utility'], ['snow-removal', 'Snow Removal'], ['other', 'Other']].map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </Field>
            <Field label="Condition">
              <select className={selectCls} value={form.condition} onChange={(e) => upd('condition', e.target.value)}>
                {['excellent', 'good', 'fair'].map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Towing Capacity">
              <input className={inputCls} placeholder="e.g. 80,000 lbs" value={form.towing_capacity} onChange={(e) => upd('towing_capacity', e.target.value)} />
            </Field>
            <Field label="VIN (optional)">
              <input className={inputCls} placeholder="Vehicle Identification Number" value={form.vin} onChange={(e) => upd('vin', e.target.value)} />
            </Field>
            <Field label="Location" required>
              <input className={inputCls} placeholder="City, State" value={form.location} onChange={(e) => upd('location', e.target.value)} required />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Full Description" required>
              <textarea
                className={inputCls + ' resize-none'}
                rows={5}
                placeholder="Describe the vehicle's history, condition, maintenance records, why you're selling..."
                value={form.description}
                onChange={(e) => upd('description', e.target.value)}
                required
              />
            </Field>
          </div>
        </Section>

        {/* Photos */}
        <Section title="Photos">
          <p className="text-gray-400 text-sm mb-4">Add photo URLs for your vehicle. For best results, use high-resolution photos from multiple angles.</p>
          <div className="space-y-2">
            {photos.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={inputCls}
                  placeholder={`Photo URL ${i + 1}`}
                  value={url}
                  onChange={(e) => updatePhoto(i, e.target.value)}
                />
                <button type="button" onClick={() => removePhoto(i)} className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPhotoUrl}
              className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-charcoal-border text-gray-400 hover:text-neon-blue hover:border-neon-blue/40 rounded-lg text-sm transition-colors w-full justify-center"
            >
              <Plus size={16} /> Add Photo URL
            </button>
          </div>
          <div className="mt-4 flex items-center gap-3 p-4 bg-charcoal border border-charcoal-border rounded-lg">
            <Upload size={18} className="text-gray-500" />
            <div>
              <div className="text-gray-300 text-sm font-medium">Need to upload photos?</div>
              <div className="text-gray-500 text-xs">Upload to a service like Imgur or Google Photos and paste the URL above.</div>
            </div>
          </div>
        </Section>

        {/* XFuel Details */}
        <Section title="XFuel Installation Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="XFuel Install Date" required>
              <input className={inputCls} type="date" value={form.xfuel_install_date} onChange={(e) => upd('xfuel_install_date', e.target.value)} required />
            </Field>
            <Field label="Installer / Partner Name" required>
              <input className={inputCls} placeholder="e.g. Gulf Coast Diesel Solutions" value={form.installer_name} onChange={(e) => upd('installer_name', e.target.value)} required />
            </Field>
            <Field label="Before MPG (pre-XFuel)" required>
              <input className={inputCls} type="number" step="0.1" placeholder="e.g. 6.2" value={form.before_mpg} onChange={(e) => upd('before_mpg', e.target.value)} required />
            </Field>
            <Field label="After MPG (post-XFuel)" required>
              <input className={inputCls} type="number" step="0.1" placeholder="e.g. 8.1" value={form.after_mpg} onChange={(e) => upd('after_mpg', e.target.value)} required />
            </Field>
            <Field label="Est. Annual Fuel Savings ($)">
              <input className={inputCls} type="number" placeholder="e.g. 18400" value={form.estimated_savings} onChange={(e) => upd('estimated_savings', e.target.value)} />
            </Field>
          </div>
          <div className="mt-4 p-4 bg-charcoal border border-neon-blue/20 rounded-lg">
            <p className="text-gray-400 text-xs">
              <strong className="text-neon-blue">Documentation required:</strong> XFuel will request installer credentials, fuel logs, and dyno results during verification. Having these ready speeds up the process.
            </p>
          </div>
        </Section>

        {/* Seller Info */}
        <Section title="Seller Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Your Name / Company" required>
              <input className={inputCls} placeholder="Name or company" value={form.seller_name} onChange={(e) => upd('seller_name', e.target.value)} required />
            </Field>
            <Field label="Seller Type">
              <select className={selectCls} value={form.seller_type} onChange={(e) => upd('seller_type', e.target.value)}>
                {[['private', 'Private Seller'], ['dealer', 'Dealer'], ['fleet', 'Fleet / Company'], ['xfuel-partner', 'XFuel Partner']].map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </Field>
            <Field label="Email Address" required>
              <input className={inputCls} type="email" placeholder="your@email.com" value={form.seller_email} onChange={(e) => upd('seller_email', e.target.value)} required />
            </Field>
            <Field label="Phone Number">
              <input className={inputCls} type="tel" placeholder="(555) 000-0000" value={form.seller_phone} onChange={(e) => upd('seller_phone', e.target.value)} />
            </Field>
          </div>
        </Section>

        {/* Options */}
        <Section title="Listing Options">
          <div className="space-y-4">
            {[
              { key: 'demo_available' as const, label: 'Demo Drive Available', desc: 'Buyers can schedule a demo drive of this vehicle.' },
              { key: 'financing_available' as const, label: 'Financing Available', desc: 'You can assist or connect buyers with financing options.' },
            ].map(({ key, label, desc }) => (
              <label key={key} className="flex items-center gap-4 cursor-pointer p-4 bg-charcoal border border-charcoal-border rounded-lg hover:border-neon-blue/30 transition-colors">
                <div
                  onClick={() => upd(key, !form[key])}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${form[key] ? 'bg-neon-blue' : 'bg-charcoal-border'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form[key] ? 'translate-x-7' : 'translate-x-1'}`} />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{label}</div>
                  <div className="text-gray-400 text-xs">{desc}</div>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-4">
            <Field label="Initial Status">
              <select className={selectCls} value={form.status} onChange={(e) => upd('status', e.target.value as Status)}>
                <option value="draft">Save as Draft</option>
                <option value="pending-verification">Submit for Verification</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-neon-blue text-black font-bold text-base rounded-xl hover:bg-neon-blue-dark transition-colors shadow-neon disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <CheckCircle size={18} />
            )}
            {loading ? 'Submitting...' : 'Submit Listing for Verification'}
          </button>
          <button
            type="button"
            onClick={() => upd('status', 'draft')}
            className="px-6 py-4 border border-charcoal-border text-gray-300 font-semibold rounded-xl hover:border-gray-400 transition-colors"
          >
            Save as Draft
          </button>
        </div>
        <p className="text-gray-500 text-xs text-center">
          By submitting, you agree to our <a href="/seller-terms" className="text-gray-400 hover:text-neon-blue">Seller Terms</a> and confirm that your XFuel installation claims are accurate and documented.
        </p>
      </form>
    </div>
  );
}
