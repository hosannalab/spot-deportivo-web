import { formatMoney } from "../utils/cart";
import ProductAddToCartButton from "./ProductAddToCartButton";
import ProductImageSlot from "./ProductImageSlot";

function JerseyVariantCard({
  item,
  variant,
  versionLabels,
  tallaLabels,
  onVersionChange,
  onTallaChange,
}) {
  return (
    <article
      className="product-card"
      data-tilt
      data-reveal
      data-base-name={item.baseName}
    >
      <div className="product-card__media">
        <ProductImageSlot src={variant.current.imagen} alt={item.displayName} />
        <div className="product-card__glow" aria-hidden="true"></div>
      </div>
      <div className="product-card__body">
        <div className="product-card__name">{item.displayName}</div>
        <div className="product-card__price" data-variant-price>
          {formatMoney(variant.current.precio)}
        </div>
        <div className="variant-selectors">
          <label
            className="variant-select"
            data-variant-version
            hidden={variant.versions.length <= 1}
          >
            <span>Version</span>
            <select
              value={variant.current.version}
              onChange={(event) => onVersionChange(item.baseName, event.target.value)}
            >
              {variant.versions.map((entry) => (
                <option key={entry} value={entry}>
                  {versionLabels[entry] || entry}
                </option>
              ))}
            </select>
          </label>
          <label className="variant-select" data-variant-talla>
            <span>Talla</span>
            <select
              value={variant.current.talla}
              onChange={(event) => onTallaChange(item.baseName, event.target.value)}
            >
              {variant.tallas.map((entry) => (
                <option key={entry} value={entry}>
                  {tallaLabels[entry] || entry}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ProductAddToCartButton
          image={variant.cartMeta.image}
          cartId={variant.cartMeta.id}
          cartTitle={variant.cartMeta.title || variant.cartMeta.name}
          cartName={variant.cartMeta.name}
          cartPrice={variant.cartMeta.price}
          cartCode={variant.cartMeta.code}
          cartSize={variant.cartMeta.size}
          cartSku={variant.cartMeta.sku}
          cartColor={variant.cartMeta.color || variant.cartMeta.variant}
          cartVariant={variant.cartMeta.variant}
        />
      </div>
    </article>
  );
}

export default JerseyVariantCard;
