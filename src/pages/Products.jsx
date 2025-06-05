import { useState } from "react";
import { Link } from "react-router-dom";
import allProducts from "../data/product";

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
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        px-4 py-12 max-w-7xl mx-auto"
    >
      {/* Background pattern */}
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
            patternTransform="translate(0,0)"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(59, 130, 246, 0.1)" // blue-500 10% opacity light mode
              strokeWidth="1"
              className="dark:stroke-[rgba(147,197,253,0.1)]" // blue-300 10% opacity dark mode
            />
            <circle
              cx="10"
              cy="10"
              r="1.5"
              fill="rgba(59, 130, 246, 0.15)"
              className="dark:fill-[rgba(147,197,253,0.15)]"
            />
            <circle
              cx="30"
              cy="30"
              r="1.5"
              fill="rgba(59, 130, 246, 0.15)"
              className="dark:fill-[rgba(147,197,253,0.15)]"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>


      {/* Konten utama */}
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Produk Kami
      </h2>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3
            focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/4
            focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-400"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Produk */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Produk tidak ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(({ id, name, category, price, image }) => (
            <div
              key={id}
              className="border rounded shadow hover:shadow-lg transition overflow-hidden
                bg-white dark:bg-gray-800"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-gray-100">
                  {name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{category}</p>
                <p className="font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Rp {price.toLocaleString()}
                </p>
                <Link to={`/products/${id}`}>
                  <button className="bg-gradient-to-r from-blue-500 via-red-500 to-purple-500
                    text-white px-4 py-2 rounded hover:from-pink-500 hover:via-orange-500 hover:to-yellow-500
                    transition w-full"
                  >
                    Detail Produk
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
