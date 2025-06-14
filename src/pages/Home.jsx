import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import '../style/slidercustom.css';
import Lottie from "lottie-react";
import Food from "../assets/food-vlogger.json";
import frozen from "../assets/snowflake.json";
import delivery from "../assets/delivery-boy.json";
import tested from "../assets/successfully-done.json";

const menuAndalan = [
  { id: 1, title: 'Nasi Goreng Spesial', img: 'https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?w=600' },
  { id: 3, title: 'Ayam Bakar Taliwang', img: 'https://indonesiakaya.com/wp-content/uploads/2023/04/at_Artboard_4.jpg' },
  { id: 5, title: 'Bakso Malang', img: 'https://i.pinimg.com/736x/a0/df/cf/a0dfcff4e2218364adc12cd4c96c50c2.jpg' }
];

const fadeIn = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const images = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?w=1600&auto=format&fit=crop&q=80",
  "https://roodfoodie.wordpress.com/wp-content/uploads/2018/06/img_14941.jpg"
];

function Home() {
  const sliderSettings = {
    dots: true, infinite: true, speed: 700, autoplay: true, autoplaySpeed: 4000, slidesToShow: 1, slidesToScroll: 1, arrows: false
  };

  return (
    <div className="min-h-screen w-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-repeat bg-white dark:bg-gray-900 transition-colors duration-500">

      {/* HERO SLIDER */}
      <div className="w-full">
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index}>
              <div className="relative w-full h-screen">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}></div>

                <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg"
                  >
                    Selamat Datang di <span className="text-red-400">RoodFoodie</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
                    className="text-xl md:text-2xl mt-6 mb-8 max-w-3xl"
                  >
                    Nikmati masakan rumahan khas nusantara dengan cita rasa otentik.
                  </motion.p>
                  <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/products" className="bg-gradient-to-r from-red-500 to-yellow-400 px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition">
                      Lihat Menu Kami
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* TENTANG KAMI */}
        <section className="py-24 px-4">
          <motion.div className="grid md:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.8 }}>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Tentang <span className="text-red-500">RoodFoodie</span></h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Berawal dari kecintaan memasak, RoodFoodie didirikan oleh Rudie Siswanto sejak 2017, menghadirkan ayam bakar khas perpaduan cita rasa Jawa Tengah yang manis dan Jawa Timur yang gurih asin.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Menu andalan ini berhasil mengantarkan RoodFoodie meraih Juara Nasional Festival Jajan Bango 2018. Hingga kini, RoodFoodie terus menjaga warisan kuliner nusantara dengan aneka produk ayam ungkep frozen, serundeng, kremes, dan enam varian sambal khas.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 120 }} className="rounded-xl overflow-hidden shadow-lg">
              <img src="https://roodfoodie.files.wordpress.com/2018/06/wa-roodfoodie.png?w=496" alt="Tentang Kami" className="object-cover w-full" />
            </motion.div>
          </motion.div>
        </section>

       {/* KEUNGGULAN */}
        <section className="py-24 px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.8 }}
          >
            Kenapa Pilih RoodFoodie?
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-10 text-center">
            {[
              { lottie: Food, title: 'Rasa Otentik', desc: 'Perpaduan cita rasa Jawa Tengah & Timur.' },
              { lottie: frozen, title: 'Frozen Higienis', desc: 'Tahan 6 bulan, tanpa pengawet.' },
              { lottie: delivery, title: 'Pengiriman Cepat', desc: 'Packing aman, pengiriman kilat.' },
              { lottie: tested, title: 'Sudah Teruji', desc: 'Juara Nasional Jajan Bango 2018.' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="w-32 h-32 mx-auto mb-6">
                  <Lottie animationData={item.lottie} loop={true} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MENU ANDALAN */}
       {/* MENU ANDALAN */}
        <section className="py-24 px-4">
          <motion.div 
            className="text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white">Menu Andalan Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {menuAndalan.map((item, i) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.03 }}
                  initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp} transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <Link to={`/products/${item.id}`} className="group">
                    <div className="rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-900">
                      <div className="h-64 overflow-hidden">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

       {/* PROMO */}
        <section className="py-16 px-4 bg-gradient-to-r from-red-500 to-yellow-400 text-white text-center rounded-xl mx-4 my-10 shadow-lg">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Promo Spesial Bulan Ini!</h2>
            <p className="text-xl mb-6">Dapatkan diskon 20% untuk pembelian Paket Ayam Ungkep + Sambal Komplit</p>
            <Link to="/products" className="bg-white text-red-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">Lihat Promo</Link>
          </motion.div>
        </section>

        {/* TESTIMONI */}
        <section className="py-24 px-4 bg-gray-100 dark:bg-gray-800">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.8 }}
          >
            Testimoni Pelanggan
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: 'Budi', comment: 'Rasanya juara! Sambalnya mantap, ayamnya empuk.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Sari', comment: 'Ayam frozen-nya praktis dan rasanya tetap fresh.', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Andi', comment: 'Pesan online, sampai cepat, packing rapi, recomended!', img: 'https://randomuser.me/api/portraits/men/54.jpg' }
            ].map((testi, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp} transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <img src={testi.img} alt={testi.name} className="mx-auto w-24 h-24 rounded-full mb-4 object-cover" />
                <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-4">"{testi.comment}"</p>
                <h4 className="font-semibold text-gray-800 dark:text-white">{testi.name}</h4>
              </motion.div>
            ))}
          </div>
        </section>
        {/* GOOGLE MAP */}
        <section className="py-24 px-4">
          <h3 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">Lokasi Kami</h3>
          <div className="overflow-hidden rounded-xl shadow-xl border dark:border-gray-700">
            <iframe title="Lokasi RoodFoodie"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9556.632966008632!2d110.39671997755923!3d-6.977009996081628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4bc1a561f3%3A0x5a409829d2d71c44!2sRoodfoodie!5e0!3m2!1sid!2sid!4v1749098313395!5m2!1sid!2sid"
              className="w-full h-[500px]" style={{ border: 0 }} allowFullScreen loading="lazy" />
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
