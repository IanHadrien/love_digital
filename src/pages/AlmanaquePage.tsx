import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, ArrowLeft, Calendar } from 'lucide-react';
import { getAlmanaque, type AlmanaqueData } from '@/lib/almanaque-store';
import TimelineBlock from '@/components/TimelineBlock';
import FinalReveal from '@/components/FinalReveal';

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function daysTogether(dateStr: string): number {
  const start = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

const AlmanaquePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<AlmanaqueData | null>(null);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const almanaque = getAlmanaque(id);
    if (almanaque) {
      setData(almanaque);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Almanaque não encontrado</h1>
          <p className="text-muted-foreground font-body mb-6">Este link pode ter expirado ou não existe.</p>
          <Link to="/" className="text-primary font-body hover:underline">
            Criar um novo almanaque
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Heart className="w-8 h-8 text-primary animate-pulse" />
      </div>
    );
  }

  const youtubeId = data.musicUrl ? extractYoutubeId(data.musicUrl) : null;
  const days = daysTogether(data.startDate);

  return (
    <div className="min-h-screen bg-background">
      {/* Floating actions */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border shadow-sm transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Voltar
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-2 text-sm font-body bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-sm hover:bg-muted transition-colors text-foreground"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado!' : 'Copiar link'}
        </button>
      </div>

      {/* Hero Header */}
      <header className="bg-hero-gradient pt-20 pb-16 md:pt-32 md:pb-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-white/10 fill-current"
              style={{
                width: `${25 + i * 12}px`,
                height: `${25 + i * 12}px`,
                left: `${15 + i * 20}%`,
                top: `${20 + (i % 2) * 35}%`,
                transform: `rotate(${-10 + i * 15}deg)`,
              }}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-white/30" />
            <Heart className="w-5 h-5 text-white fill-white" />
            <div className="h-px w-12 bg-white/30" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4">
            {data.coupleName}
          </h1>

          <div className="flex items-center justify-center gap-2 text-white/75 font-body">
            <Calendar className="w-4 h-4" />
            <span>Juntos desde {formatDate(data.startDate)}</span>
          </div>

          <p className="mt-3 text-xl font-display text-white font-semibold">
            {days} dias de amor 💕
          </p>
        </motion.div>
      </header>

      {/* YouTube Player */}
      {youtubeId && (
        <div className="max-w-sm mx-auto px-4 -mt-8 mb-12 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}`}
              title="Música do casal"
              allow="autoplay; encrypted-media"
              className="w-full aspect-video"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-12 md:space-y-20">
        {data.moments.map((moment, index) => (
          <TimelineBlock key={moment.id} moment={moment} index={index} />
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 py-12">
        <div className="h-px w-16 bg-border" />
        <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
        <div className="h-px w-16 bg-border" />
      </div>

      {/* Final Reveal */}
      <FinalReveal message={data.finalMessage} />

      {/* Footer */}
      <footer className="text-center pb-12 px-4">
        <p className="text-sm text-muted-foreground font-body">
          Feito com <Heart className="inline w-3 h-3 text-primary fill-primary" /> no Almanaque Digital do Casal
        </p>
      </footer>
    </div>
  );
};

export default AlmanaquePage;
