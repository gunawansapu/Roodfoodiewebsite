import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  function addToWishlist(product) {
    setWishlist((prev) => {
      const existingProductIndex = prev.findIndex((item) => item.id === product.id);

      if (existingProductIndex >= 0) {
        // Produk sudah ada, update quantity sesuai quantity baru
        const updatedWishlist = [...prev];
        const existingProduct = updatedWishlist[existingProductIndex];
        updatedWishlist[existingProductIndex] = {
          ...existingProduct,
          quantity: (existingProduct.quantity || 1) + (product.quantity || 1),
        };
        return updatedWishlist;
      } else {
        // Produk belum ada, tambahkan dengan quantity dari product
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook supaya gampang pakai contextnya
export function useWishlist() {
  return useContext(WishlistContext);
}
