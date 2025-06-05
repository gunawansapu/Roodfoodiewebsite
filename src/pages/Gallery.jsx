// src/pages/Gallery.jsx
import { useState } from "react";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFzaSUyMGdvcmVuZ3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "Nasi Goreng Spesial",
  },
  {
    id: 2,
    src: "https://www.hypermart.co.id/wp-content/uploads/elementor/thumbs/41-p5q08igqpoy19f4zhvpgme99ekxgi351gqpgxlozrs.jpg",
    alt: "Ayam Bakar Madu",
  },
  {
    id: 3,
    src: "https://healthybelly.s3.amazonaws.com/product/media_1738841131_0.webp",
    alt: "Soto Ayam",
  },
  {
    id: 4,
    src: "https://awsimages.detik.net.id/community/media/visual/2020/10/08/ikan-nila-bakar-pedas-manis-2_169.jpeg?w=620",
    alt: "Ikan Bakar",
  },
  {
    id: 5,
    src: "https://www.astronauts.id/blog/wp-content/uploads/2023/12/Daftar-Kue-Tradisional-Indonesia-Populer-Dari-Berbagai-Daerah.jpg",
    alt: "Kue Tradisional",
  },
  {
    id: 6,
    src: "https://www.shutterstock.com/image-photo/es-cendol-dawet-drink-made-600nw-2538351249.jpg",
    alt: "Es Cendol Segar",
  },
  {
    id: 7,
    src: "https://cdn1-production-images-kly.akamaized.net/OUqqLu3BtXjfJac0EtxLVMETVws=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3128504/original/083078300_1589462572-shutterstock_435468841.jpg",
    alt: "Es Teh Manis",
  },
  {
    id: 8,
    src: "https://indonesiakaya.com/wp-content/uploads/2023/04/at_Artboard_4.jpg",
    alt: "Es Teh Manis",
  },
  {
    id: 9,
    src: "https://www.ninevibe.com/storage/statement-images/OD3rY1bPCixDb8NP2Z8Pi2325o3L47HKSknNyK0I.webp",
    alt: "Es Teh Manis",
  },
  {
    id: 10,
    src: "https://i.pinimg.com/736x/a0/df/cf/a0dfcff4e2218364adc12cd4c96c50c2.jpg",
    alt: "Es Teh Manis",
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
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Galeri Foto</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="cursor-pointer overflow-hidden rounded shadow hover:scale-105 transition-transform"
            onClick={() => openLightbox(img)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </div>
        ))}
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
