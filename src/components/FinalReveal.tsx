import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

interface FinalRevealProps {
  message: string;
}

const FinalReveal: React.FC<FinalRevealProps> = ({ message }) => {
  const [step, setStep] = useState<'initial' | 'question' | 'accepted' | 'rejected'>('initial');
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const noRef = useRef<HTMLButtonElement>(null);

  const fireConfetti = useCallback(() => {
    const colors = ['#c9515b', '#d4956a', '#e8c170', '#f2d9e0', '#c77dba'];
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors });
    }, 250);
    setTimeout(() => {
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 }, colors });
    }, 500);
  }, []);

  const handleClickHere = () => setStep('question');

  const handleYes = () => {
    setStep('accepted');
    fireConfetti();
  };

  const handleNoHover = () => {
    const rx = (Math.random() - 0.5) * 250;
    const ry = (Math.random() - 0.5) * 150;
    setNoPos({ x: rx, y: ry });
  };

  return (
    <div className="py-20 md:py-32 px-4 text-center">
      <AnimatePresence mode="wait">
        {step === 'initial' && (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg md:text-xl font-body text-muted-foreground mb-8">
              Tem algo especial esperando por você...
            </p>
            <button
              onClick={handleClickHere}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-display text-xl md:text-2xl shadow-lg animate-pulse-soft hover:animate-none transition-all hover:scale-105"
            >
              <Heart className="w-6 h-6 fill-current group-hover:scale-125 transition-transform" />
              Clique aqui
              <Heart className="w-6 h-6 fill-current group-hover:scale-125 transition-transform" />
            </button>
          </motion.div>
        )}

        {step === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Heart className="w-10 h-10 text-primary fill-primary mx-auto mb-4 animate-pulse" />
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground mb-10 leading-snug">
              {message}
            </p>
            <div className="flex items-center justify-center gap-6 relative min-h-[80px]">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-display text-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                Sim 💕
              </motion.button>
              <motion.button
                ref={noRef}
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onHoverStart={handleNoHover}
                onTouchStart={handleNoHover}
                className="px-10 py-4 rounded-full border border-border text-muted-foreground font-display text-xl hover:cursor-not-allowed"
              >
                Não
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'accepted' && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-lg mx-auto"
          >
            <Heart className="w-14 h-14 text-primary fill-primary mx-auto mb-6 animate-pulse" />
            <p className="text-3xl md:text-5xl font-display font-bold text-foreground leading-snug mb-6">
              Que esse "sim" seja o primeiro de muitos! 💖
            </p>
            <p className="text-lg md:text-xl text-muted-foreground font-body">
              Cada dia ao seu lado é o melhor capítulo da minha história.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalReveal;
