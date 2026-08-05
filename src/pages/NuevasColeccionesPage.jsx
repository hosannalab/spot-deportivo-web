import CategoryCatalogPage from "./CategoryCatalogPage";
import { getCategoryRoute } from "../data/categoryRoutes";

function NuevasColeccionesPage() {
  return <CategoryCatalogPage config={getCategoryRoute("nuevasColecciones")} />;
}

export default NuevasColeccionesPage;
