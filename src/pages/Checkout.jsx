import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";


// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const desaData = {
  Pegandon: [
    { id: 1, name: "Pegandon" },
    { id: 2, name: "Tegorejo" },
    { id: 3, name: "Ngampel" },
    { id: 4, name: "Gemuh" },
    { id: 5, name: "Dawungsari" },
    { id: 6, name: "Gubugsari" },
    { id: 7, name: "Karangmulyo" },
    { id: 8, name: "Margomulyo" },
    { id: 9, name: "Pekuncen" },
    { id: 10, name: "Penanggulan" },
    { id: 11, name: "Pesawahan" },
    { id: 12, name: "Pucangrejo" },
    { id: 13, name: "Puguh" },
    { id: 14, name: "Wonosari" }
  ],
  Kaliwungu: [
    { id: 1, name: "Karangtengah" },
    { id: 2, name: "Krajankulon" },
    { id: 3, name: "Kumpulrejo" },
    { id: 4, name: "Kutoharjo" },
    { id: 5, name: "Mororejo" },
    { id: 6, name: "Nolokerto" },
    { id: 7, name: "Sarirejo" },
    { id: 8, name: "Sumberejo" },
    { id: 9, name: "Wonorejo" },
  ],
  KaliwunguSelatan: [
    { id: 1, name: "Gempolsewu" },
    { id: 2, name: "Sendangrejo" },
    { id: 3, name: "Pandak" },
  ],
  Brangsong: [
    { id: 1, name: "Brangsong" },
    { id: 2, name: "Tegalrejo" },
    { id: 3, name: "Kaliabu" },
  ],
  Boja: [
    { id: 1, name: "Candimulyo" },
    { id: 2, name: "Kaligondang" },
    { id: 3, name: "Boja" },
  ],
  Cepiring: [
    { id: 1, name: "Guntur" },
    { id: 2, name: "Cepiring" },
    { id: 3, name: "Ngampel" },
  ],
  Gemuh: [
    { id: 1, name: "Gemuh" },
    { id: 2, name: "Klampok" },
    { id: 3, name: "Tegalrejo" },
  ],
  Kangkung: [
    { id: 1, name: "Kangkung" },
    { id: 2, name: "Kriyan" },
  ],
  Kendal: [
    { id: 1, name: "Surodadi" },
    { id: 2, name: "Mangkang" },
  ],
  Limbangan: [
    { id: 1, name: "Limbangan" },
    { id: 2, name: "Banjarsari" },
  ],
  Patebon: [
    { id: 1, name: "Patebon" },
    { id: 2, name: "Kedungsari" },
  ],
  Plantungan: [
    { id: 1, name: "Plantungan" },
    { id: 2, name: "Karanganyar" },
  ],
  Weleri: [
    { id: 1, name: "Weleri" },
    { id: 2, name: "Kedungjati" },
  ],
  Rowosari: [
    { id: 1, name: "Rowosari" },
    { id: 2, name: "Pucung" },
  ],

  // Semarang
  Gunungpati: [
    { id: 1, name: "Gunungpati" },
    { id: 2, name: "Kedungmundu" },
  ],
  Banyumanik: [
    { id: 1, name: "Banyumanik" },
    { id: 2, name: "Jatingaleh" },
  ],
  Candisari: [
    { id: 1, name: "Candisari" },
  ],
  Tembalang: [
    { id: 1, name: "Tembalang" },
  ],
  Genuk: [
    { id: 1, name: "Genuk" },
  ],
  Gayamsari: [
    { id: 1, name: "Gayamsari" },
  ],
  Pedurungan: [
    { id: 1, name: "Pedurungan" },
  ],
  SemarangSelatan: [
    { id: 1, name: "Semarang Selatan" },
  ],
  SemarangTimur: [
    { id: 1, name: "Semarang Timur" },
  ],
  SemarangUtara: [
    { id: 1, name: "Semarang Utara" },
  ],
  SemarangBarat: [
    { id: 1, name: "Semarang Barat" },
  ],
  SemarangTengah: [
    { id: 1, name: "Semarang Tengah" },
  ],
  UngaranBarat: [
    { id: 1, name: "Ungaran Barat" },
  ],
  UngaranTimur: [
    { id: 1, name: "Ungaran Timur" },
  ],

  // Demak
  Bonang: [
    { id: 1, name: "Bonang" },
    { id: 2, name: "Tlogowungu" },
  ],
  Demak: [
    { id: 1, name: "Demak" },
    { id: 2, name: "Kalipucang" },
  ],
  Dempet: [
    { id: 1, name: "Dempet" },
    { id: 2, name: "Bancarkendal" },
  ],
  Gajah: [
    { id: 1, name: "Gajah" },
  ],
  Karanganyar: [
    { id: 1, name: "Karanganyar" },
  ],
  Kebonagung: [
    { id: 1, name: "Kebonagung" },
  ],
  Mijen: [
    { id: 1, name: "Mijen" },
  ],
  Mranggen: [
    { id: 1, name: "Mranggen" },
  ],
  Wonosalam: [
    { id: 1, name: "Wonosalam" },
  ],

  // Kudus
  Jati: [
    { id: 1, name: "Jati" },
  ],
  KaliwunguKudus: [
    { id: 1, name: "Kaliwungu" },
  ],
  KudusKota: [
    { id: 1, name: "Kudus Kota" },
  ],
  Mejobo: [
    { id: 1, name: "Mejobo" },
  ],
  Undaan: [
    { id: 1, name: "Undaan" },
  ],
};


