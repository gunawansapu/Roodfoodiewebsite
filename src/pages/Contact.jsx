import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email tidak valid";
    if (!form.message.trim()) newErrors.message = "Pesan wajib diisi";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      toast.success("Pesan berhasil dikirim!");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
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
        {/* Form kontak dengan glassmorphism */}
        <motion.div 
          className="relative z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-8 rounded-xl shadow-lg"
          variants={itemVariants} 
          custom={0}
        >
          <h2 className="text-4xl font-bold mb-8 text-center md:text-left text-gray-900 dark:text-white">Hubungi Kami</h2>

          {submitted && (
            <motion.div
              className="mb-6 p-4 bg-green-100 text-green-800 rounded flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaCheckCircle className="text-green-600" />
              <span>Terima kasih telah menghubungi kami. Pesan Anda sudah kami terima.</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Nama */}
            <motion.div className="mb-5" variants={itemVariants} custom={1}>
              <label htmlFor="name" className="block font-semibold mb-2 dark:text-white">Nama</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap Anda"
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-4 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-red-400 dark:border-gray-600 dark:focus:ring-red-500"
                } transition bg-white/80 dark:bg-gray-800/80`}
              />
              {errors.name && (
                <p className="text-red-600 mt-1 text-sm flex items-center gap-1">
                  <FaExclamationCircle /> {errors.name}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div className="mb-5" variants={itemVariants} custom={2}>
              <label htmlFor="email" className="block font-semibold mb-2 dark:text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contoh: nama@domain.com"
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-4 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-red-400 dark:border-gray-600 dark:focus:ring-red-500"
                } transition bg-white/80 dark:bg-gray-800/80`}
              />
              {errors.email && (
                <p className="text-red-600 mt-1 text-sm flex items-center gap-1">
                  <FaExclamationCircle /> {errors.email}
                </p>
              )}
            </motion.div>

            {/* Pesan */}
            <motion.div className="mb-7" variants={itemVariants} custom={3}>
              <label htmlFor="message" className="block font-semibold mb-2 dark:text-white">Pesan</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                placeholder="Tulis pesan Anda di sini..."
                className={`w-full border rounded px-4 py-3 resize-none focus:outline-none focus:ring-4 ${
                  errors.message
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-red-400 dark:border-gray-600 dark:focus:ring-red-500"
                } transition bg-white/80 dark:bg-gray-800/80`}
              ></textarea>
              {errors.message && (
                <p className="text-red-600 mt-1 text-sm flex items-center gap-1">
                  <FaExclamationCircle /> {errors.message}
                </p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded font-semibold transition duration-300 ease-in-out
              bg-gradient-to-r from-red-500 via-pink-600 to-purple-700
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:from-yellow-400 hover:via-orange-500 hover:to-red-600 hover:scale-105 hover:shadow-lg"}
            `}
              variants={itemVariants}
              custom={4}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(252, 165, 165, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </motion.button>
          </form>
        </motion.div>

        {/* Info kontak */}
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
