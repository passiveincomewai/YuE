import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface Props {
  images: string[];
  title: string;
}

export default function ListingGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setActive((a) => (a === 0 ? images.length - 1 : a - 1));
  const next = () => setActive((a) => (a === images.length - 1 ? 0 : a + 1));

  const fallback = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop';

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative rounded-xl overflow-hidden bg-charcoal aspect-video group cursor-pointer" onClick={() => setLightbox(true)}>
          <img
            src={images[active] || fallback}
            alt={`${title} — image ${active + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ZoomIn size={32} className="text-white" />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="absolute bottom-3 right-3 bg-black/60 rounded-full px-2.5 py-1 text-xs text-white">
            {active + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${i === active ? 'border-neon-blue' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img
                  src={img}
                  alt={`thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-neon-blue"
          >
            <X size={28} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <img
            src={images[active] || fallback}
            alt={title}
            className="max-w-5xl max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
          />
          <div className="absolute bottom-4 text-white text-sm opacity-60">
            {active + 1} / {images.length} — Click outside to close
          </div>
        </div>
      )}
    </>
  );
}
