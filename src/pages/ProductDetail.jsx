import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import allProducts from "../data/product";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // import framer-motion

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const { addToWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-12 dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold text-red-500 dark:text-red-400">
          Produk tidak ditemukan
        </h2>
      </div>
    );
  }

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const totalPrice = product.price * quantity;

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        products: [{ ...product, quantity }],
      },
    });
  };

  // Variants animasi untuk kontainer utama (fade & slide)
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Animasi gambar produk (zoom in)
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animasi teks & tombol, muncul berurutan
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
      className="max-w-5xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 dark:bg-gray-900 dark:text-white min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Gambar produk dengan efek zoom */}
      <motion.img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded shadow-lg"
        variants={imageVariants}
      />

      {/* Detail produk */}
      <div>
        <motion.h1
          className="text-3xl font-bold mb-2"
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {product.name}
        </motion.h1>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-1"
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {product.category}
        </motion.p>

        <motion.p
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4"
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Rp {product.price.toLocaleString()}
        </motion.p>

        <motion.p
          className="text-gray-700 dark:text-gray-300 mb-6"
          custom={3}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {product.description}
        </motion.p>

        {/* Kontrol quantity dengan animasi tombol */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          custom={4}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={decreaseQty}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded hover:bg-gray-400 transition"
          >
            -
          </motion.button>
          <motion.span
            className="text-xl font-semibold"
            key={quantity} // animasi saat quantity berubah
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {quantity}
          </motion.span>
          <motion.button
            onClick={increaseQty}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded hover:bg-gray-400 transition"
          >
            +
          </motion.button>
        </motion.div>

       <motion.p
  className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6"
  custom={5}
  variants={itemVariants}
  key={totalPrice}
  initial={{ opacity: 0, y: 20, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  Total: Rp {totalPrice.toLocaleString()}
</motion.p>


        {/* Tombol aksi */}
        <motion.div
          className="flex gap-4"
          custom={6}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={handleBuyNow}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34,197,94,0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white px-4 py-2 rounded transition"
          >
            Beli Sekarang
          </motion.button>

          <motion.button
            onClick={() => {
              addToWishlist({ ...product, quantity });
              toast.success(
                `${product.name} berhasil ditambahkan ke wishlist dengan jumlah ${quantity}!`
              );
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(251,191,36,0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 via-orange-400 to-rose-400 text-white px-4 py-2 rounded transition"
          >
            Tambahkan ke Wishlist
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;
