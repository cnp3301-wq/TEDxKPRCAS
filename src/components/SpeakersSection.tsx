import { motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { useSpeakers } from "@/hooks/use-database";
import { useState } from "react";

interface iSpeaker {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

const SpeakerModal = ({ speaker, isOpen, onClose }: { speaker: iSpeaker | null; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !speaker) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white text-force-black rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-tedx-red/10 hover:bg-tedx-red/20 rounded-full z-20 transition-colors"
        >
          <X className="w-6 h-6 text-tedx-red" />
        </button>

        {/* Speaker Image - Fixed */}
        <div className="relative h-80 w-full flex-shrink-0 overflow-hidden">
          {speaker.image ? (
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-tedx-red/20 to-secondary/30 flex items-center justify-center text-8xl text-tedx-red/30">
              {speaker.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Speaker Info - Scrollable */}
        <div className="overflow-y-auto flex-1 p-8 sm:p-10 text-force-black">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-force-black">{speaker.name}</h2>
          <p className="text-lg sm:text-xl font-semibold mb-6 text-force-black">{speaker.role}</p>
          
          {speaker.bio ? (
            <p className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap text-force-black">
              {speaker.bio}
            </p>
          ) : (
            <p className="text-base text-force-black">No description available</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SpeakerCardNew = ({ speaker, index, onCardClick }: { speaker: iSpeaker; index: number; onCardClick: (speaker: iSpeaker) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onCardClick(speaker)}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full relative">
        {/* Image Container with Wavy Bottom */}
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          {speaker.image ? (
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-white flex items-center justify-center text-force-black">
              <span className="text-6xl">{speaker.name.charAt(0)}</span>
            </div>
          )}

          {/* Wavy Bottom Edge SVG */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ height: "40px", transform: "translateY(1px)" }}
          >
            <path
              d="M0,50 Q150,0 300,50 T600,50 T900,50 T1200,50 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 text-force-black">
          <h3 className="font-bold text-lg sm:text-xl text-black uppercase tracking-wider mb-1">
            {speaker.name}
          </h3>
          <p className="text-black text-sm sm:text-base font-medium">
            {speaker.role}
          </p>
          {speaker.bio && (
            <p className="text-black text-xs sm:text-sm mt-2 line-clamp-2">
              {speaker.bio}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SpeakersSection = () => {
  const { data: speakers = [], isLoading, isError, error } = useSpeakers();
  const [selectedSpeaker, setSelectedSpeaker] = useState<iSpeaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpeakerClick = (speaker: iSpeaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSpeaker(null);
  };

  return (
    <section id="speakers" className="py-12 sm:py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      <AnimatedBackground variant="grid" particleCount={5} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl uppercase mb-3 sm:mb-4"
        >
          Our <span className="text-tedx-red">Speakers</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 sm:mb-12 md:mb-16"
        >
          
        </motion.p>

        {isError ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-tedx-red" />
              <p className="text-tedx-red text-lg">Error loading speakers</p>
            </div>
            <p className="text-muted-foreground text-sm">
              {error?.message || "Unable to load speaker information at this time."}
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Please check back later or contact us for more information.
            </p>
          </motion.div>
        ) : isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="inline-block">
              <div className="w-8 h-8 border-4 border-tedx-red/30 border-t-tedx-red rounded-full animate-spin"></div>
            </div>
            <p className="text-muted-foreground text-xl mt-4 animate-pulse">Loading speakers...</p>
          </motion.div>
        ) : speakers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16 sm:py-20"
          >
            {/* Animated card container */}
            <motion.div 
              className="relative inline-block bg-gradient-to-br from-secondary/80 to-background border border-tedx-red/20 rounded-2xl px-8 sm:px-16 py-10 sm:py-14 shadow-2xl shadow-tedx-red/5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-tedx-red rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-tedx-red rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-tedx-red rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-tedx-red rounded-br-2xl" />
              
              {/* Animated question marks */}
              <div className="flex justify-center gap-4 mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -15, 0],
                      rotateZ: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-tedx-red/10 rounded-full flex items-center justify-center border border-tedx-red/30"
                  >
                    <span className="text-3xl sm:text-4xl text-tedx-red">?</span>
                  </motion.div>
                ))}
              </div>

              {/* Main text */}
              <motion.h3
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl sm:text-3xl md:text-4xl text-white mb-3"
              >
                To Be <span className="text-tedx-red">Revealed</span>
              </motion.h3>
              
              <p className="text-muted-foreground text-base sm:text-lg">
                Our incredible speakers will be announced soon
              </p>

              {/* Decorative dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-tedx-red/60"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {speakers.map((speaker, index) => (
                <SpeakerCardNew
                  key={speaker.id}
                  speaker={{
                    id: speaker.id,
                    name: speaker.name,
                    role: speaker.role,
                    image: speaker.image || "",
                    bio: speaker.bio || "",
                  }}
                  index={index}
                  onCardClick={handleSpeakerClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <SpeakerModal speaker={selectedSpeaker} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

export default SpeakersSection;
