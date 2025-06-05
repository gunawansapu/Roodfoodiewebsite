import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';

const menuAndalan = [
  {
    id: 1,
    title: 'Nasi Goreng Spesial',
    img: 'https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?w=600',
  },
  {
    id: 3,
    title: 'Ayam Bakar Taliwang',
    img: 'https://indonesiakaya.com/wp-content/uploads/2023/04/at_Artboard_4.jpg',
  },
  {
    id: 5,
    title: 'Bakso Malang',
    img: 'https://i.pinimg.com/736x/a0/df/cf/a0dfcff4e2218364adc12cd4c96c50c2.jpg',
  }
];
function MenuAndalan() {
  const navigate = useNavigate();
}


const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const images = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmFzaSUyMGdvcmVuZ3xlbnwwfHwwfHx8MA%3D%3D",
  "https://roodfoodie.wordpress.com/wp-content/uploads/2018/06/img_14941.jpg"
];

function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div>
      <Slider {...sliderSettings}>
        {images.map((img, index) => (
          <div key={index}>
            <div className="relative w-full h-screen">
              <div
                className="relative top-0 left-0 w-full h-screen bg-cover bg-center"
                style={{
                  backgroundImage: `url(${img})`
                }}
              ></div>

              <div className="absolute inset-0 flex items-center justify-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-center p-8"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 hover:scale-105 transition-transform duration-300">
                    Selamat Datang di <span className="text-red-400">RoodFoodie</span>
                  </h1>
                  <p className="text-lg md:text-xl mb-6">
                    Nikmati masakan rumahan khas nusantara dengan cita rasa otentik!
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/products"
                      className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition"
                    >
                      Lihat Produk Kami
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
       <div className="max-w-6xl mx-auto py-16 px-4 space-y-24">
        {/* Section: Tentang Kami */}
        <motion.div 
  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <motion.div variants={fadeInLeft}>
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Tentang <span className="text-red-500">RoodFoodie</span>
    </h2>
    <p className="text-gray-700 text-lg mb-4 relative pl-8">
      <span className="absolute left-0 top-0 text-3xl text-red-400 font-serif">“</span>
      RoodFoodie adalah tempat di mana <span className="font-semibold text-red-500">cita rasa rumahan</span> hadir dalam setiap masakan.
      Kami menyajikan <span className="font-semibold">resep tradisional</span> dengan bahan segar, berkualitas, dan penuh kasih.
    </p>
    <p className="text-gray-700 text-lg pl-8">
      Kami percaya bahwa makanan bukan hanya soal rasa, tapi juga soal <span className="font-semibold text-red-400">kenyamanan dan kenangan</span>.
      Dengan layanan cepat dan harga terjangkau, kami mendekatkan Anda pada pengalaman makan yang <span className="italic">autentik dan memanjakan lidah</span>.
    </p>
  </motion.div>

  <motion.div
    variants={fadeInRight}
    whileHover={{ scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 100 }}
    className="rounded-lg overflow-hidden shadow-lg"
  >
    <img
      src="https://roodfoodie.files.wordpress.com/2018/06/wa-roodfoodie.png?w=496"
      alt="Food preparation"
      className="w-full object-cover h-100"
    />
  </motion.div>
</motion.div>

        {/* Section: Menu Andalan */}
        <div>
      <h2 className="text-3xl font-bold text-center mb-8">Menu Andalan Kami</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuAndalan.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="group transform transition duration-300 hover:scale-105"
          >
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

        {/* Section: Cara Pesan */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Cara Pesan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Pilih Produk', icon: '🛒' },
              { step: 2, title: 'Checkout & Bayar', icon: '💳' },
              { step: 3, title: 'Diterima di Rumah', icon: '🏡' }
            ].map((item) => (
              <div key={item.step} className="p-6 bg-gray-100 rounded-lg shadow-sm">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">Langkah {item.step}</h3>
                <p className="text-gray-600">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Hubungi Kami */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Punya Pertanyaan?</h2>
          <p className="text-gray-700 mb-6">
            Hubungi kami melalui Whatsapp atau kunjungi lokasi untuk layanan terbaik.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition">
              Chat via WhatsApp
            </a>
            <Link to="/contact" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition">
              Kontak Kami
            </Link>
            </div>
            </div>
            </div>
            <section className="py-12 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
  <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">Lokasi Kami</h3>
  <div className="w-full rounded-lg overflow-hidden shadow-lg">
    <iframe
      title="Lokasi RoodFoodie"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9556.632966008632!2d110.39671997755923!3d-6.977009996081628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4bc1a561f3%3A0x5a409829d2d71c44!2sRoodfoodie!5e0!3m2!1sid!2sid!4v1749098313395!5m2!1sid!2sid"
      className="w-full h-120"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

</section>
    </div>
  );
}
export default Home;
