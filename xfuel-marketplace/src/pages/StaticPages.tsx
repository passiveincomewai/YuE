import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="bg-charcoal-mid border-b border-charcoal-border">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
      {subtitle && <p className="text-gray-400 mt-2 max-w-2xl">{subtitle}</p>}
    </div>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-300 text-sm leading-relaxed mb-3">{children}</p>
);

export function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <PageHeader
        title="About XFuel Marketplace"
        subtitle="The dedicated marketplace for XFuel-equipped trucks and commercial vehicles."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-white font-bold text-lg mb-3">Who We Are</h2>
              <P>XFuel Marketplace is an online platform operated by XFuel, connecting sellers of XFuel-equipped commercial vehicles with qualified buyers across North America.</P>
              <P>We serve fleet owners, independent operators, dealers, municipalities, oilfield companies, snow removal contractors, and logistics businesses — anyone who needs a diesel-powered vehicle already upgraded with XFuel hydrolysis technology.</P>
              <P>Unlike general vehicle marketplaces, we specialize exclusively in XFuel-upgraded vehicles, with a verification process that adds a layer of accountability to every listing's performance claims.</P>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-3">Our Mission</h2>
              <P>To make it easy for buyers to find verified, XFuel-equipped vehicles with documented performance data — and to make it easy for sellers to connect with serious, qualified buyers in a focused marketplace.</P>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-3">The XFuel Difference</h2>
              <div className="space-y-3">
                {[
                  'Every listing that earns the XFuel Verified badge has been reviewed by our team.',
                  'MPG claims are backed by installer documentation and fuel logs.',
                  'Buyers can request full XFuel Verification Reports before purchase.',
                  'Our network of certified XFuel installers means you know who did the work.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-neon-blue mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5">
              <p className="text-yellow-200/80 text-xs leading-relaxed">
                <strong className="text-yellow-400">Disclaimer:</strong> XFuel Marketplace connects buyers and sellers of vehicles equipped with XFuel systems. Fuel economy results may vary based on vehicle condition, driving habits, load, terrain, maintenance, and installation quality. Listings and performance claims should be verified independently before purchase.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-charcoal-mid border border-neon-blue/20 rounded-xl p-5">
              <ShieldCheck size={24} className="text-neon-blue mb-3" />
              <h3 className="text-white font-bold mb-2">XFuel Verified</h3>
              <p className="text-gray-400 text-sm mb-4">Our verification badge means we've reviewed the install documentation, installer credentials, and fuel economy data.</p>
              <Link to="/how-verification-works" className="flex items-center gap-1 text-neon-blue text-sm hover:underline">
                How it works <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5">
              <h3 className="text-white font-bold mb-3">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { to: '/marketplace', label: 'Browse Listings' },
                  { to: '/seller-dashboard', label: 'List Your Truck' },
                  { to: '/forms', label: 'Request a Demo' },
                  { to: '/contact', label: 'Contact Us' },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="flex items-center gap-2 text-gray-400 hover:text-neon-blue text-sm transition-colors">
                    <ArrowRight size={12} /> {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HowVerificationWorksPage() {
  const steps = [
    { num: '01', title: 'Seller Submits Documentation', desc: 'Seller provides installer credentials, install date, before/after MPG data, fuel receipts, and optionally dyno results.' },
    { num: '02', title: 'XFuel Reviews Installer', desc: 'We verify the installing shop is in our certified partner network or has qualified credentials to perform XFuel installations.' },
    { num: '03', title: 'MPG Data Validation', desc: 'Our team reviews the fuel economy improvement claims against industry expectations for the vehicle type, engine, and route type.' },
    { num: '04', title: 'Badge Applied', desc: 'If everything checks out, the listing receives the XFuel Verified badge and a verification report is made available on request.' },
  ];

  return (
    <div className="min-h-screen pt-16">
      <PageHeader
        title="How XFuel Verification Works"
        subtitle="Our verification process adds credibility to performance claims in the marketplace."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step) => (
            <div key={step.num} className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
              <div className="text-4xl font-black text-neon-blue/30 mb-3">{step.num}</div>
              <h3 className="text-white font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">What Verification Does NOT Guarantee</h2>
          <P>Verification means we have reviewed documentation. It does not mean we physically inspected the vehicle, independently tested the fuel economy, or guarantee that your real-world results will match the documented figures.</P>
          <P>Fuel economy results vary significantly based on load, terrain, driving style, vehicle maintenance, ambient temperature, and fuel quality. The MPG figures shown are based on seller-provided data under specific conditions.</P>
          <P>Always request the full XFuel Verification Report and conduct your own due diligence before purchase, including independent inspection by a qualified diesel mechanic.</P>
        </div>

        <div className="bg-neon-blue/5 border border-neon-blue/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck size={24} className="text-neon-blue mt-0.5 shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-2">Request a Verification Report</h3>
              <P>On any XFuel Verified listing, use the "Request XFuel Verification Report" button to receive the full documentation package including installer credentials, MPG data, and any available dyno results.</P>
              <Link to="/marketplace" className="inline-flex items-center gap-1 text-neon-blue text-sm font-semibold hover:underline">
                Browse Verified Listings <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SellerTermsPage() {
  const terms = [
    { title: '1. Accuracy of Listings', body: 'Sellers are responsible for the accuracy of all information provided in their listings, including vehicle specifications, mileage, condition, XFuel installation details, and MPG claims. Providing false or misleading information is grounds for immediate removal from the marketplace.' },
    { title: '2. XFuel Installation Documentation', body: 'Sellers claiming XFuel installation must be able to provide installer documentation, including installer name, contact, install date, and ideally fuel economy records. Listings with the XFuel Verified badge have had this documentation reviewed by XFuel staff.' },
    { title: '3. MPG Claims', body: 'All before/after MPG claims must be based on actual, documented fuel economy data. Estimates must be clearly labeled as estimates. Sellers should not inflate MPG figures. XFuel reserves the right to require documentation before approving any listing.' },
    { title: '4. Transaction Responsibility', body: 'XFuel Marketplace facilitates connections between buyers and sellers. We are not party to any transaction. All negotiation, payment, and transfer of title occurs directly between buyer and seller or through approved financing partners. XFuel is not responsible for disputes.' },
    { title: '5. Listing Fees', body: 'Currently, listings are submitted at no charge during the platform launch period. XFuel reserves the right to introduce listing fees at any time with advance notice.' },
    { title: '6. Photo & Content Standards', body: 'All photos must accurately represent the vehicle. Stock photos, AI-generated images, or photos of different vehicles are not permitted.' },
    { title: '7. Removal of Listings', body: 'XFuel reserves the right to remove any listing that violates these terms, contains inaccurate information, or is determined to be fraudulent, without notice or liability.' },
    { title: '8. Indemnification', body: 'Sellers agree to indemnify and hold XFuel harmless from any claims arising from inaccurate listing information, disputes with buyers, or transactions conducted through or resulting from the marketplace.' },
  ];

  return (
    <div className="min-h-screen pt-16">
      <PageHeader title="Seller Terms & Conditions" subtitle="Please read these terms before listing a vehicle on XFuel Marketplace." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        {terms.map(({ title, body }) => (
          <div key={title} className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5">
            <h3 className="text-white font-bold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BuyerDisclaimerPage() {
  const items = [
    { title: 'Performance Varies', body: 'MPG improvement figures are based on seller-reported data under specific conditions. Your actual fuel economy improvement may be higher or lower depending on your vehicle, load, route, driving style, and many other factors.' },
    { title: 'Independent Inspection Required', body: 'All buyers are strongly advised to have any vehicle independently inspected by a qualified diesel mechanic before purchase. XFuel Marketplace does not physically inspect any vehicles.' },
    { title: 'Verification Limitations', body: 'The XFuel Verified badge indicates that our team has reviewed installer documentation. It does not constitute a warranty or guarantee of performance. Verification is based on seller-provided information.' },
    { title: 'No Warranty from Marketplace', body: 'XFuel Marketplace makes no warranty, express or implied, regarding any vehicle listed on this platform. All sales are between buyer and seller.' },
    { title: 'Financing Partners', body: 'Financing options may be available through third-party commercial lenders. XFuel Marketplace does not provide financing and is not responsible for any financing terms or agreements.' },
    { title: 'Due Diligence', body: 'Buyers are responsible for conducting their own due diligence, including verifying VIN, title status, service history, XFuel installation documentation, and any other relevant information before purchase.' },
  ];

  return (
    <div className="min-h-screen pt-16">
      <PageHeader title="Buyer Disclaimer" subtitle="Important information for all buyers using XFuel Marketplace." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-yellow-200 text-sm leading-relaxed font-medium">
            XFuel Marketplace connects buyers and sellers of vehicles equipped with XFuel systems. Fuel economy results may vary based on vehicle condition, driving habits, load, terrain, maintenance, and installation quality. Listings and performance claims should be verified independently before purchase.
          </p>
        </div>
        {items.map(({ title, body }) => (
          <div key={title} className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5">
            <h3 className="text-white font-bold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  const sections = [
    { title: 'Information We Collect', body: 'We collect information you provide when submitting listings, inquiries, or contact forms: name, email, phone number, company name, and any vehicle or transaction details you choose to share.' },
    { title: 'How We Use Your Information', body: 'We use your information to facilitate connections between buyers and sellers, process listing requests, send confirmation emails, and improve our platform. We do not sell your personal information to third parties.' },
    { title: 'Information Sharing', body: 'When you submit an inquiry about a listing, your contact information is shared with the seller so they can respond. Seller contact information is visible to buyers as part of the listing.' },
    { title: 'Data Storage', body: 'Inquiry and form submissions are stored in our database. Listing information is stored for as long as the listing is active, plus a reasonable archive period.' },
    { title: 'Cookies', body: 'Our website uses essential cookies for site functionality. We do not use tracking cookies for advertising purposes.' },
    { title: 'Your Rights', body: 'You may request access to, correction of, or deletion of your personal information by contacting us at privacy@xfuel.net.' },
    { title: 'Contact', body: 'For privacy-related inquiries, contact us at privacy@xfuel.net or through our contact page.' },
  ];

  return (
    <div className="min-h-screen pt-16">
      <PageHeader title="Privacy Policy" subtitle="Last updated: January 2025" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        {sections.map(({ title, body }) => (
          <div key={title} className="bg-charcoal-mid border border-charcoal-border rounded-xl p-5">
            <h3 className="text-white font-bold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputCls = "w-full px-3 py-2.5 bg-charcoal border border-charcoal-border rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 800);
  };

  return (
    <div className="min-h-screen pt-16">
      <PageHeader title="Contact XFuel Marketplace" subtitle="Reach out with questions, support requests, or partnership inquiries." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-verified-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-verified-green" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll respond within 1-2 business days.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-neon-blue text-sm hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-charcoal-mid border border-charcoal-border rounded-xl p-6 space-y-4">
                <h2 className="text-white font-bold text-lg mb-4">Send a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Name *</label>
                    <input className={inputCls} required placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email *</label>
                    <input className={inputCls} type="email" required placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Subject</label>
                  <select className={inputCls}>
                    <option value="">Select topic</option>
                    <option>General Question</option>
                    <option>Listing Support</option>
                    <option>Verification Question</option>
                    <option>Financing Inquiry</option>
                    <option>Fleet Buying</option>
                    <option>Partnership / Dealer</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Message *</label>
                  <textarea className={inputCls + ' resize-none'} rows={5} required placeholder="How can we help you?" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-neon-blue-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                  {loading && <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'marketplace@xfuel.net', href: 'mailto:marketplace@xfuel.net' },
              { icon: Phone, label: 'Phone', value: '1-800-555-0000', href: 'tel:+18005550000' },
              { icon: MapPin, label: 'Location', value: 'North America', href: '#' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-start gap-3 p-4 bg-charcoal-mid border border-charcoal-border rounded-xl hover:border-neon-blue/30 transition-colors group">
                <div className="w-10 h-10 bg-charcoal-border rounded-lg flex items-center justify-center group-hover:bg-neon-blue/10 transition-colors">
                  <Icon size={18} className="text-neon-blue" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">{label}</div>
                  <div className="text-white font-semibold text-sm">{value}</div>
                </div>
              </a>
            ))}
            <div className="bg-charcoal-mid border border-neon-blue/20 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3 text-sm">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { to: '/forms', label: 'Request a Demo Drive' },
                  { to: '/forms', label: 'Fleet Buyer Inquiry' },
                  { to: '/forms', label: 'Financing Request' },
                  { to: '/seller-dashboard', label: 'List Your Truck' },
                ].map((l) => (
                  <Link key={l.label} to={l.to} className="flex items-center gap-2 text-gray-400 hover:text-neon-blue text-sm transition-colors">
                    <ArrowRight size={12} /> {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
