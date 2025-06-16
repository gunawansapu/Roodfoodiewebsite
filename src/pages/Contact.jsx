import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://formspree.io/f/xkgbbkal", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(e.target),
      });

      if (res.ok) {
        toast.success("Pesan berhasil dikirim!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Gagal mengirim pesan. Coba lagi nanti.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat mengirim pesan.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen w-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-repeat bg-white dark:bg-gray-900 transition-colors duration-500 flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Form Kontak */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <motion.div className="mb-5" variants={itemVariants} custom={1}>
            <label htmlFor="name" className="block font-semibold mb-2 dark:text-white">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              required
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-4 border-gray-300 focus:ring-red-400 dark:border-gray-600 dark:focus:ring-red-500 transition bg-white/80 dark:bg-gray-800/80"
            />
          </motion.div>

          {/* Email */}
          <motion.div className="mb-5" variants={itemVariants} custom={2}>
            <label htmlFor="email" className="block font-semibold mb-2 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh: nama@domain.com"
              required
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-4 border-gray-300 focus:ring-red-400 dark:border-gray-600 dark:focus:ring-red-500 transition bg-white/80 dark:bg-gray-800/80"
            />
          </motion.div>

          {/* Pesan */}
          <motion.div className="mb-7" variants={itemVariants} custom={3}>
            <label htmlFor="message" className="block font-semibold mb-2 dark:text-white">
              Pesan
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tulis pesan Anda di sini..."
              required
              className="w-full border rounded px-4 py-3 resize-none focus:outline-none focus:ring-4 border-gray-300 focus:ring-red-400 dark:border-gray-600 dark:focus:ring-red-500 transition bg-white/80 dark:bg-gray-800/80"
            ></textarea>
          </motion.div>

          {/* Tombol Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded font-semibold transition duration-300 ease-in-out bg-gradient-to-r ${
              loading
                ? "from-gray-400 to-gray-600 cursor-not-allowed"
                : "from-red-500 via-pink-600 to-purple-700 hover:from-yellow-400 hover:via-orange-500 hover:to-red-600 hover:scale-105 hover:shadow-lg"
            }`}
            variants={itemVariants}
            custom={4}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </motion.button>
        </form>

        {/* Info Kontak */}
        <motion.div
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-lg flex flex-col justify-center relative z-10"
          variants={itemVariants}
          custom={5}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center md:text-left dark:text-white">
            Informasi Kontak
          </h3>

          <div className="flex items-center mb-5 gap-4">
            <FaMapMarkerAlt className="text-red-600 dark:text-red-400 text-xl" />
            <p>Jl. Contoh Alamat No.123, Semarang, Indonesia</p>
          </div>

          <div className="flex items-center mb-5 gap-4">
            <FaPhoneAlt className="text-red-600 dark:text-red-400 text-xl" />
            <p>+62 812 3456 7890</p>
          </div>

          <div className="flex items-center mb-5 gap-4">
            <FaEnvelope className="text-red-600 dark:text-red-400 text-xl" />
            <p>info@contohwebsite.com</p>
          </div>

          <div className="flex items-center mb-5 gap-4">
            <FaClock className="text-red-600 dark:text-red-400 text-xl" />
            <p>Senin - Jumat, 09:00 - 17:00 WIB</p>
          </div>

          <p className="mt-6 text-sm text-center text-gray-700 dark:text-gray-300">
            Kami siap membantu Anda kapan saja. Jangan ragu untuk menghubungi kami!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Contact;
