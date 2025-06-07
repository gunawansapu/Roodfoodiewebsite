import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function About() {
  const fullText = "RoodFoodie";
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && text.length < fullText.length) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 150);
    } else if (!isDeleting && text.length === fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length - 1));
      }, 100);
    } else if (isDeleting && text.length === 0) {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      
      {/* Background Atas */}
      <div className="absolute top-0 left-0 w-full h-40 z-0 pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
          <path
            fill="rgba(244, 114, 182, 0.2)"
            d="M0,64L48,80C96,96,192,128,288,149.3C384,171,480,181,576,176C672,171,768,149,864,138.7C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Pola Titik */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1" fill="rgba(244, 114, 182, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Background Bawah */}
      <div className="absolute bottom-0 left-0 w-full h-40 z-0 pointer-events-none rotate-180">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
          <path
            fill="rgba(244, 114, 182, 0.15)"
            d="M0,64L48,80C96,96,192,128,288,149.3C384,171,480,181,576,176C672,171,768,149,864,138.7C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Konten */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="relative z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 shadow-xl rounded-3xl p-8 md:p-12 max-w-3xl w-full text-center"
      >
        <div className="flex items-center justify-center mb-6 space-x-2 flex-nowrap">
          <Sparkles className="text-rose-500 dark:text-rose-400 w-6 h-6 md:w-8 md:h-8" />
          <h2
            className="text-3xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 font-mono"
            style={{ whiteSpace: 'nowrap' }}
          >
            {text}
            <span className="border-r-2 md:border-r-4 border-rose-500 animate-blink ml-1" />
          </h2>
        </div>

        <hr className="border-t-2 border-rose-400 dark:border-rose-600 w-20 mx-auto mb-6" />

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
          <strong>RoodFoodie</strong> adalah website yang menyediakan berbagai masakan
          rumahan khas nusantara dengan cita rasa otentik. Kami berdedikasi untuk
          menghadirkan pengalaman kuliner yang lezat dan nyaman, dengan bahan-bahan
          segar dan resep turun-temurun dari berbagai daerah di Indonesia.
        </p>

        <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
          Kami percaya bahwa{" "}
          <span className="font-semibold text-rose-600 dark:text-rose-400">
            makanan adalah cara terbaik untuk menghubungkan budaya dan orang
          </span>
          . Dengan pelayanan yang ramah dan kualitas produk yang terjaga, RoodFoodie
          berkomitmen menjadi pilihan utama bagi pecinta kuliner nusantara.
        </p>
      </motion.div>

      {/* Animasi kursor */}
      <style>{`
        @keyframes blink {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1.2s step-start infinite;
        }
      `}</style>
    </div>
  );
}
