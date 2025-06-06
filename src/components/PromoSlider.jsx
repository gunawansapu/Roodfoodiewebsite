import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const promos = [
  {
    id: 1,
    title: "Nasi Goreng Spesial",
    subtitle: "Nikmati cita rasa nasi goreng terbaik dengan bumbu rahasia.",
    bgColor: "bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500",
    image: "https://images.unsplash.com/photo-1604908177220-2d11c06fdb1b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Bakso Malang",
    subtitle: "Lezat dan kenyal, bakso khas Malang yang menggoda selera.",
    bgColor: "bg-gradient-to-r from-gray-600 via-gray-800 to-red-700",
    image: "https://marketplace.canva.com/EAGb3_-JrGc/1/0/1600w/canva-merah-dan-kuning-ilustrasi-promosi-iklan-nasi-goreng-banner-0LFlPNBxdvE.jpg",
  },
  {
    id: 3,
    title: "Ayam Taliwang",
    subtitle: "Ayam pedas khas Lombok dengan bumbu yang autentik.",
    bgColor: "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400",
    image: "https://images.unsplash.com/photo-1604908177220-4a7ca1a216c4?auto=format&fit=crop&w=600&q=80",
  },
];

export default function PromoSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-10 select-none">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={promos[current].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className={`${promos[current].bgColor} text-white px-8 py-16 flex flex-col items-center justify-center min-h-[180px]`}
          >
            <h3 className="text-2xl font-bold mb-2 text-center">
              {promos[current].title}
            </h3>
            <p className="text-center text-lg opacity-90">
              {promos[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

    {/* Pagination */}
<div className="flex justify-center mt-4 gap-3">
  {promos.map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrent(i)}
      className={`
        w-5 h-5 rounded-full transition-colors duration-300
        border-2
        ${
          i === current
            ? "bg-fuchsia-500 border-fuchsia-400 shadow-[0_0_10px_3px_rgba(219,39,119,0.7)] dark:bg-cyan-500 dark:border-cyan-400 dark:shadow-[0_0_10px_3px_rgba(6,182,212,0.7)]"
            : "bg-white/40 border-white/50 dark:bg-gray-600 dark:border-gray-500"
        }
        hover:border-fuchsia-400 dark:hover:border-cyan-400
        focus:outline-none
      `}
      aria-label={`Slide ${i + 1}`}
    />
  ))}
</div>

    </div>
  );
}
