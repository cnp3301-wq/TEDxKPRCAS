import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import { useSpeakers } from "@/hooks/use-database";
import { ThreeDImageRing } from "./ui/draggable-3d-image-ring";

const SpeakersSection = () => {
  const { data: speakers = [], isLoading } = useSpeakers();

  // Get speaker images for 3D ring
  const speakerImages = speakers
    .filter((s) => s.image)
    .map((s) => s.image as string);

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
        ) : speakerImages.length === 0 ? (
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 3D Ring Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center min-h-[500px]"
            >
              <div className="w-full h-full flex items-center justify-center">
                <ThreeDImageRing
                  images={speakerImages}
                  width={300}
                  perspective={2000}
                  imageDistance={500}
                  initialRotation={180}
                  animationDuration={1.5}
                  staggerDelay={0.1}
                  hoverOpacity={0.4}
                  backgroundColor="transparent"
                  draggable={true}
                  mobileBreakpoint={768}
                  mobileScaleFactor={0.7}
                  containerClassName="w-full max-w-md mx-auto"
                />
              </div>
            </motion.div>

            {/* Speakers List Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {speakers.map((speaker, index) => (
                <motion.div
                  key={speaker.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-tedx-red/30 rounded-lg p-4 hover:border-tedx-red/60 transition-colors bg-card/50 backdrop-blur-sm group"
                >
                  <div className="flex items-center gap-4">
                    {speaker.image && (
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-tedx-red transition-colors">
                        {speaker.name}
                      </h3>
                      <p className="text-sm text-tedx-red">{speaker.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpeakersSection;
