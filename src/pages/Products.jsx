import { useState } from "react";
import { Link } from "react-router-dom";
import allProducts from "../data/product";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import PromoSlider from "../components/PromoSlider"; // sesuaikan path-nya

const categories = ["Semua", "Makanan", "Minuman"];

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      category === "Semua" || product.category === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ParallaxProvider>
      <motion.div
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background grid */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            <pattern
              id="gridPattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
              />
              <circle cx="10" cy="10" r="1.5" fill="rgba(59, 130, 246, 0.15)" />
              <circle cx="30" cy="30" r="1.5" fill="rgba(59, 130, 246, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>

        {/* Judul */}
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Produk Kami
        </motion.h2>

        {/* Tambahkan slider promo di sini */}
<PromoSlider />

       {/* Filter */}
<motion.div
  className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  viewport={{ once: true }}
>
  {/* Search Box with Icon */}
  <div className="
    flex items-center w-full sm:w-1/2
    bg-white dark:bg-gray-700
    border-2 border-fuchsia-500 dark:border-cyan-500
    rounded-full px-4 py-2 shadow-sm
    focus-within:ring-2 focus-within:ring-fuchsia-600 dark:focus-within:ring-cyan-400
    focus-within:shadow-[0_0_15px_3px_rgba(219,39,119,0.7)]
    dark:focus-within:shadow-[0_0_15px_3px_rgba(6,182,212,0.7)]
    transition-all duration-300
  ">
    <svg
      className="
        w-5 h-5
        text-fuchsia-500 dark:text-cyan-400
        drop-shadow-[0_0_8px_rgba(219,39,119,0.9)]
        dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]
        transition-colors duration-300
      "
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
      />
    </svg>
    <input
      type="text"
      placeholder="Cari produk..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-100"
    />
  </div>

  {/* Dropdown Filter */}
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="
      w-full sm:w-1/4
      bg-white dark:bg-gray-700
      text-sm text-gray-800 dark:text-gray-100
      border-2 border-fuchsia-500 dark:border-cyan-500
      rounded-full px-4 py-2 shadow-sm
      focus:outline-none focus:ring-2 focus:ring-fuchsia-600 dark:focus:ring-cyan-400
      focus:shadow-[0_0_15px_3px_rgba(219,39,119,0.7)]
      dark:focus:shadow-[0_0_15px_3px_rgba(6,182,212,0.7)]
      transition-all duration-300
    "
  >
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</motion.div>

        {/* Produk */}
        {filteredProducts.length === 0 ? (
          <motion.p
            className="text-center text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Produk tidak ditemukan.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(({ id, name, category, price, image }, index) => (
  <Parallax key={id} speed={3}>
    <motion.div
      className="border rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 transform transition-all hover:scale-[1.03] hover:shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }} // animasi keluar saat elemen hilang
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: "easeOut",
        type: "spring",
      }}
      viewport={{ once: false, amount: 0.4 }} // bisa trigget ulang jika scroll naik turun
    >
                  <motion.img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-gray-100">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {category}
                    </p>
                    <p className="font-bold text-blue-600 dark:text-blue-400 mb-4">
                      Rp {price.toLocaleString()}
                    </p>
                    <Link to={`/products/${id}`}>
                    <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{
    scale: 0.95,
    boxShadow:
      "0 0 0 4px rgba(139,92,246,0.4), 0 0 0 8px rgba(252,211,77,0.3)",
  }}
  className="bg-gradient-to-r 
             from-yellow-400 via-fuchsia-500 to-indigo-700
             dark:from-indigo-800 dark:via-fuchsia-700 dark:to-yellow-500
             text-white px-4 py-2 rounded w-full shadow-md 
             transition-all duration-300 ease-in-out"
>
  Detail Produk
</motion.button>


                    </Link>
                  </div>
                </motion.div>
              </Parallax>
            ))}
          </div>
        )}
      </motion.div>
    </ParallaxProvider>
  );
}

export default Products;
