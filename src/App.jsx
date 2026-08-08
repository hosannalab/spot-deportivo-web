import { Navigate, Route, Routes } from "react-router-dom";
import PageTransition from "./app/PageTransition";
import ScrollToTop from "./app/ScrollToTop";
import HomeNativePage from "./pages/HomeNativePage";
import HombrePage from "./pages/HombrePage";
import MujerPage from "./pages/MujerPage";
import CalzadoPage from "./pages/CalzadoPage";
import AccesoriosPage from "./pages/AccesoriosPage";
import JerseysPage from "./pages/JerseysPage";
import NuevasColeccionesPage from "./pages/NuevasColeccionesPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomeNativePage />} />
          <Route path="/hombre" element={<HombrePage />} />
          <Route path="/mujer" element={<MujerPage />} />
          <Route path="/calzado" element={<CalzadoPage />} />
          <Route path="/accesorios" element={<AccesoriosPage />} />
          <Route path="/jerseys" element={<JerseysPage />} />
          <Route path="/nuevas-colecciones" element={<NuevasColeccionesPage />} />
          <Route path="/producto/:productId" element={<ProductDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
    </>
  );
}

export default App;