const kecamatanData = {
  Kendal: [
    "Pegandon", "Kaliwungu", "Kaliwungu Selatan", "Brangsong", "Boja", 
    "Cepiring", "Gemuh", "Kangkung", "Kendal", "Limbangan", "Patebon",
    "Plantungan", "Weleri", "Rowosari"
  ],
  Semarang: [
    "Gunungpati", "Banyumanik", "Candisari", "Tembalang", "Genuk", 
    "Gayamsari", "Pedurungan", "Semarang Selatan", "Semarang Timur", 
    "Semarang Utara", "Semarang Barat", "Semarang Tengah", "Ungaran Barat", "Ungaran Timur"
  ],
  Demak: [
    "Bonang", "Demak", "Dempet", "Gajah", "Karanganyar",
    "Kebonagung", "Mijen", "Mranggen", "Wonosalam"
  ],
  Kudus: [
    "Jati", "Kaliwungu", "Kudus Kota", "Mejobo", "Undaan"
  ],
};

const kabupatenData = {
  // Kabupaten Kendal
  Pegandon: "Kendal",
  Kaliwungu: "Kendal",
  KaliwunguSelatan: "Kendal",
  Patebon: "Kendal",
  Brangsong: "Kendal",
  Boja: "Kendal",
  Cepiring: "Kendal",
  Gemuh: "Kendal",
  Kangkung: "Kendal",
  Kendal: "Kendal",
  Limbangan: "Kendal",
  Plantungan: "Kendal",
  Weleri: "Kendal",
  Rowosari: "Kendal",

  // Kota/Kabupaten Semarang
  Gunungpati: "Semarang",
  Banyumanik: "Semarang",
  Candisari: "Semarang",
  Tembalang: "Semarang",
  Genuk: "Semarang",
  Gayamsari: "Semarang",
  Pedurungan: "Semarang",
  SemarangSelatan: "Semarang",
  SemarangTimur: "Semarang",
  SemarangUtara: "Semarang",
  SemarangBarat: "Semarang",
  SemarangTengah: "Semarang",
  UngaranBarat: "Semarang",
  UngaranTimur: "Semarang",

  // Kabupaten Demak
  Bonang: "Demak",
  Demak: "Demak",
  Dempet: "Demak",
  Gajah: "Demak",
  Karanganyar: "Demak",
  Kebonagung: "Demak",
  Mijen: "Demak",
  Mranggen: "Demak",
  Wonosalam: "Demak",

  // Kabupaten Kudus
  Jati: "Kudus",
  KaliwunguKudus: "Kudus",
  KudusKota: "Kudus",
  Mejobo: "Kudus",
  Undaan: "Kudus"
};


