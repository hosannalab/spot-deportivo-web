import { Navigate, Route, Routes } from "react-router-dom";
import HomeNativePage from "./pages/HomeNativePage";
import HombrePage from "./pages/HombrePage";
import MujerPage from "./pages/MujerPage";
import CalzadoPage from "./pages/CalzadoPage";
import AccesoriosPage from "./pages/AccesoriosPage";
import JerseysPage from "./pages/JerseysPage";
import NuevasColeccionesPage from "./pages/NuevasColeccionesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeNativePage />} />
      <Route path="/hombre" element={<HombrePage />} />
      <Route path="/mujer" element={<MujerPage />} />
      <Route path="/calzado" element={<CalzadoPage />} />
      <Route path="/accesorios" element={<AccesoriosPage />} />
      <Route path="/jerseys" element={<JerseysPage />} />
      <Route path="/nuevas-colecciones" element={<NuevasColeccionesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
