import { useMemo } from "react";
import SiteChrome from "../components/SiteChrome";
import useSitePageBoot from "../app/useSitePageBoot";
import CatalogHero from "../features/storefront/components/CatalogHero";
import GroupedCatalogCard from "../features/storefront/components/GroupedCatalogCard";
import ProductCardSkeleton from "../features/storefront/components/ProductCardSkeleton";
import usePublicProducts from "../features/storefront/hooks/usePublicProducts";
import { getCategoryRoute } from "../data/categoryRoutes";
import { mapGroupedProductToCatalogItem } from "../features/storefront/utils/productMappers";

const config = getCategoryRoute("jerseys");

function JerseysPage() {
  useSitePageBoot("Jerseys — Catalogo | Spot Deportivo Pro");

  const { items, loading, error } = usePublicProducts({
    page: 1,
    pageSize: 100,
    status: "ACTIVE",
    categorySlug: config.slug,
    groupByProduct: true,
    sortBy: "productName",
    sortOrder: "asc",
  });

  const catalogItems = useMemo(
    () => items.map((item, index) => mapGroupedProductToCatalogItem(item, index)),
    [items],
  );

  return (
    <SiteChrome activeNav="jerseys">
      <CatalogHero
        crumb={config.crumb}
        title={config.title}
        subtitle="Elige el jersey, luego selecciona version y talla en la pagina del producto."
      />

      <section className="section section--white">
        <div className="container">
          {error && (
            <div className="catalog-status catalog-status--error" data-reveal>
              No pudimos cargar los jerseys. Intenta de nuevo en unos minutos.
            </div>
          )}

          {!loading && !error && catalogItems.length === 0 && (
            <div className="empty-catalog" data-reveal>
              <strong>Sin jerseys por ahora</strong>
              Estamos actualizando este catalogo. Escribenos por WhatsApp y te
              ayudamos al momento.
              <div style={{ marginTop: "20px" }}>
                <a
                  className="btn-whatsapp"
                  style={{
                    display: "inline-flex",
                    width: "auto",
                    padding: "13px 26px",
                  }}
                  href="https://wa.me/18097020938"
                  data-whatsapp-product={config.whatsappProduct}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span aria-hidden="true">💬</span> Consultar por WhatsApp
                </a>
              </div>
            </div>
          )}

          <div className="product-grid">
            {loading ? (
              <ProductCardSkeleton count={6} />
            ) : (
              catalogItems.map((product) => (
                <GroupedCatalogCard key={product.productId} {...product} />
              ))
            )}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}

export default JerseysPage;
