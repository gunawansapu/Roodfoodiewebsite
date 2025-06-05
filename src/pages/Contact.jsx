import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import toast from 'react-hot-toast';

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
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email tidak valid";
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
    toast.success("Pesan berhasil dikirim!"); // <-- ini ditambahkan
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    // lanjut ke backend / API jika ada
  } else {
    setErrors(validationErrors);
    setSubmitted(false);
  }
};
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Form kontak */}
      <div>
        <h2 className="text-4xl font-bold mb-8 text-center md:text-left">Hubungi Kami</h2>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            <span>Terima kasih telah menghubungi kami. Pesan Anda sudah kami terima.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
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
                  : "border-gray-300 focus:ring-blue-300"
              } transition`}
            />
            {errors.name && <p className="text-red-600 mt-1 text-sm flex items-center gap-1"><FaExclamationCircle /> {errors.name}</p>}
          </div>

          <div className="mb-5">
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
                  : "border-gray-300 focus:ring-blue-300"
              } transition`}
            />
            {errors.email && <p className="text-red-600 mt-1 text-sm flex items-center gap-1"><FaExclamationCircle /> {errors.email}</p>}
          </div>

          <div className="mb-7">
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
                  : "border-gray-300 focus:ring-blue-300"
              } transition`}
            ></textarea>
            {errors.message && <p className="text-red-600 mt-1 text-sm flex items-center gap-1"><FaExclamationCircle /> {errors.message}</p>}
          </div>

          <button
  type="submit"
  disabled={loading}
  className={`w-full text-white py-3 rounded font-semibold transition duration-300 ease-in-out
    bg-gradient-to-r from-red-500 via-pink-600 to-purple-700
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:from-yellow-400 hover:via-orange-500 hover:to-red-600 hover:scale-105 hover:shadow-lg"}
  `}
>
  {loading ? "Mengirim..." : "Kirim Pesan"}
</button>

        </form>
      </div>

      {/* Info kontak */}
      <div className="bg-gray-50 p-8 rounded shadow-lg flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Informasi Kontak</h3>

        <div className="flex items-center mb-5 gap-4">
          <FaMapMarkerAlt className="text-red-600 text-xl" />
          <p>Jl. Contoh Alamat No.123, Jakarta, Indonesia</p>
        </div>

        <div className="flex items-center mb-5 gap-4">
          <FaPhoneAlt className="text-red-600 text-xl" />
          <p>+62 812 3456 7890</p>
        </div>

        <div className="flex items-center mb-5 gap-4">
          <FaEnvelope className="text-red-600 text-xl" />
          <p>info@contohwebsite.com</p>
        </div>

        <div className="flex items-center mb-5 gap-4">
          <FaClock className="text-red-600 text-xl" />
          <p>Senin - Jumat, 09:00 - 17:00 WIB</p>
        </div>

        <p className="mt-10 text-center text-gray-500 text-sm">
          Kami siap membantu Anda kapan saja di jam operasional.
        </p>
      </div>
    </div>
  );
}

export default Contact;
