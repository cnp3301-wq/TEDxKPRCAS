import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import { useSpeakers } from "@/hooks/use-database";

const SpeakersSection = () => {
  const { data: speakers = [], isLoading } = useSpeakers();

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

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-xl animate-pulse">Loading speakers...</p>
          </motion.div>
        ) : speakers.length === 0 ? (
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
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker, i) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px hsl(0 84% 50% / 0.15)",
                  borderColor: "hsl(0 84% 50% / 0.6)",
                }}
                className="border border-tedx-red/30 rounded-lg p-6 transition-colors group cursor-pointer bg-card/50 backdrop-blur-sm"
              >
                <motion.div
                  className="w-full aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden relative bg-cover bg-center"
                  whileHover={{ scale: 1.02 }}
                >
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.span
                      className="font-heading text-6xl text-tedx-red/30 group-hover:text-tedx-red/60 transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      {speaker.name.charAt(0)}
                    </motion.span>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-tedx-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-foreground uppercase">{speaker.name}</h3>
                <p className="text-tedx-red font-heading text-sm uppercase tracking-wider mt-1">{speaker.role}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpeakersSection;
