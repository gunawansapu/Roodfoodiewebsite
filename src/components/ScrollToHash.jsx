// src/components/ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Delay scroll supaya elemen sudah render dulu (bisa sesuaikan waktunya)
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Kalau tidak ada hash, scroll ke atas halaman
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
}

export default ScrollToHash;
