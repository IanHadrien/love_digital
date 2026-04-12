import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Heart, Pencil, Image, Share2, Sparkles, Star, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const steps = [
  {
    icon: Pencil,
    title: 'Preencha os dados',
    desc: 'Nome do casal, data especial e os momentos mais marcantes da história de vocês.',
  },
  {
    icon: Image,
    title: 'Adicione fotos e música',
    desc: 'Suba suas fotos favoritas e escolha a música que é a cara do casal.',
  },
  {
    icon: Share2,
    title: 'Compartilhe o link',
    desc: 'Um link único é gerado automaticamente. Envie para quem você ama!',
  },
];

const testimonials = [
  { name: 'Camila, 24', text: 'Meu namorado chorou quando abriu. Foi o presente mais especial que já dei.', stars: 5 },
  { name: 'Rafael, 28', text: 'Fiz em 3 minutos e ficou mais bonito do que eu imaginava. Ela amou!', stars: 5 },
  { name: 'Juliana, 22', text: 'Usei pra pedir meu namorado em namoro. O momento final com os confetes foi perfeito.', stars: 5 },
  { name: 'Lucas, 26', text: 'Minha namorada compartilhou com todas as amigas. Viralizou no grupo!', stars: 5 },
  { name: 'Beatriz, 23', text: 'Chorei fazendo e chorei vendo. É lindo demais!', stars: 5 },
  { name: 'Pedro, 30', text: 'Surpreendi minha esposa no aniversário de casamento. Ela ficou sem palavras.', stars: 5 },
];

const LandingPage: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const isVideoInView = useInView(videoSectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isVideoInView && !videoPlaying) {
      setVideoPlaying(true);
    }
  }, [isVideoInView]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-display font-bold text-lg text-foreground">Almanaque do Casal</span>
          </div>
          <Link to="/criar">
            <Button className="gradient-romantic text-primary-foreground font-semibold rounded-full px-6 gap-2">
              Criar agora
              <Heart className="w-4 h-4 fill-current" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20 md:pt-44 md:pb-32 px-4 text-center overflow-hidden">
        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-white/10 fill-current"
              style={{
                width: `${30 + i * 15}px`,
                height: `${30 + i * 15}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                transform: `rotate(${-15 + i * 12}deg)`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight mb-6">
            Crie uma página de amor{' '}
            <span className="inline-block">
              inesquecível
              <Heart className="inline w-8 h-8 md:w-12 md:h-12 ml-2 fill-white/80 text-white/80 -mt-2" />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 font-body max-w-xl mx-auto mb-10">
            Em menos de 3 minutos, crie uma página romântica com fotos, música e uma surpresa final. 
            Compartilhe com quem você ama.
          </p>
          <Link to="/criar">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg rounded-full px-10 py-6 gap-2 shadow-lg"
            >
              Criar meu almanaque
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-4 text-white/60 text-sm font-body">100% grátis • Sem cadastro</p>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Heart className="w-8 h-8 text-primary fill-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                Como funciona?
              </h2>
              <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
                Simples, rápido e emocionante. Três passos para surpreender.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                custom={i + 1}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/criar">
              <Button variant="outline" className="rounded-full px-8 py-5 text-base font-semibold border-primary text-primary hover:bg-secondary gap-2">
                Começar agora
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features highlight */}
      <section className="py-20 md:py-28 px-4 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Por que é especial?
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Sparkles, title: 'Design premium', desc: 'Visual elegante que parece feito por um designer profissional.' },
              { icon: Heart, title: 'Momento surpresa', desc: 'O botão final revela sua mensagem com uma explosão de confetes e corações.' },
              { icon: Share2, title: 'Link único', desc: 'Compartilhe por WhatsApp, Instagram ou qualquer lugar com um clique.' },
              { icon: Star, title: '100% gratuito', desc: 'Sem cadastro, sem pegadinha. Crie quantos almanaques quiser.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-background rounded-2xl p-8 shadow-sm border border-border hover:shadow-romantic transition-shadow"
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 md:py-28 px-4 bg-background overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Heart className="w-6 h-6 text-primary fill-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                Quem já usou, amou
              </h2>
              <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
                Veja o que casais estão dizendo sobre a experiência.
              </p>
            </motion.div>
          </motion.div>

          {/* Video */}
          <motion.div
            ref={videoSectionRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="relative max-w-3xl mx-auto mb-16"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-rose-soft/30 to-primary/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              <div className="relative bg-background rounded-2xl border border-border shadow-romantic overflow-hidden">
                <div className="bg-gradient-to-r from-primary via-rose-glow to-primary h-1" />
                
                <div className="relative aspect-video bg-foreground/5">
                  {!videoPlaying ? (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                      onClick={() => setVideoPlaying(true)}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1280&q=80" 
                        alt="Casal feliz"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                      
                      <motion.div 
                        className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover/play:scale-110 transition-transform duration-300"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-current ml-1" />
                      </motion.div>
                      
                      <div className="absolute bottom-6 left-6 right-6 z-10 text-left">
                        <p className="text-white font-display text-lg md:text-xl font-semibold drop-shadow-lg">
                          "O presente mais lindo que já recebi"
                        </p>
                        <p className="text-white/70 font-body text-sm mt-1">Assista depoimentos reais</p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1"
                      title="Depoimentos de casais"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>

              {/* Floating hearts */}
              <motion.div
                className="absolute -top-3 -right-3 md:-top-5 md:-right-5"
                animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary opacity-60" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-3 md:-bottom-4 md:-left-5"
                animate={{ y: [0, 6, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-soft fill-current opacity-50" />
              </motion.div>
            </div>
          </motion.div>

          {/* Scrolling testimonials marquee */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-72 bg-background rounded-2xl p-6 border border-border shadow-sm"
                  >
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(t.stars)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-foreground font-body text-sm leading-relaxed italic mb-3">"{t.text}"</p>
                    <p className="text-xs font-semibold text-primary font-body">— {t.name}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-hero-gradient py-20 md:py-28 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-white/10 fill-current"
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                right: `${5 + i * 20}%`,
                top: `${15 + i * 18}%`,
                transform: `rotate(${10 + i * 15}deg)`,
              }}
            />
          ))}
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Heart className="w-12 h-12 text-white fill-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4 leading-tight">
              Surpreenda quem você ama.
            </h2>
            <p className="text-white/80 font-body text-lg mb-10">
              Crie agora uma experiência inesquecível em menos de 3 minutos.
            </p>
            <Link to="/criar">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg rounded-full px-10 py-6 gap-2 shadow-lg"
              >
                Criar meu almanaque
                <Heart className="w-5 h-5 fill-current" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-background text-center">
        <p className="text-sm text-muted-foreground font-body">
          Feito com <Heart className="inline w-3 h-3 text-primary fill-primary" /> Almanaque Digital do Casal
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
