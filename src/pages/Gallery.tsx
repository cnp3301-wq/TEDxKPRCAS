import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useGalleryImages } from "@/hooks/use-database";
import { Upload, X } from "lucide-react";

const Gallery = () => {
  const { data: galleryImages = [], isLoading } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    try {
      for (const file of Array.from(files)) {
        // Here you would upload to Supabase storage
        // For now, we'll just show the progress
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

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

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="border-2 border-dashed border-tedx-red/30 rounded-xl p-8 text-center bg-card/50 backdrop-blur-sm hover:border-tedx-red/60 transition-colors">
              <label className="cursor-pointer flex flex-col items-center gap-4">
                <Upload className="w-12 h-12 text-tedx-red" />
                <div>
                  <p className="font-heading text-lg font-bold text-foreground">Upload Images</p>
                  <p className="text-sm text-muted-foreground">Click to select images or drag and drop</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>

              {isUploading && (
                <motion.div className="w-full mt-4">
                  <div className="bg-secondary rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-tedx-red h-full"
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{Math.round(uploadProgress)}%</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg animate-pulse">Loading gallery...</p>
            </motion.div>
          ) : galleryImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">No images yet. Upload your first image!</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <div className="aspect-square overflow-hidden">
                    <motion.img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                    <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white font-heading font-bold">{image.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal for full-size image view */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[80vh]"
          >
            <img src={selectedImage} alt="Gallery" className="max-w-full max-h-full rounded-lg" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-tedx-red hover:bg-tedx-red/80 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;

