import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import allProducts from "../data/product";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <motion.div
      className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12 dark:bg-gray-900 dark:text-white min-h-screen items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Gambar Produk */}
      <motion.div className="relative rounded-lg overflow-hidden shadow-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-[400px] object-cover"
        />
        <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {product.category}
        </span>
      </motion.div>

      {/* Detail Produk */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>

        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Rp {product.price.toLocaleString()}
        </p>

        <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={decreaseQty}
            className="bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            -
          </button>

          <motion.span
            className="text-xl font-semibold"
            key={quantity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {quantity}
          </motion.span>

          <button
            onClick={increaseQty}
            className="bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            +
          </button>
        </div>

        {/* Total Harga Dengan Animasi */}
        <AnimatePresence mode="wait">
          <motion.p
            key={totalPrice}
            className="text-xl font-bold text-green-600 dark:text-green-400"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Total: Rp {totalPrice.toLocaleString()}
          </motion.p>
        </AnimatePresence>

        {/* Tombol Aksi */}
        <div className="flex gap-4">
          <motion.button
            onClick={handleBuyNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-lime-500 text-white px-6 py-3 rounded-lg shadow-md"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-lg shadow-md"
          >
            Tambahkan ke Wishlist
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;
