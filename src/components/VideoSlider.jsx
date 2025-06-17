import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // untuk ikon
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from "framer-motion";

const videoFiles = [
  { src: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/Video1.mp4' },
  { src: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/Hampers%20Ingkung%20Ayam%20Pejantan%20-%20Bebek%20Utuh%201%20EkorMakaciii%20canteeq%20dr%20ICHA%20%20%20....%23hampers%20%23hamperssemarang%20...ayambakarsemarang%20%23ayamgorengsemarang%20%23semaranghadiah%20%23semaranghampers%20%23kulinersemarang%20%23semarangkuliner%20%23giftsemarang%20%23is.mp4'},
  { src: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/Harga%2023K%20-%20Box%20Ricebox%20Ayam%20Bakar%201-4%20Ekor%20Terimakasih%20Mas%20Taufik%20PenerbatMenu%20ini%20tersedia%20di%20Outlet%20-%20G...odInfo%20dan%20pemesanan%20WA%200818242222...............%20%23kirimmakanansemarang%20%23makansiangsemarang%20%23semarangpromo%20%23semarangdiskon.mp4'},
  { src: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/KREMESAN%20BOTOL%2012KDilengkapi%20dengan%20Pengaman%20Aluminium%20Foil%20dan%20Segel%20Tutup%20Botol%20.%20SimpleMudah%20DiaturMuda...%20DiMakanMudah%20DihidangkanMudah%20Ditaruh%20Kantong%20Mudah%20Ditaruh%20TasMudah%20Disimpan%20KembaliMudah%20Dikasihkan%20untuk%20Orang%20Tersaya.mp4'},
  { src: 'https://raw.githubusercontent.com/gunawansapu/gunawan/main/video5.mp4'},
  { src: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/_%23roodfoodie%20%23ayambakar%20%23ayambakarroodfoodie%20%23ayambakarsemarang%20%23ayambakarmurahsemarang%20%23ricebowlayambakar...ang%20%23semarangricebowl%20%23ricebowlsemarang%20%23bowlsemarang%20%23semarangbowl%20%23bowlmurahsemarang%20%23makansiangsemarang%20%23makanmurahsema.mp4'},
];

const VideoSlider = () => {
  return (
    <motion.div
      className="my-16 px-4 relative"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-center text-3xl font-bold mb-8 animate-soft-bounce">
        Video Rekomendasi
      </h2>

      {/* Tombol KIRI */}
      <div className="swiper-button-prev animate-soft-bounce absolute top-1/2 -translate-y-1/2 left-2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/30 hover:bg-white/50 text-white hover:text-black backdrop-blur-sm rounded-full flex items-center justify-center transition duration-200">
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </div>

      {/* Tombol KANAN */}
      <div className="swiper-button-next animate-soft-bounce absolute top-1/2 -translate-y-1/2 right-2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/30 hover:bg-white/50 text-white hover:text-black backdrop-blur-sm rounded-full flex items-center justify-center transition duration-200">
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        spaceBetween={30}
        grabCursor={true}
        centeredSlides={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto"
      >
        {videoFiles.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-xl">
              <video
                src={video.src}
                controls
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-center text-lg font-medium">{video.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default VideoSlider;
