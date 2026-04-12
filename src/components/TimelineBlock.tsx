import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Moment } from '@/lib/almanaque-store';

interface TimelineBlockProps {
  moment: Moment;
  index: number;
}

const TimelineBlock: React.FC<TimelineBlockProps> = ({ moment, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

      {/* Timeline dot */}
      <div className="hidden md:block absolute left-1/2 top-12 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`md:w-[45%] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
      >
        <div className="bg-card/70 backdrop-blur-sm rounded-lg p-5 md:p-7 shadow-romantic border border-border">
          {/* Photo */}
          {moment.imageUrl && (
            <div className="mb-5 -mx-2 -mt-2">
              <div className="photo-frame overflow-hidden">
                <img
                  src={moment.imageUrl}
                  alt={moment.title}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">
              {moment.title}
            </h3>
            <p className="text-base font-body text-ink-light leading-relaxed">
              {moment.text}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineBlock;
