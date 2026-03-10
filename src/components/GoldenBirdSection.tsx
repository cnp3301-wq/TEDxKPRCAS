import { useRef } from "react";
import { motion } from "framer-motion";
import { useSiteSetting } from "@/hooks/use-database";

const GoldenBirdSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: themeVideoUrl = "" } = useSiteSetting("theme_video_url");

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=0&showinfo=0&rel=0`;
    return url;
  };

  // Generate random geometric shapes
  const shapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 60 + Math.random() * 200,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 2,
    type: ["cube", "hex"][Math.floor(Math.random() * 2)],
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-black overflow-hidden flex items-center justify-center"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              width: shape.size,
              height: shape.size,
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 180],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {shape.type === "cube" ? (
              <div
                className="w-full h-full"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="w-full h-full bg-red-700 opacity-40 border-2 border-red-600"
                  style={{
                    transform: "rotateX(45deg) rotateY(45deg)",
                  }}
                />
              </div>
            ) : (
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                opacity={shape.opacity}
              >
                <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="#dc2626" strokeWidth="2" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="border border-red-900/40 rounded-2xl bg-gradient-to-br from-black/60 via-red-950/30 to-black/80 backdrop-blur-sm p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left side - Text content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Theme label */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <p className="text-yellow-400 text-xs md:text-sm tracking-[0.3em] uppercase font-light">
                  ~ THEME ~
                </p>
              </motion.div>

              {/* Decorative top line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-8 origin-left"
              />

              {/* Main title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-6xl md:text-8xl lg:text-9xl tracking-widest font-black leading-tight" style={{
                  fontFamily: '"Neuland Inline", sans-serif',
                  background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #fbbf24 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(253, 211, 77, 0.5)',
                  filter: 'drop-shadow(0 0 20px rgba(253, 211, 77, 0.3))',
                  fontWeight: 900,
                }}>
                  THE GOLDEN BIRD
                </h2>
              </motion.div>

              {/* Decorative dots */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-8 origin-center"
              />

              {/* Subtitle/Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-lg"
              >
                <p className="text-yellow-100 text-base md:text-lg leading-relaxed tracking-wide font-light">
                  Discover the elegance and brilliance of our most luxurious theme experience
                </p>
              </motion.div>
            </div>

            {/* Right side - Retro TV with Video */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex-shrink-0 relative"
              style={{ width: 420, height: 380 }}
            >
              {/* TV Glow */}
              <div className="absolute inset-0 bg-yellow-400/5 blur-3xl rounded-3xl pointer-events-none" />

              {/* Retro TV Frame */}
              <div className="relative w-full h-full" style={{ filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.8))' }}>
                {/* TV Body */}
                <div className="absolute inset-0 rounded-2xl" style={{
                  background: 'linear-gradient(145deg, #8B6914 0%, #6B4F12 20%, #5C4410 40%, #4A3B0E 60%, #3D310C 80%, #2E250A 100%)',
                  border: '3px solid #4A3B0E',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.6)',
                }}>
                  {/* Wood grain texture overlay */}
                  <div className="absolute inset-0 rounded-2xl opacity-20" style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 9px)',
                  }} />
                </div>

                {/* Screen bezel (silver) */}
                <div className="absolute rounded-xl" style={{
                  top: 20, left: 20, right: 130, bottom: 30,
                  background: 'linear-gradient(145deg, #a8a8a8 0%, #888 30%, #777 60%, #666 100%)',
                  padding: 12,
                  borderRadius: 16,
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
                }}>
                  {/* Inner screen depression */}
                  <div className="w-full h-full rounded-lg overflow-hidden relative" style={{
                    background: '#111',
                    boxShadow: 'inset 0 3px 15px rgba(0,0,0,0.8)',
                  }}>
                    {/* CRT screen curvature overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none" style={{
                      background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
                    }} />
                    {/* Scanline effect */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-10" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                    }} />

                    {/* Video content */}
                    {themeVideoUrl ? (
                      themeVideoUrl.includes('youtube') || themeVideoUrl.includes('youtu.be') ? (
                        <iframe
                          src={getEmbedUrl(themeVideoUrl)}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          style={{ border: 'none' }}
                          title="Theme Video"
                        />
                      ) : (
                        <video
                          src={themeVideoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-gray-600 text-4xl mb-2">📺</div>
                          <p className="text-gray-600 text-xs">No video set</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right panel (controls) */}
                <div className="absolute rounded-r-xl flex flex-col items-center justify-between py-6" style={{
                  top: 20, right: 15, width: 100, bottom: 30,
                }}>
                  {/* Brand label */}
                  <div className="text-[8px] tracking-widest text-yellow-200/40 uppercase">TEDx</div>

                  {/* Channel dial */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full" style={{
                      background: 'linear-gradient(145deg, #999 0%, #666 50%, #555 100%)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)',
                    }}>
                      <div className="absolute inset-2 rounded-full" style={{
                        background: 'linear-gradient(145deg, #777 0%, #555 100%)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
                      }}>
                        {/* Dial markings */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="absolute w-0.5 h-1.5 bg-gray-400/50" style={{
                            top: '50%', left: '50%',
                            transform: `rotate(${i * 45}deg) translateY(-14px) translateX(-50%)`,
                          }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Volume dial */}
                  <div className="w-10 h-10 rounded-full" style={{
                    background: 'linear-gradient(145deg, #888 0%, #555 100%)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.15)',
                  }}>
                    <div className="absolute inset-1.5 rounded-full" style={{
                      background: 'linear-gradient(145deg, #666 0%, #444 100%)',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
                    }} />
                  </div>

                  {/* Speaker grille */}
                  <div className="w-16 flex flex-col gap-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="w-full h-0.5 bg-yellow-900/30 rounded-full" />
                    ))}
                  </div>
                </div>

                {/* TV Stand */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-4 rounded-b-lg" style={{
                  background: 'linear-gradient(180deg, #2E250A 0%, #1a1a0a 100%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default GoldenBirdSection;
