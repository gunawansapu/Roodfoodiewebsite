import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "Tips Memasak Nasi Goreng yang Lezat",
    summary:
      "Pelajari cara membuat nasi goreng yang lezat dan mudah dengan bahan-bahan sederhana.",
    slug: "tips-memasak-nasi-goreng",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    url: "https://www.rri.co.id/kuliner/763220/tips-membuat-nasi-goreng-enak-dan-harum",
  },
  {
    id: 2,
    title: "Rahasia Ayam Bakar Madu Ala RoodFoodie",
    summary:
      "Resep rahasia ayam bakar madu yang juicy dan gurih, cocok untuk acara keluarga.",
    slug: "rahasia-ayam-bakar-madu",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    url: "https://cookpad.com/id/resep/24526431-ayam-bakar-madu?ref=search&search_term=ayam+bakar+madu",
  },
  {
    id: 3,
    title: "Mengenal Bumbu Tradisional Indonesia",
    summary:
      "Bahas aneka bumbu tradisional yang sering digunakan dalam masakan nusantara.",
    slug: "mengenal-bumbu-tradisional-indonesia",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    url: "https://www.hypermart.co.id/mengenal-bumbu-dapur-dan-manfaatnya/",
  },
  {
    id: 4,
    title: "Resep Es Cendol Enak Segar",
    summary: "Bahas Resep Enak Es Cendol.",
    slug: "mengenal-resep-es-cendol",
    image:
      "https://www.shutterstock.com/image-photo/es-cendol-dawet-drink-made-600nw-2538351249.jpg",
    url: "https://www.halodoc.com/artikel/3-resep-es-cendol-kekinian-yang-mudah-dibuat-enak-dan-segar",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 100 },
  }),
};

function Blog() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter blog posts berdasarkan searchTerm (case-insensitive)
  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="
        relative
        max-w-5xl mx-auto py-12 px-4 min-h-screen
        bg-gradient-to-b
        from-white via-gray-50 to-gray-100
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        text-gray-900 dark:text-gray-200
      "
    >
      {/* Background Pattern */}
     <svg
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 w-full h-full z-0"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <pattern
      id="blogPattern"
      x="0"
      y="0"
      width="160"
      height="80"
      patternUnits="userSpaceOnUse"
    >
      <text
        x="10"
        y="60"
        fontSize="56"
        fill="rgba(250, 204, 21, 0.3)" // kuning emas transparan
        style={{ userSelect: "none" }}
      >
        📖
      </text>
      <text
        x="60"
        y="60"
        fontSize="56"
        fill="rgba(234, 179, 8, 0.3)"
        style={{ userSelect: "none" }}
      >
        ✒️
      </text>
      <text
        x="110"
        y="60"
        fontSize="56"
        fill="rgba(202, 138, 4, 0.3)"
        style={{ userSelect: "none" }}
      >
        🖋
      </text>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#blogPattern)">
    <animate
      attributeName="opacity"
      values="0.25;0.4;0.25"
      dur="6s"
      repeatCount="indefinite"
    />
  </rect>
</svg>


      <h1 className="relative text-3xl font-bold mb-6 text-center tracking-wide">
        Blog RoodFoodie
      </h1>

     {/* Input Pencarian */}
<div className="relative mb-10 flex justify-center z-10">
  <input
    type="text"
    placeholder="Cari blog berdasarkan judul..."
    className="
      w-full max-w-md px-5 py-3 rounded-lg
      border-2
      border-gray-300
      bg-white text-gray-800
      placeholder-gray-500
      transition-colors duration-300 ease-in-out

      dark:bg-gray-900
      dark:border-cyan-600
      dark:text-cyan-300
      dark:placeholder-cyan-400

      focus:outline-none
      focus:ring-0
      focus:border-yellow-400
      dark:focus:border-cyan-400

      shadow-md
      focus:shadow-[0_0_10px_2px_rgba(255,204,0,0.75)]
      dark:focus:shadow-[0_0_15px_3px_rgba(0,255,255,0.9)]
    "
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


      <ul className="space-y-10 relative z-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, i) => (
            <motion.li
              key={post.id}
              className="
                border rounded-lg p-6 bg-white shadow-md cursor-pointer
                hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 ease-out
                flex flex-col md:flex-row gap-6
                dark:bg-gray-800 dark:border-gray-700
              "
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              {/* Image Thumbnail */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-48 h-32 object-cover rounded-lg shadow-sm flex-shrink-0"
                loading="lazy"
              />

              {/* Content */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {/* Link "Baca Selengkapnya" dengan hover underline */}
                {post.url ? (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative self-start font-semibold text-yellow-600 dark:text-yellow-400"
                  >
                    Baca Selengkapnya &rarr;
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-600 transition-all group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group relative self-start font-semibold text-yellow-600 dark:text-yellow-400"
                  >
                    Baca Selengkapnya &rarr;
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            </motion.li>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Tidak ada artikel yang cocok.
          </p>
        )}
      </ul>
    </div>
  );
}

export default Blog;
