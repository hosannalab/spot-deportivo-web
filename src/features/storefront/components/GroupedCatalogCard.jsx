import { Link } from "react-router-dom";
import {
  formatStyleAvailabilityHint,
  getPriceLabel,
} from "../utils/productStyleUtils";
import ProductImageSlot from "./ProductImageSlot";

function GroupedCatalogCard({
  revealDelay,
  productId,
  name,
  image,
  brand,
  category,
  minPrice,
  maxPrice,
  colorCount,
  sizeCount,
  hasStock,
}) {
  const metaParts = [category, brand].filter(Boolean);
  const metaText = metaParts.length ? metaParts.join(" · ") : null;

  return (
    <article
      className="product-card product-card--link"
      data-tilt
      data-reveal
      data-reveal-delay={revealDelay}
    >
      <Link className="product-card__link" to={`/producto/${productId}`}>
        <div className="product-card__media">
          <ProductImageSlot src={image} alt={name} />
          <div className="product-card__glow" aria-hidden="true"></div>
        </div>
        <div className="product-card__body">
          <div className="product-card__name">{name}</div>
          {metaText && <div className="product-card__code">{metaText}</div>}
          <div className="product-card__price">
            {getPriceLabel(minPrice, maxPrice)}
          </div>
          <p className="product-card__hint">
            {formatStyleAvailabilityHint({ colorCount, sizeCount, hasStock })}
          </p>
          <span className="btn-dark product-card__cta">Ver producto</span>
        </div>
      </Link>
    </article>
  );
}

export default GroupedCatalogCard;
