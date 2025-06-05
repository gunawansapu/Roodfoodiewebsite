import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import allProducts from "../data/product";
import toast from "react-hot-toast";

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
    <div className="max-w-5xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 dark:bg-gray-900 dark:text-white min-h-screen">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded"
      />
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-1">{product.category}</p>
        <p className=" text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Rp {product.price.toLocaleString()}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={decreaseQty}
            className="bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded hover:bg-gray-400 transition"
          >
            -
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button
            onClick={increaseQty}
            className="bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded hover:bg-gray-400 transition"
          >
            +
          </button>
        </div>

        <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Total: Rp {totalPrice.toLocaleString()}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleBuyNow}
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white px-4 py-2 rounded hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 transition"
          >
            Beli Sekarang
          </button>

          <button
            className="bg-gradient-to-r from-yellow-400 via-orange-400 to-rose-400 text-white px-4 py-2 rounded hover:from-yellow-500 hover:via-orange-500 hover:to-rose-500 transition"
            onClick={() => {
              addToWishlist({ ...product, quantity });
              toast.success(
                `${product.name} berhasil ditambahkan ke wishlist dengan jumlah ${quantity}!`
              );
            }}
          >
            Tambahkan ke Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
