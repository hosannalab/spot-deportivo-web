import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SiteChrome from "../components/SiteChrome";
import useSitePageBoot from "../app/useSitePageBoot";
import { fetchPublicProductStyle } from "../features/storefront/api/publicProductsApi";
import ProductAddToCartButton from "../features/storefront/components/ProductAddToCartButton";
import ProductImageSlot from "../features/storefront/components/ProductImageSlot";
import { formatMoney } from "../features/storefront/utils/cart";
import {
  buildCartMetaFromSelection,
  formatColorLabel,
  pickDefaultVariant,
} from "../features/storefront/utils/productStyleUtils";
import { getCategoryRouteByPath, categoryRouteList } from "../data/categoryRoutes";

function getCategoryPath(categorySlug) {
  const route = categoryRouteList.find((entry) => entry.slug === categorySlug);
  return route?.path || "/";
}

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(productId);
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
        setSelectedColorId(result.productId);
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
    () => detail?.colors?.find((color) => color.productId === selectedColorId),
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

  function handleColorChange(nextColorId) {
    setSelectedColorId(nextColorId);
    const color = detail?.colors?.find((entry) => entry.productId === nextColorId);
    if (color) {
      navigate(`/producto/${nextColorId}`, { replace: true });
    }
  }

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
              <nav className="breadcrumb product-detail__breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <Link to={categoryPath}>{detail.category}</Link>
                <span aria-hidden="true">/</span>
                <span>{detail.styleTitle}</span>
              </nav>

              <div className="product-detail">
                <div className="product-detail__media">
                  <ProductImageSlot
                    src={selectedVariant?.imageUrl || selectedColor.imageUrl}
                    alt={selectedColor.name}
                  />
                </div>

                <div className="product-detail__info">
                  <p className="product-detail__brand">{detail.brand}</p>
                  <h1 className="product-detail__title">{detail.styleTitle}</h1>
                  <p className="product-detail__selected-name">{selectedColor.name}</p>
                  <p className="product-detail__price">
                    {selectedVariant?.salePrice
                      ? formatMoney(selectedVariant.salePrice)
                      : "Consultar precio"}
                  </p>

                  {detail.colors.length > 1 && (
                    <div className="product-option">
                      <span className="product-option__label">
                        Color: {formatColorLabel(selectedColor.color)}
                      </span>
                      <div className="color-swatches" role="list">
                        {detail.colors.map((color) => (
                          <button
                            key={color.productId}
                            type="button"
                            role="listitem"
                            className={`color-swatch ${color.productId === selectedColorId ? "is-selected" : ""}`}
                            aria-label={formatColorLabel(color.color)}
                            aria-pressed={color.productId === selectedColorId}
                            onClick={() => handleColorChange(color.productId)}
                          >
                            <ProductImageSlot src={color.imageUrl} alt="" />
                            <span>{formatColorLabel(color.color)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="product-option">
                    <span className="product-option__label">Talla</span>
                    <div className="size-chips" role="list">
                      {selectedColor.variants.map((variant) => {
                        const isSelected = variant.id === selectedVariantId;
                        const isDisabled = variant.stock <= 0;

                        return (
                          <button
                            key={variant.id}
                            type="button"
                            role="listitem"
                            className={`size-chip ${isSelected ? "is-selected" : ""} ${isDisabled ? "is-disabled" : ""}`}
                            aria-pressed={isSelected}
                            disabled={isDisabled}
                            onClick={() => setSelectedVariantId(variant.id)}
                          >
                            {variant.size}
                          </button>
                        );
                      })}
                    </div>
                    {selectedVariant && selectedVariant.stock <= 3 && selectedVariant.stock > 0 && (
                      <p className="product-option__note">
                        Quedan {selectedVariant.stock} unidades en esta talla.
                      </p>
                    )}
                    {selectedVariant && selectedVariant.stock <= 0 && (
                      <p className="product-option__note product-option__note--warn">
                        Talla agotada. Elige otra talla o color.
                      </p>
                    )}
                  </div>

                  {cartMeta && selectedVariant?.stock > 0 ? (
                    <ProductAddToCartButton
                      image={cartMeta.image}
                      cartId={cartMeta.id}
                      cartName={cartMeta.name}
                      cartPrice={String(cartMeta.price)}
                      cartCode={cartMeta.code}
                      cartSize={cartMeta.size}
                      cartSku={cartMeta.sku}
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
