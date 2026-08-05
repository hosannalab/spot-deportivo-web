import CategoryCatalogPage from "./CategoryCatalogPage";
import { getCategoryRoute } from "../data/categoryRoutes";

function AccesoriosPage() {
  return <CategoryCatalogPage config={getCategoryRoute("accesorios")} />;
}

export default AccesoriosPage;
