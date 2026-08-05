import CategoryCatalogPage from "./CategoryCatalogPage";
import { getCategoryRoute } from "../data/categoryRoutes";

function MujerPage() {
  return <CategoryCatalogPage config={getCategoryRoute("mujer")} />;
}

export default MujerPage;