function LocationPicker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
        .then((res) => res.json())
        .then((data) => {
          const {
            road,
            suburb,
            city,
            state,
            postcode,
            country,
            village,
            town,
            municipality,
            county,
          } = data.address;

          const dusun = village || town || municipality || "";
          // county biasanya untuk district/kecamatan di OpenStreetMap
          const district = county || suburb || "";
          // cari kabupaten sesuai district (kecamatan)
          const kabupaten =
            kabupatenData[district] || state || city || "";

          onLocationSelect({
            street: road || "",
            rt: "",
            rw: "",
            dusun: dusun,
            desa: suburb || "",
            district: district,
            city: kabupaten,
            province: state || "",
            postalCode: postcode || "",
            country: country || "",
            lat,
            lng,
          });
        })
        .catch(() => toast.error("Gagal mendapatkan alamat dari peta"));
    },
  });
  return null;
}
function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = location.state?.products || [];
  const { removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState(null);

  const [address, setAddress] = useState({
    street: "",
    rt: "",
    rw: "",
    dusun: "",
    desa: "",
    district: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    lat: null,
    lng: null,
  });

  const [mapCenter, setMapCenter] = useState([-6.9, 110.0]);
  const kabupatenList = Object.keys(kecamatanData);
  const kecamatanList = address.city && kecamatanData[address.city] ? kecamatanData[address.city] : [];
  const desaList = address.district && desaData[address.district] ? desaData[address.district] : [];

  useEffect(() => {
    toast.info("📍 Silakan isi alamat pengiriman secara manual atau pilih dari peta", {
      autoClose: 4000,
      position: "top-center",
      toastId: "alamat-toast",
    });
  }, []);

  const totalHarga = products.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleLocationSelect = (loc) => {
    setAddress(loc);
    setMapCenter([loc.lat, loc.lng]);
  };

  const handleConfirmPayment = async () => {
    if (!address.city || !address.province || !address.postalCode) {
      toast.warn("Mohon lengkapi alamat pengiriman terlebih dahulu!");
      return;
    }

    if (!proof) {
      toast.warn("Mohon upload bukti pembayaran terlebih dahulu!");
      return;
    }

    setLoading(true);

    const payload = {
      produk: products.map(p => `${p.name} (${p.quantity || 1})`).join(", "),
      total: totalHarga,
      bukti_bayar: proof, // sudah base64
      rt: address.rt,
      rw: address.rw,
      dusun: address.dusun,
      desa: address.desa,
      kecamatan: address.district,
      alamat_kota: address.city,
      alamat_provinsi: address.province,
      kode_pos: address.postalCode,
      alamat_negara: address.country || "Indonesia",
      lat: address.lat,
      lng: address.lng,
      created_at: new Date().toISOString(),
    };

    try {
      await fetch("https://685015d3e7c42cfd17975480.mockapi.io/buktibayar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      toast.success("🎉 Pembayaran berhasil dan bukti dikirim!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        products.forEach((product) => removeFromWishlist(product.id));
        navigate("/wishlist");
      }, 3100);
    } catch (error) {
      toast.error("❌ Gagal mengirim bukti bayar. Coba lagi.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4 text-center"
      >
        Checkout
      </motion.h2>

      <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded text-yellow-800">
        <strong>Catatan Pengiriman:</strong> Pengiriman hanya tersedia untuk wilayah Semarang, Kendal, Demak, dan Kudus.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Form Alamat */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">📄 Isi Alamat Manual:</h3>
          <div className="flex gap-2">
            <input className="w-1/3 p-2 border rounded" placeholder="RT" value={address.rt} onChange={(e) => setAddress({ ...address, rt: e.target.value })} />
            <input className="w-1/3 p-2 border rounded" placeholder="RW" value={address.rw} onChange={(e) => setAddress({ ...address, rw: e.target.value })} />
            <input className="w-1/3 p-2 border rounded" placeholder="Dusun / Dukuh" value={address.dusun} onChange={(e) => setAddress({ ...address, dusun: e.target.value })} />
          </div>

          <select className="w-full p-2 border rounded" value={address.city} onChange={(e) => {
            const kab = e.target.value;
            setAddress({ ...address, city: kab, district: "", desa: "", province: "" });
          }}>
            <option value="">Pilih Kabupaten/Kota</option>
            {kabupatenList.map((kab) => <option key={kab} value={kab}>{kab}</option>)}
          </select>

          <select className="w-full p-2 border rounded" value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value, desa: "" })} disabled={!address.city}>
            <option value="">Pilih Kecamatan</option>
            {kecamatanList.map((kec) => <option key={kec} value={kec}>{kec}</option>)}
          </select>

          <select className="w-full p-2 border rounded" value={address.desa} onChange={(e) => setAddress({ ...address, desa: e.target.value })} disabled={!address.district}>
            <option value="">Pilih Desa</option>
            {desaList.map((desa) => <option key={desa.id} value={desa.name}>{desa.name}</option>)}
          </select>

          <input className="w-full p-2 border rounded" placeholder="Provinsi" value={address.province} onChange={(e) => setAddress({ ...address, province: e.target.value })} />
          <input className="w-full p-2 border rounded" placeholder="Kode Pos" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
        </div>

        {/* Peta */}
        <div>
          <h3 className="font-semibold text-lg mb-2">🗺️ Pilih Lokasi dari Peta:</h3>
          <MapContainer center={mapCenter} zoom={13} style={{ height: "300px", width: "100%", zIndex: 10 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker onLocationSelect={handleLocationSelect} />
            {address.lat && address.lng && <Marker position={[address.lat, address.lng]} icon={markerIcon} />}
          </MapContainer>
        </div>
      </div>

      {/* Produk */}
      <div className="grid gap-4 mb-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow flex gap-4">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded" />
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p>Qty: <strong>{product.quantity || 1}</strong></p>
              </div>
              <p className="font-bold text-blue-600 text-lg">
                Rp {(product.price * (product.quantity || 1)).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Metode Pembayaran & Upload */}
      <div className="border p-4 rounded shadow mb-6">
        <h4 className="font-semibold text-lg mb-2">Pilih Metode Pembayaran:</h4>
        <ul className="mb-4">
          <li>✅ QRIS (Scan QR di bawah)</li>
          <li>✅ Transfer Bank: BCA 1234567890 a.n. ResQMeal</li>
        </ul>
        <img src="https://qris.interactive.co.id/homepage/images/assets/pay/harga/csan-qr-a.jpg" alt="QRIS" className="w-40 mx-auto mb-4" />

        <div className="mb-4">
          <label className="block font-medium mb-2">Upload Bukti Bayar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProof(reader.result); // simpan sebagai base64
                };
                reader.readAsDataURL(file);
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        <p className="text-xl font-bold text-blue-600 text-center mb-4">
          Total: Rp {totalHarga.toLocaleString()}
        </p>

        <motion.button
          onClick={handleConfirmPayment}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-3 rounded w-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-lime-600"
          }`}
        >
          {loading ? "Memproses..." : "Konfirmasi Pembayaran"}
        </motion.button>
      </div>
    </div>
  );
}

export default Checkout;