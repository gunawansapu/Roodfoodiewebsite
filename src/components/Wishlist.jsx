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

  const totalHarga = selectedItems.reduce((total, item) => {
    const hargaSatuan = item.price - (item.discount || 0);
    return total + hargaSatuan * (item.quantity || 1);
  }, 0);

  const totalDiskon = selectedItems.reduce((total, item) => {
    const diskon = item.discount || 0;
    return total + diskon * (item.quantity || 1);
  }, 0);

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-repeat text-gray-900 dark:text-white px-4">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <div className="text-8xl mb-4">🛒</div>
        </motion.div>
        <h2 className="text-3xl font-semibold mb-2">Wishlist Kosong</h2>
        <p className="mb-6 text-gray-600 dark:text-white">Ayo tambahkan produk favoritmu!</p>
        <Link to="/products">
          <button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg transition hover:scale-105 hover:brightness-110">
            Mulai Belanja
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-gradient-to-br from-[#f1f5f9] via-[#e2e8f0] to-[#f1f5f9] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] py-12 px-4 pb-32 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white transition-colors duration-300">
        Wishlist Saya
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative border rounded-lg shadow p-4 transition-all duration-200 bg-white dark:bg-slate-800 ${
              isSelected(product)
                ? "border-green-500 ring-2 ring-green-400"
                : "hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            <motion.div
              onClick={() => toggleSelectItem(product)}
              className={`absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition ${
                isSelected(product)
                  ? "bg-green-600 border-green-600 text-white"
                  : "border-gray-400 bg-white"
              }`}
              title="Pilih produk ini"
              initial={false}
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

            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{product.category}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Qty: {product.quantity || 1}</p>

            {product.discount ? (
              <div className="mb-2">
                <p className="line-through text-gray-400 text-sm">
                  Rp {(product.price * (product.quantity || 1)).toLocaleString()}
                </p>
                <p className="font-bold text-green-500 dark:text-green-500">
                  Rp {((product.price - product.discount) * (product.quantity || 1)).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
                Rp {(product.price * (product.quantity || 1)).toLocaleString()}
              </p>
            )}

            <div className="flex flex-col gap-2 mt-2">
              <Link to={`/products/${product.id}`}>
                <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white w-full px-4 py-2 rounded shadow-md transition duration-300 hover:scale-105">
                  Lihat Detail
                </button>
              </Link>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white w-full px-4 py-2 rounded shadow transition duration-300 hover:scale-105"
              >
                Hapus
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center border-t dark:border-gray-700 z-50 transition-colors duration-300"
          >
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Harga:</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">Rp {totalHarga.toLocaleString()}</p>
              {totalDiskon > 0 && (
                <p className="text-sm text-red-500 dark:text-red-400">Diskon: - Rp {totalDiskon.toLocaleString()}</p>
              )}
            </div>

            <motion.button
              onClick={handleCheckout}
              whileHover={{ scale: 1.05 }}
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
