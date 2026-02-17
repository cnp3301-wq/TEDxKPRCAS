import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [curtainDone, setCurtainDone] = useState(false);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Curtain slides away first, then loading phases begin
    const curtainTimer = setTimeout(() => setCurtainDone(true), 4200);
    const timers = [
      curtainTimer,
      setTimeout(() => setPhase(1), 4400),
      setTimeout(() => setPhase(2), 5600),
      setTimeout(() => setPhase(3), 6600),
      setTimeout(() => setPhase(4), 7600),
      setTimeout(() => setPhase(5), 8600),
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => onComplete(), 800);
      }, 10000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* ── Red Theater Curtain — parts left & right like real cloth ── */}
          <motion.div
            className="absolute inset-0 z-[100] pointer-events-none overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: curtainDone ? 0 : 1 }}
            transition={{ duration: 0.5, delay: curtainDone ? 0.3 : 0 }}
          >
            {/* ── LEFT CURTAIN HALF ── */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 w-[52%]"
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{ duration: 3, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Base red fabric */}
              <div className="absolute inset-0" style={{
                background: `
                  linear-gradient(180deg,
                    #1a0000 0%,
                    #7B0000 4%,
                    #B22222 10%,
                    #CC0000 20%,
                    #DC143C 45%,
                    #CC0000 65%,
                    #B22222 80%,
                    #8B0000 92%,
                    #4a0000 100%
                  )
                `,
              }} />

              {/* Vertical folds — cloth pleats */}
              <div className="absolute inset-0" style={{
                background: `
                  repeating-linear-gradient(90deg,
                    rgba(0,0,0,0.18) 0px,
                    rgba(0,0,0,0.06) 12px,
                    rgba(255,220,220,0.08) 24px,
                    rgba(255,255,255,0.14) 36px,
                    rgba(255,220,220,0.08) 48px,
                    rgba(0,0,0,0.06) 60px,
                    rgba(0,0,0,0.18) 72px
                  )
                `,
              }} />

              {/* Top drape — curved valance */}
              <div className="absolute top-0 left-0 right-0 h-[14%]" style={{
                background: `
                  radial-gradient(ellipse 40% 100% at 20% 0%, #1a0000 0%, transparent 80%),
                  radial-gradient(ellipse 40% 100% at 55% 0%, #1a0000 0%, transparent 80%),
                  radial-gradient(ellipse 40% 100% at 85% 0%, #1a0000 0%, transparent 80%),
                  radial-gradient(ellipse 60% 90% at 35% 100%, rgba(204,0,0,0.6) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 90% at 70% 100%, rgba(204,0,0,0.6) 0%, transparent 70%)
                `,
              }} />

              {/* Right edge — draped fold shadow where curtains meet */}
              <div className="absolute top-0 bottom-0 right-0 w-[15%]" style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.5) 100%)`,
              }} />

              {/* Fabric sheen */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 70% 50% at 40% 35%, rgba(255,120,120,0.12) 0%, transparent 70%)`,
                }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Bottom shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* ── RIGHT CURTAIN HALF ── */}
            <motion.div
              className="absolute top-0 bottom-0 right-0 w-[52%]"
              initial={{ x: "0%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Base red fabric */}
              <div className="absolute inset-0" style={{
                background: `
                  linear-gradient(180deg,
                    #1a0000 0%,
                    #7B0000 4%,
                    #B22222 10%,
                    #CC0000 20%,
                    #DC143C 45%,
                    #CC0000 65%,
                    #B22222 80%,
                    #8B0000 92%,
                    #4a0000 100%
                  )
                `,
              }} />

              {/* Vertical folds — cloth pleats */}
              <div className="absolute inset-0" style={{
                background: `
                  repeating-linear-gradient(90deg,
                    rgba(0,0,0,0.18) 0px,
                    rgba(0,0,0,0.06) 12px,
                    rgba(255,220,220,0.08) 24px,
                    rgba(255,255,255,0.14) 36px,
                    rgba(255,220,220,0.08) 48px,
                    rgba(0,0,0,0.06) 60px,
                    rgba(0,0,0,0.18) 72px
                  )
                `,
              }} />

              {/* Top drape — curved valance */}
              <div className="absolute top-0 left-0 right-0 h-[14%]" style={{
                background: `
                  radial-gradient(ellipse 40% 100% at 15% 0%, #1a0000 0%, transparent 80%),
                  radial-gradient(ellipse 40% 100% at 45% 0%, #1a0000 0%, transparent 80%),
                  radial-gradient(ellipse 40% 100% at 80% 0%, #1a0000 0%, transparent 80%),
                  radial-gradient(ellipse 60% 90% at 30% 100%, rgba(204,0,0,0.6) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 90% at 65% 100%, rgba(204,0,0,0.6) 0%, transparent 70%)
                `,
              }} />

              {/* Left edge — draped fold shadow where curtains meet */}
              <div className="absolute top-0 bottom-0 left-0 w-[15%]" style={{
                background: `linear-gradient(270deg, transparent 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.5) 100%)`,
              }} />

              {/* Fabric sheen */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 70% 50% at 60% 35%, rgba(255,120,120,0.12) 0%, transparent 70%)`,
                }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Bottom shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* ── Center seam line where curtains meet ── */}
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px]"
              style={{
                background: `linear-gradient(180deg, #1a0000, rgba(0,0,0,0.6), #1a0000)`,
              }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
            />
          </motion.div>
          {/* Animated background particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? "hsl(var(--tedx-red))" : "hsl(var(--foreground))",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
                y: [0, -80 - Math.random() * 120],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Pulsing rings behind text */}
          {phase >= 1 && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute rounded-full border border-tedx-red/20"
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={{
                    width: [0, 600 + i * 200],
                    height: [0, 600 + i * 200],
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tedx-red/40 to-transparent"
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Corner decorations */}
          {phase >= 1 && (
            <>
              <motion.div
                className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-tedx-red/40"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-tedx-red/40"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <motion.div
                className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-tedx-red/40"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <motion.div
                className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-tedx-red/40"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </>
          )}

          <div className="flex flex-col items-center justify-center relative z-10">
            {/* Phase 1: TEDx outline - single clean render */}
            {phase >= 1 && phase < 2 && (
              <motion.div className="flex items-baseline">
                {"TED".split("").map((char, i) => (
                  <motion.span
                    key={`outline-${i}`}
                    className="font-heading text-7xl md:text-[10rem] lg:text-[13rem] font-black"
                    style={{
                      WebkitTextStroke: "2px hsl(var(--tedx-red))",
                      color: "transparent",
                    }}
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: "backOut" }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  className="font-heading text-5xl md:text-[7rem] lg:text-[10rem] font-black"
                  style={{
                    WebkitTextStroke: "2px hsl(var(--tedx-red))",
                    color: "transparent",
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "backOut" }}
                >
                  x
                </motion.span>
              </motion.div>
            )}

            {/* Phase 2+: TEDx fills red with glitch effect */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-baseline relative"
              >
                <motion.div
                  className="flex items-baseline"
                  animate={phase === 2 ? {
                    x: [0, -3, 4, -2, 0],
                    skewX: [0, -2, 1, -1, 0],
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {"TED".split("").map((char, i) => (
                    <motion.span
                      key={`filled-${i}`}
                      className="font-heading text-7xl md:text-[10rem] lg:text-[13rem] font-black"
                      style={{ WebkitTextStroke: "2px hsl(var(--tedx-red))" }}
                      initial={{ color: "transparent" }}
                      animate={{ color: "hsl(var(--tedx-red))" }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    className="font-heading text-5xl md:text-[7rem] lg:text-[10rem] font-black text-tedx-red"
                    initial={{ color: "transparent" }}
                    animate={{ color: "hsl(var(--tedx-red))" }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    x
                  </motion.span>
                </motion.div>

                {/* Glitch duplicates */}
                {phase === 2 && (
                  <>
                    <motion.span
                      className="absolute font-heading text-7xl md:text-[10rem] lg:text-[13rem] font-black text-tedx-red/30"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, -3, 0], opacity: [0, 0.5, 0.3, 0] }}
                      transition={{ duration: 0.4 }}
                      style={{ clipPath: "inset(30% 0 40% 0)" }}
                    >
                      TED
                    </motion.span>
                    <motion.span
                      className="absolute font-heading text-7xl md:text-[10rem] lg:text-[13rem] font-black"
                      initial={{ x: 0 }}
                      animate={{ x: [0, -4, 6, 0], opacity: [0, 0.3, 0.2, 0] }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      style={{ clipPath: "inset(60% 0 10% 0)", color: "hsl(var(--tedx-red) / 0.4)" }}
                    >
                      TED
                    </motion.span>
                  </>
                )}
              </motion.div>
            )}

            {/* Phase 3: KPRCAS slides in with staggered letters */}
            {phase >= 3 && (
              <motion.div
                className="flex items-baseline mt-[-1rem] md:mt-[-2rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {"KPRCAS".split("").map((char, i) => (
                  <motion.span
                    key={`kpr-${i}`}
                    className="font-heading text-5xl md:text-[7rem] lg:text-[9rem] font-black tracking-wider text-foreground"
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Phase 4: Tagline */}
            {phase >= 4 && (
              <motion.p
                className="text-muted-foreground font-heading text-lg md:text-2xl tracking-[0.3em] uppercase mt-4"
                initial={{ opacity: 0, letterSpacing: "0.6em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Ideas Worth Spreading
              </motion.p>
            )}

            {/* Phase 4: Progress bar */}
            {phase >= 4 && (
              <motion.div
                className="mt-8 w-48 h-[2px] bg-muted rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="h-full bg-tedx-red rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </div>

          {/* Phase 5: Scroll hint */}
          {phase >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-12 flex flex-col items-center gap-3"
            >
              <motion.span
                className="text-muted-foreground text-xs tracking-[0.2em] uppercase"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to explore
              </motion.span>
              <motion.div
                className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-1 h-2 rounded-full bg-tedx-red"
                  animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
