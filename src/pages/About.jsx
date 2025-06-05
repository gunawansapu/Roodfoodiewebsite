// File: src/pages/About.jsx
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function About() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        relative overflow-hidden
      "
    >
      {/* Background waves */}
      <svg
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-40 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="rgba(244, 114, 182, 0.2)" /* pink rose transparent */
          d="M0,64L48,80C96,96,192,128,288,149.3C384,171,480,181,576,176C672,171,768,149,864,138.7C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      {/* Background dots pattern */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1" fill="rgba(244, 114, 182, 0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Bottom wave */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none rotate-180"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="rgba(244, 114, 182, 0.15)"
          d="M0,64L48,80C96,96,192,128,288,149.3C384,171,480,181,576,176C672,171,768,149,864,138.7C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="relative z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 shadow-xl rounded-3xl p-8 md:p-12 max-w-3xl w-full"
      >
        <motion.div
          variants={fadeInVariant}
          className="flex items-center justify-center mb-6"
        >
          <Sparkles className="text-rose-500 dark:text-rose-400 w-8 h-8 mr-2" />
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 text-center">
            RoodFoodie
          </h2>
        </motion.div>

        <motion.hr
          variants={fadeInVariant}
          className="border-t-2 border-rose-400 dark:border-rose-600 w-20 mx-auto mb-6"
        />

        <motion.p
          variants={fadeInVariant}
          className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify"
        >
          <strong>RoodFoodie</strong> adalah website yang menyediakan berbagai masakan
          rumahan khas nusantara dengan cita rasa otentik. Kami berdedikasi untuk
          menghadirkan pengalaman kuliner yang lezat dan nyaman, dengan bahan-bahan
          segar dan resep turun-temurun dari berbagai daerah di Indonesia.
        </motion.p>

        <motion.p
          variants={fadeInVariant}
          className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify"
        >
          Kami percaya bahwa{" "}
          <span className="font-semibold text-rose-600 dark:text-rose-400">
            makanan adalah cara terbaik untuk menghubungkan budaya dan orang
          </span>
          . Dengan pelayanan yang ramah dan kualitas produk yang terjaga, RoodFoodie
          berkomitmen menjadi pilihan utama bagi pecinta kuliner nusantara.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default About;
