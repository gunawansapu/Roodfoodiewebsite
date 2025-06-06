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
import { motion } from "framer-motion";  // import framer-motion

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

  // Variants untuk animasi fade & slide
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
    <motion.div
      className="relative max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12
      bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      text-gray-900 dark:text-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background pola SVG */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="subtleContactPattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Amplop halus */}
            <path
              d="M10 20 L40 45 L70 20 L10 20 Z M10 20 L70 20 L40 50 L10 20 Z"
              fill="none"
              stroke="rgba(239, 68, 68, 0.08)"
              strokeWidth="0.8"
            />
            {/* Telepon halus */}
            <circle
              cx="40"
              cy="65"
              r="5"
              stroke="rgba(239, 68, 68, 0.08)"
              strokeWidth="0.8"
              fill="none"
            />
            <line
              x1="37"
              y1="62"
              x2="43"
              y2="68"
              stroke="rgba(239, 68, 68, 0.08)"
              strokeWidth="0.8"
            />
            {/* Chat bubble halus */}
            <rect
              x="20"
              y="10"
              width="40"
              height="20"
              rx="4"
              ry="4"
              stroke="rgba(239, 68, 68, 0.08)"
              strokeWidth="0.8"
              fill="none"
            />
            <polygon points="33,32 40,34 37,28" fill="rgba(239, 68, 68, 0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subtleContactPattern)" />
      </svg>

      {/* Form kontak */}
      <motion.div className="relative z-10" variants={itemVariants} custom={0}>
        <h2 className="text-4xl font-bold mb-8 text-center md:text-left">Hubungi Kami</h2>

        {submitted && (
          <motion.div
            className="mb-6 p-4 bg-green-100 text-green-800 rounded flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle className="text-green-600" />
            <span>
              Terima kasih telah menghubungi kami. Pesan Anda sudah kami terima.
            </span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <motion.div className="mb-5" variants={itemVariants} custom={1}>
            <label htmlFor="name" className="block font-semibold mb-2">
              Nama
            </label>
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
              } transition`}
            />
            {errors.name && (
              <p className="text-red-600 mt-1 text-sm flex items-center gap-1">
                <FaExclamationCircle /> {errors.name}
              </p>
            )}
          </motion.div>

          <motion.div className="mb-5" variants={itemVariants} custom={2}>
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
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
              } transition`}
            />
            {errors.email && (
              <p className="text-red-600 mt-1 text-sm flex items-center gap-1">
                <FaExclamationCircle /> {errors.email}
              </p>
            )}
          </motion.div>

          <motion.div className="mb-7" variants={itemVariants} custom={3}>
            <label htmlFor="message" className="block font-semibold mb-2">
              Pesan
            </label>
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
              } transition`}
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
        className="bg-gray-50 dark:bg-gray-800 p-8 rounded shadow-lg flex flex-col justify-center relative z-10"
        variants={itemVariants}
        custom={5}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
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

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Kami siap membantu Anda kapan saja. Jangan ragu untuk menghubungi kami!
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Contact;
