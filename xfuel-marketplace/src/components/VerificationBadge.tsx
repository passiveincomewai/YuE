import { ShieldCheck, Shield, Clock } from 'lucide-react';

interface Props {
  verified: boolean;
  installed: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function VerificationBadge({ verified, installed, size = 'md' }: Props) {
  const sizes = {
    sm: { icon: 12, text: 'text-xs', px: 'px-2 py-0.5' },
    md: { icon: 14, text: 'text-xs', px: 'px-2.5 py-1' },
    lg: { icon: 16, text: 'text-sm', px: 'px-3 py-1.5' },
  };
  const s = sizes[size];

  if (verified) {
    return (
      <span className={`inline-flex items-center gap-1 ${s.px} rounded-full bg-verified-green/15 border border-verified-green/40 ${s.text} font-semibold text-verified-green`}>
        <ShieldCheck size={s.icon} />
        XFuel Verified
      </span>
    );
  }

  if (installed) {
    return (
      <span className={`inline-flex items-center gap-1 ${s.px} rounded-full bg-yellow-500/15 border border-yellow-500/40 ${s.text} font-semibold text-yellow-400`}>
        <Clock size={s.icon} />
        Pending Verification
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 ${s.px} rounded-full bg-gray-500/15 border border-gray-500/40 ${s.text} font-semibold text-gray-400`}>
      <Shield size={s.icon} />
      Not Verified
    </span>
  );
}
