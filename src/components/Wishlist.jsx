import { useWishlist } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedItems([]);
  }, [wishlist]);

  const toggleSelectItem = (product) => {
    setSelectedItems((prev) =>
      prev.find((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const isSelected = (product) =>
    selectedItems.some((item) => item.id === product.id);

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    navigate("/checkout", { state: { products: selectedItems } });
  };

  const totalHarga = selectedItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600">Wishlist kosong</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 pb-32">
      <h2 className="text-3xl font-bold mb-6 text-center">Wishlist Saya</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative border rounded-lg shadow p-4 transition-all duration-200 ${
              isSelected(product)
                ? "border-green-500 ring-2 ring-green-400"
                : "hover:border-gray-300"
            }`}
          >
            {/* Custom Checklist */}
           <motion.div
  onClick={() => toggleSelectItem(product)}
  className={`absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition
    ${
      isSelected(product)
        ? "bg-green-600 border-green-600 text-white"
        : "border-gray-400 bg-white"
    }
  `}
  title="Pilih produk ini"
  initial={false} // jangan animasi on mount ulang
>
  <AnimatePresence>
    {isSelected(product) && (
      <motion.span
        key="checkmark"
        className="text-sm font-bold"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        ✓
      </motion.span>
    )}
  </AnimatePresence>
</motion.div>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-sm text-gray-600 mb-1">
              Qty: {product.quantity || 1}
            </p>
            <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
              Total: Rp {(product.price * (product.quantity || 1)).toLocaleString()}
            </p>
            <div className="flex flex-col gap-2 mt-2">
  <motion.div
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59,130,246,0.7)", opacity: 1 }}
    initial={{ opacity: 0.9 }}
    animate={{ opacity: 1 }}
  >
    <Link to={`/products/${product.id}`}>
      <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white w-full px-4 py-2 rounded shadow-md transition duration-300 ease-in-out hover:from-yellow-400 hover:via-orange-500 hover:to-pink-400">
        Lihat Detail
      </button>
    </Link>
  </motion.div>

  <motion.div
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(220,38,38,0.7)", opacity: 1 }}
    initial={{ opacity: 0.9 }}
    animate={{ opacity: 1 }}
  >
    <button
      onClick={() => removeFromWishlist(product.id)}
      className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white w-full px-4 py-2 rounded shadow transition duration-300 ease-in-out hover:from-purple-600 hover:via-red-500 hover:to-red-600"
    >
      Hapus
    </button>
  </motion.div>
</div>

          </motion.div>
        ))}
      </div>

      {/* Checkout Bar */}
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center border-t dark:border-gray-700 z-50"
          >
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Harga:</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Rp {totalHarga.toLocaleString()}
              </p>
            </div>
            <motion.button
              onClick={handleCheckout}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34,197,94,0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded text-white font-semibold bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 transition"
            >
              Beli Sekarang ({selectedItems.length})
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Wishlist;
