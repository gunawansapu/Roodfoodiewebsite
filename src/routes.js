import Wishlist from "./pages/Wishlist";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";

const routes = [
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  // Kamu bisa tambah route lain di sini
];

export default routes;
