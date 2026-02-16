import { motion } from "framer-motion";
import { Instagram, Mail, Linkedin } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { useContactInfo } from "@/hooks/use-database";

const ContactSection = () => {
  const { data: contactData, isLoading } = useContactInfo();

  // Use database email if available, otherwise show default
  const email = contactData?.email || "tedxkprcas@gmail.com";
  const phone = contactData?.phone || "+91-XXXX-XXXX-XX";

  return (
    <section id="contact" className="py-24 bg-secondary/30 relative overflow-hidden">
      <AnimatedBackground variant="default" particleCount={5} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ borderColor: "hsl(0 84% 50% / 0.5)" }}
            className="border border-border rounded-xl p-8 text-center bg-card/50 backdrop-blur-sm transition-colors"
          >
            <h3 className="font-heading text-3xl font-black text-tedx-red uppercase mb-2">Connect</h3>
            <p className="font-heading text-xl font-bold text-foreground uppercase mb-8">With Us On</p>
            <div className="flex justify-center gap-6">
              {[Instagram, Mail, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="border border-border rounded-lg p-4 hover:border-tedx-red transition-colors"
                  whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 0 20px hsl(0 84% 50% / 0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={28} className="text-foreground" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ borderColor: "hsl(0 84% 50% / 0.5)" }}
            className="bg-card/50 border border-border rounded-xl p-8 text-center backdrop-blur-sm transition-colors"
          >
            <h3 className="font-heading text-3xl font-black text-tedx-red uppercase mb-2">Questions?</h3>
            <p className="font-heading text-lg font-bold text-foreground uppercase mb-6">We're Here To Help!</p>
            <div className="space-y-4 text-muted-foreground">
              <p className="font-heading text-lg uppercase">Contact Us</p>
              {isLoading ? (
                <p className="text-muted-foreground animate-pulse">Loading contact info...</p>
              ) : (
                <>
                  <motion.a
                    href={`mailto:${email}`}
                    className="text-tedx-red font-heading text-xl hover:underline block"
                    whileHover={{ scale: 1.05 }}
                  >
                    {email}
                  </motion.a>
                  <motion.a
                    href={`tel:${phone}`}
                    className="text-tedx-red font-heading text-lg hover:underline block"
                    whileHover={{ scale: 1.05 }}
                  >
                    {phone}
                  </motion.a>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
