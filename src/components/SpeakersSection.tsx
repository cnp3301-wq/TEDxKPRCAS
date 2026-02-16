import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const SpeakersSection = () => {
  return (
    <section id="speakers" className="py-24 bg-secondary/30 relative overflow-hidden">
      <AnimatedBackground variant="grid" particleCount={5} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-5xl md:text-7xl font-black uppercase mb-4"
        >
          Our <span className="text-tedx-red">Speakers</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg mb-16"
        >
          Stay tuned for our incredible lineup of speakers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <p className="text-muted-foreground text-xl">
            Speaker details coming soon. Check back later for our confirmed speakers!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
