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
    <div className="min-h-screen flex items-center justify-center px-4 
      bg-[url('https://www.transparenttextures.com/patterns/food.png')] 
      bg-repeat bg-white dark:bg-gray-900 transition-colors duration-500 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="relative z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 shadow-xl rounded-3xl p-8 md:p-12 max-w-4xl w-full text-center"
      >
        <div className="flex items-center justify-center mb-6 space-x-2 flex-nowrap">
          <Sparkles className="text-red-500 dark:text-red-400 w-6 h-6 md:w-8 md:h-8" />
          <h2 className="text-3xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 font-mono" style={{ whiteSpace: 'nowrap' }}>
            {text}
            <span className="border-r-2 md:border-r-4 border-red-500 animate-blink ml-1" />
          </h2>
        </div>

        <hr className="border-t-2 border-red-400 dark:border-red-600 w-20 mx-auto mb-6" />

        <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify space-y-6">
          <p><strong>RoodFoodie</strong> adalah website yang menyediakan berbagai masakan rumahan khas nusantara dengan cita rasa otentik. Kami berdedikasi menghadirkan pengalaman kuliner yang lezat dan nyaman, dengan bahan-bahan segar dan resep turun-temurun dari berbagai daerah di Indonesia.</p>
          <p>Kami percaya bahwa <span className="font-semibold text-red-600 dark:text-red-400">makanan adalah cara terbaik untuk menghubungkan budaya dan orang</span>. Dengan pelayanan ramah dan kualitas produk yang terjaga, RoodFoodie berkomitmen menjadi pilihan utama bagi pecinta kuliner nusantara.</p>
          <p>Berawal dari kecintaan memasak, Rudie Siswanto memulai bisnis kuliner sejak November 2017 dengan membuka Warung RoodFoodie yang menyajikan ayam bakar andalan dengan paduan bumbu khas Jawa Tengah yang manis serta Jawa Timur yang gurih dan asin. Hidangan ini semakin menggugah selera dengan serundeng dan enam macam sambal khas.</p>
          <p>Perpaduan rasa unik tersebut berhasil mengantarkan RoodFoodie menjadi Juara Nasional Festival Jajan Bango 2018 dan menjadi bagian dari regenerasi pelestarian warisan kuliner nusantara melalui kompetisi "Bango Penerus Warisan Kuliner 2018".</p>
          <p>Berbekal kemenangan tersebut, RoodFoodie terus menjaga warisan kuliner nusantara, tidak hanya melalui warung di Jl. Bima Raya No.11B Semarang, namun juga dengan menghadirkan produk Ayam Kemasan Siap Masak, enam varian sambal, serta serundeng khas yang dipasarkan secara online untuk menjangkau pelanggan yang tidak sempat datang langsung.</p>
          <p>Untuk menjaga kualitas, RoodFoodie menyediakan Ayam Ungkep Kemasan Frozen tanpa bahan pengawet yang tahan hingga 6 bulan dalam kondisi beku. Selain itu, sambal, kremes, dan serundeng dikemas dalam botol berlapis extra protection untuk menjaga keawetan dan keamanan konsumsi.</p>
        </div>
      </motion.div>

      {/* Animasi kursor */}
      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.2s step-start infinite;
        }
      `}</style>
    </div>
  );
}
