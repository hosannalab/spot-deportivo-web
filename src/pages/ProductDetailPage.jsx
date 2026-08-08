import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SiteChrome from "../components/SiteChrome";
import useSitePageBoot from "../app/useSitePageBoot";
import { fetchPublicProductStyle } from "../features/storefront/api/publicProductsApi";
import ProductAddToCartButton from "../features/storefront/components/ProductAddToCartButton";
import ProductImageSlot from "../features/storefront/components/ProductImageSlot";
import { formatMoney } from "../features/storefront/utils/cart";
import {
  buildCartMetaFromSelection,
  formatColorAvailabilitySummary,
  formatColorLabel,
  getColorAvailability,
  getVariantAvailability,
  pickDefaultColor,
  pickDefaultVariant,
} from "../features/storefront/utils/productStyleUtils";
import { getCategoryRouteByPath, categoryRouteList } from "../data/categoryRoutes";

function getCategoryPath(categorySlug) {
  const route = categoryRouteList.find((entry) => entry.slug === categorySlug);
  return route?.path || "/";
}

function ProductDetailPage() {
  const { productId } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");

  useSitePageBoot(
    detail?.styleTitle
      ? `${detail.styleTitle} | Spot Deportivo Pro`
      : "Producto | Spot Deportivo Pro",
  );

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchPublicProductStyle(productId);
        if (!active) return;
        setDetail(result);

        const defaultColor = pickDefaultColor(result.colors);
        setSelectedColorId(defaultColor?.colorId || "");
      } catch (err) {
        if (!active) return;
        setDetail(null);
        setError(err instanceof Error ? err.message : "No se pudo cargar el producto");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [productId]);

  const selectedColor = useMemo(
    () => detail?.colors?.find((color) => color.colorId === selectedColorId),
    [detail, selectedColorId],
  );

  const selectedVariant = useMemo(
    () =>
      selectedColor?.variants?.find((variant) => variant.id === selectedVariantId) ||
      null,
    [selectedColor, selectedVariantId],
  );

  useEffect(() => {
    if (!selectedColor) return;
    const fallback = pickDefaultVariant(selectedColor.variants);
    setSelectedVariantId(fallback?.id || "");
  }, [selectedColorId, selectedColor]);

  const selectedColorAvailability = useMemo(
    () => (selectedColor ? getColorAvailability(selectedColor) : null),
    [selectedColor],
  );

  const selectedVariantAvailability = useMemo(
    () => (selectedVariant ? getVariantAvailability(selectedVariant) : null),
    [selectedVariant],
  );

  const cartMeta = buildCartMetaFromSelection({
    styleTitle: detail?.styleTitle,
    color: selectedColor,
    variant: selectedVariant,
  });

  const categoryPath = getCategoryPath(detail?.categorySlug);
  const categoryRoute = getCategoryRouteByPath(categoryPath);

  return (
    <SiteChrome activeNav={categoryRoute?.navKey}>
      <section className="section section--white product-detail-section">
        <div className="container">
          {loading && <p className="catalog-status">Cargando producto...</p>}

          {!loading && error && (
            <div className="empty-catalog">
              <strong>No pudimos cargar este producto</strong>
              {error}
              <div style={{ marginTop: "20px" }}>
                <Link className="btn btn-primary" to="/">
                  Volver al inicio
                </Link>
              </div>
            </div>
          )}

          {!loading && detail && selectedColor && (
            <>
              <nav
                className="breadcrumb product-detail__breadcrumb"
                aria-label="Breadcrumb"
                data-reveal
              >
                <Link to="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <Link to={categoryPath}>{detail.category}</Link>
                <span aria-hidden="true">/</span>
                <span>{detail.styleTitle}</span>
              </nav>

              <div className="product-detail">
                <div className="product-detail__media" data-reveal="scale-in">
                  <ProductImageSlot
                    src={selectedVariant?.imageUrl || selectedColor.imageUrl}
                    alt={detail.styleTitle}
                    fit="contain"
                  />
                </div>

                <div className="product-detail__info" data-reveal="fade-left">
                  <p className="product-detail__brand">
                    {detail.category} · {detail.brand}
                  </p>
                  <h1 className="product-detail__title">{detail.styleTitle}</h1>
                  {detail.model && (
                    <p className="product-detail__model">Modelo: {detail.model}</p>
                  )}
                  <p className="product-detail__price">
                    {selectedVariant?.salePrice
                      ? formatMoney(selectedVariant.salePrice)
                      : "Consultar precio"}
                  </p>

                  <div className="product-option">
                    <span className="product-option__label">
                      Color: {formatColorLabel(selectedColor.color)}
                      {selectedColorAvailability && (
                        <span
                          className={`availability-badge ${
                            selectedColorAvailability.isAvailable
                              ? "availability-badge--ok"
                              : "availability-badge--out"
                          }`}
                        >
                          {formatColorAvailabilitySummary(selectedColor)}
                        </span>
                      )}
                    </span>
                    <div className="color-swatches" role="list">
                      {detail.colors.map((color) => {
                        const availability = getColorAvailability(color);
                        const isSelected = color.colorId === selectedColorId;

                        return (
                          <button
                            key={color.colorId}
                            type="button"
                            role="listitem"
                            className={`color-swatch ${isSelected ? "is-selected" : ""} ${
                              availability.isAvailable ? "" : "is-unavailable"
                            }`}
                            aria-label={`${formatColorLabel(color.color)} · ${formatColorAvailabilitySummary(color)}`}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedColorId(color.colorId)}
                          >
                            <div className="color-swatch__media">
                              <ProductImageSlot src={color.imageUrl} alt="" />
                              {!availability.isAvailable && (
                                <span className="color-swatch__overlay">Agotado</span>
                              )}
                            </div>
                            <span>{formatColorLabel(color.color)}</span>
                            <span
                              className={`color-swatch__meta ${
                                availability.isAvailable
                                  ? "color-swatch__meta--ok"
                                  : "color-swatch__meta--out"
                              }`}
                            >
                              {formatColorAvailabilitySummary(color)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="product-option">
                    <span className="product-option__label">
                      Talla
                      {selectedVariantAvailability && (
                        <span
                          className={`availability-badge ${
                            selectedVariantAvailability.isAvailable
                              ? selectedVariantAvailability.isLowStock
                                ? "availability-badge--low"
                                : "availability-badge--ok"
                              : "availability-badge--out"
                          }`}
                        >
                          {selectedVariantAvailability.label}
                        </span>
                      )}
                    </span>
                    <div className="size-chips" role="list">
                      {selectedColor.variants.map((variant) => {
                        const availability = getVariantAvailability(variant);
                        const isSelected = variant.id === selectedVariantId;

                        return (
                          <button
                            key={variant.id}
                            type="button"
                            role="listitem"
                            className={`size-chip ${isSelected ? "is-selected" : ""} ${
                              availability.isAvailable ? "" : "is-disabled"
                            } ${availability.isLowStock ? "is-low-stock" : ""}`}
                            aria-label={`Talla ${variant.size} · ${availability.label}`}
                            aria-pressed={isSelected}
                            disabled={!availability.isAvailable}
                            onClick={() => setSelectedVariantId(variant.id)}
                          >
                            <span className="size-chip__label">{variant.size}</span>
                            {!availability.isAvailable && (
                              <span className="size-chip__status">Agotado</span>
                            )}
                            {availability.isLowStock && (
                              <span className="size-chip__status size-chip__status--low">
                                {availability.label}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {!selectedColorAvailability?.isAvailable && (
                      <p className="product-option__note product-option__note--warn">
                        Este color no tiene tallas disponibles. Elige otro color.
                      </p>
                    )}
                    {selectedColorAvailability?.isAvailable &&
                      selectedVariantAvailability &&
                      !selectedVariantAvailability.isAvailable && (
                      <p className="product-option__note product-option__note--warn">
                        Talla agotada. Elige otra talla o color disponible.
                      </p>
                    )}
                  </div>

                  {cartMeta && selectedVariant?.stock > 0 ? (
                    <ProductAddToCartButton
                      image={cartMeta.image}
                      cartId={cartMeta.id}
                      cartTitle={cartMeta.title}
                      cartName={cartMeta.name}
                      cartPrice={String(cartMeta.price)}
                      cartCode={cartMeta.code}
                      cartSize={cartMeta.size}
                      cartSku={cartMeta.sku}
                      cartColor={cartMeta.color}
                      cartVariant={cartMeta.variant}
                    />
                  ) : (
                    <button className="btn-dark" type="button" disabled>
                      Selecciona una talla disponible
                    </button>
                  )}

                  <p className="product-detail__help">
                    ¿Necesitas ayuda? Escríbenos por WhatsApp con el código{" "}
                    {selectedVariant?.itemNo || selectedVariant?.sku || selectedColor.reference}.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </SiteChrome>
  );
}

export default ProductDetailPage;
