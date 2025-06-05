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
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Produk Kami</h2>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-red-500"
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
        <p className="text-center text-gray-500">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(({ id, name, category, price, image }) => (
            <div
              key={id}
              className="border rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{name}</h3>
                <p className="text-sm text-gray-600 mb-2">{category}</p>
                <p className="font-bold text-red-600 mb-4">
                  Rp {price.toLocaleString()}
                </p>
                <Link to={`/products/${id}`}>
                  <button className="bg-gradient-to-r from-blue-500 via-red-500 to-purple-500 text-white px-4 py-2 rounded hover:from-pink-500 hover:via-orange-500 hover:to-yellow-500 transition w-full">
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
