import { useMemo, useState } from "react";
import SiteChrome from "../components/SiteChrome";
import useSitePageBoot from "../app/useSitePageBoot";
import CatalogHero from "../features/storefront/components/CatalogHero";
import JerseyVariantCard from "../features/storefront/components/JerseyVariantCard";
import ProductCardSkeleton from "../features/storefront/components/ProductCardSkeleton";
import usePublicProducts from "../features/storefront/hooks/usePublicProducts";
import { getCategoryRoute } from "../data/categoryRoutes";
import { mapGroupedProductToJerseyItem } from "../features/storefront/utils/productMappers";

const config = getCategoryRoute("jerseys");

const VERSION_LABELS = {
  LOCAL: "Local",
  VISIT: "Visitante",
  "City C.": "City Connect",
  BLANCA: "Blanca",
  NEGRA: "Negra",
  NEGRO: "Negro",
  AMARILLA: "Amarilla",
  "SOY AGUILUCHO": "Soy Aguilucho",
};

const TALLA_LABELS = {
  SMALL: "S",
  MEDIUM: "M",
  LARGE: "L",
  XL: "XL",
  XXL: "XXL",
};

const TALLA_ORDER = ["SMALL", "MEDIUM", "LARGE", "XL", "XXL"];

function uniq(values) {
  return values.filter((value, index) => values.indexOf(value) === index);
}

function getVariantState(item, selection) {
  const versions = uniq(item.variants.map((variant) => variant.version));
  const version = versions.includes(selection?.version)
    ? selection.version
    : versions[0];

  const tallas = uniq(
    item.variants
      .filter((variant) => variant.version === version)
      .map((variant) => variant.talla),
  ).sort((a, b) => TALLA_ORDER.indexOf(a) - TALLA_ORDER.indexOf(b));

  const talla = tallas.includes(selection?.talla) ? selection.talla : tallas[0];

  const current =
    item.variants.find(
      (variant) => variant.version === version && variant.talla === talla,
    ) || item.variants[0];

  const label =
    versions.length > 1
      ? ` (${VERSION_LABELS[current.version] || current.version}, ${TALLA_LABELS[current.talla] || current.talla})`
      : ` (${TALLA_LABELS[current.talla] || current.talla})`;

  return {
    versions,
    tallas,
    current,
    cartMeta: {
      id: `jersey-${current.codigo}`,
      name: `${item.baseName}${label}`,
      price: String(current.precio),
      code: current.codigo,
      image: current.imagen,
      size: TALLA_LABELS[current.talla] || current.talla,
      variant:
        versions.length > 1
          ? VERSION_LABELS[current.version] || current.version
          : "",
      sku: current.codigo,
    },
  };
}

function JerseysPage() {
  useSitePageBoot("Jerseys — Catalogo | Spot Deportivo Pro");

  const [selectionMap, setSelectionMap] = useState({});

  const { items, loading, error } = usePublicProducts({
    page: 1,
    pageSize: 100,
    status: "ACTIVE",
    categorySlug: config.slug,
    groupByProduct: true,
    sortBy: "productName",
    sortOrder: "asc",
  });

  const jerseyItems = useMemo(
    () => items.map((product) => mapGroupedProductToJerseyItem(product)),
    [items],
  );

  const variantsByItem = useMemo(() => {
    const next = {};
    jerseyItems.forEach((item) => {
      next[item.baseName] = getVariantState(item, selectionMap[item.baseName]);
    });
    return next;
  }, [jerseyItems, selectionMap]);

  function onVersionChange(baseName, version) {
    setSelectionMap((prev) => ({
      ...prev,
      [baseName]: {
        ...prev[baseName],
        version,
      },
    }));
  }

  function onTallaChange(baseName, talla) {
    setSelectionMap((prev) => ({
      ...prev,
      [baseName]: {
        ...prev[baseName],
        talla,
      },
    }));
  }

  return (
    <SiteChrome activeNav="jerseys">
      <CatalogHero
        crumb={config.crumb}
        title={config.title}
        subtitle={config.subtitle}
      />

      <section className="section section--white">
        <div className="container">
          {error && (
            <div className="catalog-status catalog-status--error" data-reveal>
              No pudimos cargar los jerseys. Intenta de nuevo en unos minutos.
            </div>
          )}

          {!loading && !error && jerseyItems.length === 0 && (
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
                  rel="noopener"
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
              jerseyItems.map((item) => {
                const variant = variantsByItem[item.baseName];
                if (!variant) return null;
                return (
                  <JerseyVariantCard
                    key={item.baseName}
                    item={item}
                    variant={variant}
                    versionLabels={VERSION_LABELS}
                    tallaLabels={TALLA_LABELS}
                    onVersionChange={onVersionChange}
                    onTallaChange={onTallaChange}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}

export default JerseysPage;
