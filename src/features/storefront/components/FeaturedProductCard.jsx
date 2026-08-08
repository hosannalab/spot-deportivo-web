import { formatMoney } from "../utils/cart";
import ProductAddToCartButton from "./ProductAddToCartButton";
import ProductImageSlot from "./ProductImageSlot";

function FeaturedProductCard({
  revealDelay,
  image,
  alt,
  name,
  price,
  badge,
  cartId,
  cartTitle,
  cartName,
  cartCode,
  cartSize,
  cartColor,
  cartSku,
  cartPrice,
  id,
}) {
  return (
    <article
      className="product-card"
      id={id}
      data-tilt
      data-reveal
      data-reveal-delay={revealDelay}
    >
      <div className="product-card__media">
        <ProductImageSlot src={image} alt={alt} />
        {badge && <span className="badge">{badge}</span>}
        <div className="product-card__glow" aria-hidden="true"></div>
      </div>
      <div className="product-card__body">
        <div className="product-card__name">{name}</div>
        <div className="product-card__price">{formatMoney(price)}</div>
        <ProductAddToCartButton
          image={image}
          cartId={cartId}
          cartTitle={cartTitle || cartName}
          cartName={cartName}
          cartPrice={cartPrice ?? String(price)}
          cartCode={cartCode}
          cartSize={cartSize}
          cartColor={cartColor}
          cartSku={cartSku}
        />
      </div>
    </article>
  );
}

export default FeaturedProductCard;
