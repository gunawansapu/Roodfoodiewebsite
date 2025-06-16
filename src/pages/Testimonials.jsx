import { useState, useEffect, useRef, useMemo } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const initialTestimonials = [
  {
    id: 1,
    name: "Gunawan",
    message: "Menu variatif dan harganya terjangkau. Recommended!",
    avatar: "https://static.wikia.nocookie.net/b30b9ff3-a9f8-41a4-b620-87990cf3a233/scale-to-width/755",
    rating: 4,
  },
   {
    id: 2,
    name: "Aqil",
    message: "Enak delicious",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/6/61/Kim_Soo-hyun_in_August_2024_-_2.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Andi",
    message: "Makanannya enak banget, rasanya seperti buatan rumah!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Sari",
    message: "Pelayanan cepat dan ramah. Saya jadi pelanggan tetap!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    id: 5,
    name: "Ossa",
    message: "Buruk Sekali",
    avatar: "https://static.promediateknologi.id/crop/0x5:800x598/0x0/webp/photo/p2/222/2024/08/14/3-63818274.jpg",
    rating: 3,
  },
  {
    id: 6,
    name: "Yuwanandra",
    message: "Mahal banget ga enak",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVLfRiuLG0aTLCiXkLjyRKyhjt3FyUwPlNw&s",
    rating: 3,
  },
  {
    id: 7,
    name: "Gerry",
    message: "Ga lagi kesini",
    avatar: "https://cdn.oneesports.id/cdn-data/wp-content/uploads/sites/2/2020/06/MLBB_YuZhongSplashArt.jpg",
    rating: 2,
  },
  {
    id: 8,
    name: "Nadin",
    message: "Muntah saya",
    avatar: "https://awsimages.detik.net.id/community/media/visual/2025/03/05/pp-kucing-ramadhan-1741148757686_43.jpeg?w=600&q=90",
    rating: 2,
  },
  {
    id: 9,
    name: "Pocong",
    message: "Hoekkkkk !!!!!!!!",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6McXZK4gBh0MiT25ew9-XnZxVZnpJUGgHkQ&s",
    rating: 1,
  },
  {
    id: 10,
    name: "Dwiky",
    message: "Makanan sampah",
    avatar: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-71431607/oem_mouse_pad_komputer_-_laptop_karakter_kartun_lucu_full14_cu06d7qp.jpg",
    rating: 1,
  },
];
const presetAvatars = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
];

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
    avatar: presetAvatars[0],
  });
  const [notification, setNotification] = useState("");
  const sliderRef = useRef(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("testimonials"));
      if (Array.isArray(stored) && stored.length > 0) {
        setTestimonials(stored);
      } else {
        setTestimonials(initialTestimonials);
      }
    } catch {
      setTestimonials(initialTestimonials);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    switch (filter) {
      case "positive":
        return testimonials.filter((t) => t.rating >= 4);
      case "negative":
        return testimonials.filter((t) => t.rating <= 3);
      case "all":
        return testimonials;
      default:
        return testimonials.filter((t) => t.rating === Number(filter));
    }
  }, [filter, testimonials]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, message, rating, avatar } = form;

  // Validasi lokal (seperti sebelumnya)
  if (!name.trim() || !message.trim() || !avatar || !rating) return;

  // Siapkan data untuk Formspree (hanya name dan message yang dikirim)
  const formData = new FormData();
  formData.append("name", name);
  formData.append("message", message);

  try {
    const response = await fetch("https://formspree.io/f/mjkrrjqy", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setForm({
        name: "",
        message: "",
        rating: "",
        avatar: "",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengirim testimoni.");
  }


    const newTestimonial = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      rating: Number(rating),
      avatar,
    };

    setTestimonials((prev) => [newTestimonial, ...prev]);
    setForm({ name: "", message: "", rating: 5, avatar: presetAvatars[0] });
    setNotification("Terima kasih! Testimoni kamu berhasil dikirim.");

    setTimeout(() => setNotification(""), 3000);
    setTimeout(() => {
      sliderRef.current?.slickGoTo(0);
    }, 100);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // SLIDER LOGIC: ambil max 2 testimoni baru + testimoni ID tetap (misalnya ID 9, 3, 5)
  const sliderTestimonialIds = [9, 3, 5];
  const defaultSliderTestimonials = testimonials.filter((t) =>
    sliderTestimonialIds.includes(t.id)
  );
  const userTestimonials = testimonials.filter(
    (t) => !sliderTestimonialIds.includes(t.id)
  );
  const sliderTestimonials = [
    ...userTestimonials.slice(0, 2),
    ...defaultSliderTestimonials,
  ].slice(0, 5);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    initialSlide: 0,
  };

  const renderStars = (count) =>
    "★".repeat(count) + "☆".repeat(5 - count);

  return (
   <div className="min-h-screen w-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-repeat bg-white dark:bg-gray-900 transition-colors duration-500">
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Apa Kata Pelanggan Kami
      </motion.h2>
{/* Filter Buttons */}
<div className="flex justify-center gap-2 flex-wrap mb-8">
  {["all", 5, 4, 3, 2, 1, "positive", "negative"].map((item) => (
    <motion.button
      key={item}
      onClick={() => setFilter(item)}
      whileHover={{ 
        boxShadow: "0px 0px 15px rgba(255, 140, 0, 0.8)", 
        transition: { duration: 0.3 } 
      }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden px-5 py-2 text-sm rounded-full font-bold text-white shadow-lg transition-all duration-300 ${
        filter === item
          ? "bg-gradient-to-r from-red-600 to-yellow-400"
          : "bg-gray-700"
      }`}
      style={{ textShadow: "0 0 6px rgba(0,0,0,0.7)" }}
    >
      <span className="relative z-10">
        {item === "all"
          ? "Semua"
          : item === "positive"
          ? "Review Baik"
          : item === "negative"
          ? "Review Buruk"
          : `Bintang ${item}`}
      </span>

      {/* Background api dengan mix-blend-mode supaya gak nutup teks */}
      <span className="absolute inset-0 -z-10 animate-flame bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 opacity-80 blur-[6px] mix-blend-screen" />

      <svg className="absolute inset-0 -z-20 w-full h-full" aria-hidden="true">
        <filter id="flame" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            id="turbulence"
            baseFrequency="0.02 0.05"
            numOctaves="3"
            result="turbulence"
            seed="2"
          />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <animate
            href="#turbulence"
            attributeName="baseFrequency"
            dur="4s"
            values="0.02 0.05;0.03 0.06;0.02 0.05"
            repeatCount="indefinite"
          />
        </filter>
      </svg>
    </motion.button>
  ))}
</div>


      {/* SLIDER */}
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-200">
        Testimoni Pilihan
      </h3>
      <div className="relative">
        <Slider {...settings} ref={sliderRef} key={sliderTestimonials.length}>
          {sliderTestimonials.map(({ id, name, message, avatar, rating }) => (
            <motion.div
              key={id}
              className="px-6 flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={avatar}
                alt={`${name} avatar`}
                className="mx-auto rounded-full w-24 h-24 mb-4 object-cover border-4 border-red-600 shadow"
              />
              <p className="text-yellow-500 mb-2 text-xl text-center">
                {renderStars(rating)}
              </p>
              <p className="text-lg italic mb-2 mx-auto text-center leading-relaxed w-full max-w-xs text-gray-800 dark:text-gray-200">
                "{message}"
              </p>
              <p className="font-semibold text-red-600 text-center dark:text-red-400">
                - {name}
              </p>
            </motion.div>
          ))}
        </Slider>
      </div>

      {/* FILTERED TESTIMONIAL LIST */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
     {filteredTestimonials.map(({ id, name, message, rating, avatar }) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 14,
      mass: 0.8,
    }}
    whileHover={{
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }}
    className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
  >
    <div className="flex items-center gap-4 mb-4">
      <img
        src={avatar}
        alt={name}
        className="w-14 h-14 rounded-full object-cover border-2 border-rose-500 shadow-sm"
      />
      <div>
        <p className="font-semibold text-rose-600 dark:text-rose-400 text-base">{name}</p>
        <p className="text-yellow-500">{renderStars(rating)}</p>
      </div>
    </div>
    <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
      "{message}"
    </p>
  </motion.div>
))}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <div className="mt-16 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          Tulis Testimoni Kamu
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white"
            required
          />
          <textarea
            placeholder="Pesan testimonial..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white"
            required
          />
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Rating:
            </label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white"
              required
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {"★".repeat(r) + "☆".repeat(5 - r)} ({r})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Pilih Avatar:
            </label>
            <div className="flex gap-3 mb-3">
              {presetAvatars.map((url, idx) => (
                <img
                  key={url}
                  src={url}
                  alt={`preset avatar ${idx + 1}`}
                  onClick={() => setForm({ ...form, avatar: url })}
                  className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                    form.avatar === url
                      ? "border-red-600"
                      : "border-gray-300 dark:border-gray-500"
                  }`}
                />
              ))}
            </div>
            <label className="inline-block bg-orange-500 px-4 py-2 rounded cursor-pointer text-white hover:bg-orange-600 transition">
              Upload Foto Avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-6 py-3 rounded shadow transition duration-300 ease-in-out
        hover:from-purple-600 hover:via-red-500 hover:to-red-600 w-full"
          >
            Kirim Testimoni
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Testimonials;