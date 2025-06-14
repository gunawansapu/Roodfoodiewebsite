import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFzaSUyMGdvcmVuZ3xlbnwwfHwwfHx8MA%3D%3D", alt: "Nasi Goreng Spesial" },
  { id: 2, src: "https://www.hypermart.co.id/wp-content/uploads/elementor/thumbs/41-p5q08igqpoy19f4zhvpgme99ekxgi351gqpgxlozrs.jpg", alt: "Ayam Bakar Madu" },
  { id: 3, src: "https://healthybelly.s3.amazonaws.com/product/media_1738841131_0.webp", alt: "Soto Ayam" },
  { id: 4, src: "https://awsimages.detik.net.id/community/media/visual/2020/10/08/ikan-nila-bakar-pedas-manis-2_169.jpeg?w=620", alt: "Ikan Bakar" },
  { id: 5, src: "https://www.astronauts.id/blog/wp-content/uploads/2023/12/Daftar-Kue-Tradisional-Indonesia-Populer-Dari-Berbagai-Daerah.jpg", alt: "Kue Tradisional" },
  { id: 6, src: "https://www.shutterstock.com/image-photo/es-cendol-dawet-drink-made-600nw-2538351249.jpg", alt: "Es Cendol Segar" },
  { id: 7, src: "https://cdn1-production-images-kly.akamaized.net/OUqqLu3BtXjfJac0EtxLVMETVws=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3128504/original/083078300_1589462572-shutterstock_435468841.jpg", alt: "Es Teh Manis" },
  { id: 8, src: "https://indonesiakaya.com/wp-content/uploads/2023/04/at_Artboard_4.jpg", alt: "Ayam Bakar Taliwang" },
  { id: 9, src: "https://www.ninevibe.com/storage/statement-images/OD3rY1bPCixDb8NP2Z8Pi2325o3L47HKSknNyK0I.webp", alt: "Jus Alpukat" },
  { id: 10, src: "https://i.pinimg.com/736x/a0/df/cf/a0dfcff4e2218364adc12cd4c96c50c2.jpg", alt: "Bakso Malang" },
];

function Gallery() {
  const [lightbox, setLightbox] = useState({ isOpen: false, currentImg: null });

  const openLightbox = (img) => {
    setLightbox({ isOpen: true, currentImg: img });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, currentImg: null });
  };

  return (
    <div className="min-h-screen w-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-repeat bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-4">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Galeri Foto
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.07, duration: 0.6, ease: "easeOut" }}
              className="cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800"
              onClick={() => openLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 object-cover rounded-t-xl"
                loading="lazy"
              />
              <div className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-200">
                {img.alt}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeLightbox}
        >
          <img
            src={lightbox.currentImg.src}
            alt={lightbox.currentImg.alt}
            className="max-w-4xl max-h-[80vh] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-600"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
