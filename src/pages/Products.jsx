import { useState } from "react";
import { Link } from "react-router-dom";
import allProducts from "../data/product";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import PromoSlider from "../components/PromoSlider";

const categories = ["Semua", "Makanan", "Minuman"];
const discountOptions = ["Semua", "Ya", "Tidak"];

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [discountFilter, setDiscountFilter] = useState("Semua");

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = category === "Semua" || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesDiscount =
      discountFilter === "Semua" ||
      (discountFilter === "Ya" && product.discount > 0) ||
      (discountFilter === "Tidak" && !product.discount);

    return matchesCategory && matchesSearch && matchesDiscount;
  });

  return (
    <ParallaxProvider>
      <motion.div
        className="relative min-h-screen overflow-hidden py-12 bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-repeat bg-white dark:bg-gray-900 transition-colors duration-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Grid SVG */}
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" />
              <circle cx="10" cy="10" r="1.2" fill="rgba(59, 130, 246, 0.12)" />
              <circle cx="40" cy="40" r="1.2" fill="rgba(59, 130, 246, 0.12)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Semua Produk Kami
          </motion.h2>

          <PromoSlider />

          {/* Filter: Search, Kategori, Diskon */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                🔍 Cari Produk
              </label>
              <div className="flex items-center w-full bg-white dark:bg-gray-700 border-2 border-indigo-500 rounded-full px-4 py-2 shadow-lg focus-within:ring-2 focus-within:ring-indigo-600 transition-all duration-300">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-100 ml-2"
                />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                🗂️ Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 border-2 border-indigo-500 rounded-full px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Diskon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                💸 Filter Diskon
              </label>
              <select
                value={discountFilter}
                onChange={(e) => setDiscountFilter(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 border-2 border-pink-500 rounded-full px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all duration-300"
              >
                {discountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "Semua"
                      ? "Semua Harga"
                      : option === "Ya"
                      ? "Diskon"
                      : "Tidak Diskon"}
                  </option>
                ))}
              </select>
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map(({ id, name, category, price, discount, image }, index) => (
                <Parallax key={id} speed={3}>
                  <motion.div
                    className="border rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 transform transition-all hover:scale-[1.03] hover:shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: false }}
                  >
                    <motion.img
                      src={image}
                      alt={name}
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                      whileHover={{ scale: 1.05 }}
                    />

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-gray-100">{name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{category}</p>

                      <div className="min-h-[48px] mb-4">
                        {discount ? (
                          <div>
                            <p className="text-sm line-through text-gray-400">
                              Rp {price.toLocaleString()}
                            </p>
                            <p className="font-bold text-green-500 dark:text-green-400 text-lg">
                              Rp {(price - discount).toLocaleString()}
                            </p>
                          </div>
                        ) : (
                          <div className="pt-[10px]">
                            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                              Rp {price.toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>

                      <Link to={`/products/${id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full w-full shadow-md transition-all duration-300 ease-in-out"
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
        </div>
      </motion.div>
    </ParallaxProvider>
  );
}

export default Products;
