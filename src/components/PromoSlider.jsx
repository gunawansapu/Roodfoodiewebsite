import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Data promo - tinggal tambahkan foto baru dengan URL gambar
const promos = [
  {
    id: 1,
    title: "Ayam Bakar Pejantan",
    subtitle: "Nikmati cita rasa Ayam Bakar terbaik dengan bumbu rahasia.",
    image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/359d51ea-e7c1-42d9-b2ea-5f9aeb7e6508_Go-Biz_20240915_050322.jpeg",
  },
  {
    id: 2,
    title: "Ayam Bakar Madu",
    subtitle: "Lezat dan kenyal, Ayam Bakar Madu.",
    image: "https://www.hypermart.co.id/wp-content/uploads/elementor/thumbs/41-p5q08igqpoy19f4zhvpgme99ekxgi351gqpgxlozrs.jpg",
  },
  {
    id: 3,
    title: "Ayam Taliwang",
    subtitle: "Ayam pedas khas Lombok dengan bumbu yang autentik.",
    image: "https://indonesiakaya.com/wp-content/uploads/2023/04/at_Artboard_4.jpg",
  },
];

export default function PromoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto mb-10 select-none">
      <div className="overflow-hidden rounded-2xl shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={promos[current].id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[250px] md:h-[400px] flex items-center justify-center"
          >
            <img
              src={promos[current].image}
              alt={promos[current].title}
              className="absolute w-full h-full object-cover object-center"
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4 rounded-2xl">
              <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg mb-3">
                {promos[current].title}
              </h3>
              <p className="text-lg md:text-xl text-white opacity-90 drop-shadow">
                {promos[current].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-5 gap-3">
        {promos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2
              ${i === current
                ? "bg-fuchsia-500 border-fuchsia-400 shadow-[0_0_10px_rgba(219,39,119,0.7)]"
                : "bg-white/40 border-white/50"
              }
              hover:scale-125`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
