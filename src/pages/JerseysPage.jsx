import CategoryCatalogPage from "./CategoryCatalogPage";
import { getCategoryRoute } from "../data/categoryRoutes";

const config = getCategoryRoute("jerseys");

function JerseysPage() {
  return (
    <CategoryCatalogPage
      config={{
        ...config,
        subtitle:
          "Elige el jersey, luego selecciona version y talla en la pagina del producto.",
      }}
    />
  );
}

export default JerseysPage;
