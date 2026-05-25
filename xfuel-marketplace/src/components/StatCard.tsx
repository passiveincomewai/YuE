import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  value: string;
  label: string;
  sub?: string;
  accent?: boolean;
}

export default function StatCard({ icon: Icon, value, label, sub, accent = false }: Props) {
  return (
    <div className={`relative p-6 rounded-xl border ${accent ? 'border-neon-blue/40 bg-neon-blue/5' : 'border-charcoal-border bg-charcoal-mid'} shadow-card overflow-hidden`}>
      {accent && (
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent opacity-50" />
      )}
      <div className="relative">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${accent ? 'bg-neon-blue/20' : 'bg-charcoal-border'}`}>
          <Icon size={20} className={accent ? 'text-neon-blue' : 'text-gray-300'} />
        </div>
        <div className={`text-3xl font-bold mb-1 ${accent ? 'text-neon-blue' : 'text-white'}`}>{value}</div>
        <div className="text-white font-semibold text-sm">{label}</div>
        {sub && <div className="text-gray-500 text-xs mt-1">{sub}</div>}
      </div>
    </div>
  );
}
