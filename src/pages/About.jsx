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
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 flex items-center justify-center px-4">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="backdrop-blur-xl bg-white/70 shadow-xl rounded-3xl p-8 md:p-12 max-w-3xl w-full"
      >
        <motion.div
          variants={fadeInVariant}
          className="flex items-center justify-center mb-6"
        >
          <Sparkles className="text-rose-500 w-8 h-8 mr-2" />
          <h2 className="text-4xl font-extrabold text-gray-800 text-center">
            RoodFoodie
          </h2>
        </motion.div>

        <motion.hr
          variants={fadeInVariant}
          className="border-t-2 border-rose-400 w-20 mx-auto mb-6"
        />

        <motion.p
          variants={fadeInVariant}
          className="text-lg leading-relaxed text-gray-700 text-justify"
        >
          <strong>RoodFoodie</strong> adalah website yang menyediakan berbagai masakan
          rumahan khas nusantara dengan cita rasa otentik. Kami berdedikasi untuk
          menghadirkan pengalaman kuliner yang lezat dan nyaman, dengan bahan-bahan
          segar dan resep turun-temurun dari berbagai daerah di Indonesia.
        </motion.p>

        <motion.p
          variants={fadeInVariant}
          className="mt-6 text-lg leading-relaxed text-gray-700 text-justify"
        >
          Kami percaya bahwa <span className="font-semibold text-rose-600">makanan adalah cara terbaik untuk menghubungkan budaya dan orang</span>. 
          Dengan pelayanan yang ramah dan kualitas produk yang terjaga, RoodFoodie
          berkomitmen menjadi pilihan utama bagi pecinta kuliner nusantara.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default About;
