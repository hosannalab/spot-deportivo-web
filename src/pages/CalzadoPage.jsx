import CategoryCatalogPage from "./CategoryCatalogPage";
import { getCategoryRoute } from "../data/categoryRoutes";

function CalzadoPage() {
  return <CategoryCatalogPage config={getCategoryRoute("calzado")} />;
}

export default CalzadoPage;
