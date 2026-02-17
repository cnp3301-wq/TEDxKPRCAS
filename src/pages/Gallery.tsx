import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useGalleryImages } from "@/hooks/use-database";
import { ScrollTimeline } from "@/components/ui/scroll-timeline";
import type { TimelineEvent } from "@/components/ui/scroll-timeline";
import { AlertCircle } from "lucide-react";

const Gallery = () => {
  const { data: galleryImages = [], isLoading, isError, error } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-background min-h-screen relative">
      <AnimatedBackground variant="default" particleCount={10} />
      <Navbar />

      <div className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase mb-4">
              <span className="text-tedx-red">Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore memorable moments from TEDx KPRCAS events
            </p>
          </motion.div>

          {/* Gallery Content */}
          {isError ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-tedx-red" />
                <p className="text-tedx-red text-lg font-medium">Error loading gallery</p>
              </div>
              <p className="text-muted-foreground text-sm">
                {error?.message || "Unable to load gallery images at this time."}
              </p>
            </motion.div>
          ) : isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-block mb-4">
                <div className="w-8 h-8 border-4 border-tedx-red/30 border-t-tedx-red rounded-full animate-spin"></div>
              </div>
              <p className="text-muted-foreground text-lg animate-pulse">Loading gallery...</p>
            </motion.div>
          ) : galleryImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">No gallery images yet.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ScrollTimeline
                events={galleryImages.map((img, index) => ({
                  id: img.id,
                  year: new Date(img.created_at || Date.now()).getFullYear().toString(),
                  title: img.title || `Event ${index + 1}`,
                  description: img.description || "Gallery image from TEDx KPRCAS events",
                  image: img.image,
                  subtitle: new Date(img.created_at || Date.now()).toLocaleDateString(),
                } as TimelineEvent))}
                title="Gallery Timeline"
                subtitle="Explore memorable moments from TEDx KPRCAS events"
                cardAlignment="alternating"
                cardEffect="glow"
                revealAnimation="scale"
                progressIndicator={true}
                connectorStyle="line"
                animationOrder="staggered"
              />
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;

