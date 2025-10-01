import { Routes, Route, Navigate } from "react-router-dom";
  import Navbar from "./components/Navbar";
  import Home from "./pages/Home";
  import DonutsListPage from "./pages/DonutsListPage";
  import DonutDetailPage from "./pages/DonutDetailPage";
  import CreateDonutPage from "./pages/CreateDonutPage";
  import FavoritesPage from "./pages/FavoritesPage";
  import ContactPage from "./pages/ContactPage";
  export default function App() {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donuts" element={<DonutsListPage />} />
          <Route path="/donuts/:id" element={<DonutDetailPage />} />
          <Route path="/crear" element={<CreateDonutPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
); }