import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = location.state?.products || [];
  const [loading, setLoading] = useState(false);
  const { removeFromWishlist } = useWishlist();

  // Hitung total harga dengan quantity
  const totalHarga = products.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600">Tidak ada produk untuk dibeli.</h2>
      </div>
    );
  }

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("🎉 Pembayaran berhasil! Terima kasih telah berbelanja.", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        products.forEach((product) => removeFromWishlist(product.id));
        navigate("/wishlist");
      }, 3100);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4 text-center"
      >
        Pembayaran
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 mb-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className="border p-4 rounded shadow flex gap-4"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-gray-700">
                  Qty: <span className="font-semibold">{product.quantity || 1}</span>
                </p>
              </div>
              <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                Rp {(product.price * (product.quantity || 1)).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="border p-4 rounded shadow mb-6"
      >
        <h4 className="font-semibold text-lg mb-2">Pilih Metode Pembayaran:</h4>
        <ul className="mb-4">
          <li>✅ QRIS (Scan QR di bawah)</li>
          <li>✅ Transfer Bank: BCA 1234567890 a.n. ResQMeal</li>
        </ul>
        <img
          src="https://qris.interactive.co.id/homepage/images/assets/pay/harga/csan-qr-a.jpg"
          alt="QRIS"
          className="w-40 mx-auto mb-4"
        />
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400 text-center mb-4">
          Total: Rp {totalHarga.toLocaleString()}
        </p>
        <motion.button
          onClick={handleConfirmPayment}
          disabled={loading}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(34 197 94 / 0.7)" }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-3 rounded w-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white transition-colors duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:via-emerald-600 hover:to-lime-600"
          }`}
        >
          {loading ? "Memproses..." : "Konfirmasi Pembayaran"}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Checkout;
