import CategoryCatalogPage from "./CategoryCatalogPage";
import { getCategoryRoute } from "../data/categoryRoutes";

function HombrePage() {
  return <CategoryCatalogPage config={getCategoryRoute("hombre")} />;
}

export default HombrePage;
