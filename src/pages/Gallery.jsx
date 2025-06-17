import { useState } from "react";
import { motion } from "framer-motion";

const images = [
       {
    id: 1,
    name: "Ayam Bakar Pejantan",
    src:
      "https://media.sukabumiupdate.com/media/2023/08/23/1692794817_64e5ffc1a3b7a_KwoK5jr7Wdduk0oFNxjn.webp",
      alt:"Ayam Bakar Pejantan"
  },
  {
    id: 2,
    name: "Es Teh Manis",
    src:
      "https://cdn1-production-images-kly.akamaized.net/OUqqLu3BtXjfJac0EtxLVMETVws=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3128504/original/083078300_1589462572-shutterstock_435468841.jpg",
      alt:"Es Teh Manis"
  },
  {
    id: 3,
    name: "Ayam Bakar Taliwang",
    src: "https://indonesiakaya.com/wp-content/uploads/2023/04/at_Artboard_4.jpg",
    alt:"Ayam Bakar Taliwang"
  },
  {
    id: 4,
    name: "Jus Alpukat",
    src: "https://www.ninevibe.com/storage/statement-images/OD3rY1bPCixDb8NP2Z8Pi2325o3L47HKSknNyK0I.webp",
    alt:"Jus Alpukat"
  },
  {
    id: 5,
    name: "Ayam Goreng Pejantan",
    src: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/11/25/1409093a-2cfc-4784-a9cc-5eb3f37a19ad.jpg",
    alt:"Ayam Goreng Pejantan"
  },
  {
    id: 6,
    src: "https://down-id.img.susercontent.com/file/id-11134207-7qul6-lj3kkg25khg771",
    alt:"Bebek Goreng"
  },
  {
    id: 7,
    name: "Es Cendol Segar",
    src: "https://www.shutterstock.com/image-photo/es-cendol-dawet-drink-made-600nw-2538351249.jpg",
    alt:"Es Cendol Segar"
  },
   {
    id: 8,
    name: "Nasi Ayam Goreng",
    src: "https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/105/2024/10/31/resep-ayam-goreng-lengkuas-1073487863.jpg",
    alt:"Nasi Ayam Goreng"
  },
   {
    id: 9,
    name:"Ayam Bakar Broiler",
    src: "https://asset.kompas.com/crops/WTuA1Jn_cJEFlr9UgBhA-72n8yI=/3x0:700x465/1200x800/data/photo/2020/12/30/5fec5602f116e.jpg",
    alt:"Ayam Bakar Broiler"
  },
   {
    id: 10,
    name: "Ayam Bakar Madu",
    src: "https://www.hypermart.co.id/wp-content/uploads/elementor/thumbs/41-p5q08igqpoy19f4zhvpgme99ekxgi351gqpgxlozrs.jpg",
    alt:"Ayam Bakar Madu"
  },
 
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
