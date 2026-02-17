import { motion } from "framer-motion";

const stats = [
  { number: "3+", label: "Events" },
  { number: "25+", label: "Speakers" },
  { number: "50+", label: "Community Members" },
  { number: "20+", label: "Active Members" },
];

/* ── DNA Helix / Wave Animation ── */
const WaveHelixAnimation = () => {
  const nodeCount = 10;
  return (
    <div className="relative w-full h-[350px] md:h-[420px] flex items-center justify-center overflow-hidden">
      {/* Vertical wave strands */}
      {[...Array(nodeCount)].map((_, i) => {
        const delay = i * 0.15;
        const yPos = 10 + (i / (nodeCount - 1)) * 80;
        return (
          <div key={i} className="absolute w-full" style={{ top: `${yPos}%` }}>
            {/* Left node */}
            <motion.div
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-tedx-red shadow-[0_0_12px_rgba(239,68,68,0.6)]"
              animate={{
                left: ["25%", "55%", "25%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
            {/* Right node */}
            <motion.div
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-400/60 shadow-[0_0_10px_rgba(248,113,113,0.4)]"
              animate={{
                left: ["65%", "35%", "65%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
            {/* Connecting line */}
            <motion.div
              className="absolute h-[1px] bg-gradient-to-r from-tedx-red/40 via-red-500/20 to-red-400/40 top-1.5 md:top-2"
              animate={{
                left: ["25%", "55%", "25%"],
                right: ["35%", "45%", "35%"],
                width: ["40%", "0%", "40%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      })}

      {/* Vertical pulse lines */}
      <motion.div
        className="absolute left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-tedx-red/20 to-transparent"
        animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[60%] w-[1px] h-full bg-gradient-to-b from-transparent via-red-400/15 to-transparent"
        animate={{ opacity: [0.3, 0.5, 0.3], scaleY: [0.9, 1, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Background glow */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-tedx-red/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side: Wave Helix Animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <WaveHelixAnimation />
          </motion.div>

          {/* Right side: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 10, borderColor: "hsl(0 84% 50%)" }}
                className="border-b border-border pb-6 cursor-default transition-colors"
              >
                <motion.span
                  className="font-heading text-5xl font-black text-tedx-red inline-block"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.span>
                <span className="font-heading text-2xl text-foreground ml-2">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
