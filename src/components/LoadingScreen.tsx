import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),   // TEDx outline appears
      setTimeout(() => setPhase(2), 2000),  // TEDx fills red
      setTimeout(() => setPhase(3), 3000),  // KPRCAS slides in
      setTimeout(() => setPhase(4), 4200),  // Show scroll hint
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => onComplete(), 600);
      }, 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center">
            {/* Phase 1: TEDx with red stroke outline only */}
            {phase >= 1 && phase < 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-baseline"
              >
                <span
                  className="font-heading text-8xl md:text-[12rem] lg:text-[16rem] font-black tracking-tight"
                  style={{
                    WebkitTextStroke: "2px hsl(var(--tedx-red))",
                    color: "transparent",
                  }}
                >
                  TED
                </span>
                <span
                  className="font-heading text-6xl md:text-[9rem] lg:text-[12rem] font-black -ml-1"
                  style={{
                    WebkitTextStroke: "2px hsl(var(--tedx-red))",
                    color: "transparent",
                  }}
                >
                  x
                </span>
              </motion.div>
            )}

            {/* Phase 2: TEDx fills solid red */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-baseline"
              >
                <motion.span
                  initial={{ color: "transparent" }}
                  animate={{ color: "hsl(var(--tedx-red))" }}
                  transition={{ duration: 0.5 }}
                  className="font-heading text-8xl md:text-[12rem] lg:text-[16rem] font-black tracking-tight"
                  style={{ WebkitTextStroke: "2px hsl(var(--tedx-red))" }}
                >
                  TED
                </motion.span>
                <motion.span
                  initial={{ color: "transparent" }}
                  animate={{ color: "hsl(var(--tedx-red))" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-heading text-6xl md:text-[9rem] lg:text-[12rem] font-black -ml-1 text-tedx-red"
                >
                  x
                </motion.span>

                {/* Phase 3: KPRCAS slides in from right */}
                {phase >= 3 && (
                  <motion.span
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="font-heading text-7xl md:text-[10rem] lg:text-[14rem] font-black tracking-tight text-foreground ml-2 md:ml-4"
                  >
                    KPRCAS
                  </motion.span>
                )}
              </motion.div>
            )}
          </div>

          {/* Scroll up hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-muted-foreground text-3xl"
            >
              ⌃
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
