import ProductAddToCartButton from "./ProductAddToCartButton";
import ProductImageSlot from "./ProductImageSlot";

function SimpleProductCard({
  revealDelay,
  image,
  alt,
  name,
  codeText,
  cartId,
  cartName,
  cartCode,
  cartSize,
  cartSku,
  cartPrice,
}) {
  return (
    <article
      className="product-card"
      data-tilt
      data-reveal
      data-reveal-delay={revealDelay}
    >
      <div className="product-card__media">
        <ProductImageSlot src={image} alt={alt} />
        <div className="product-card__glow" aria-hidden="true"></div>
      </div>
      <div className="product-card__body">
        <div className="product-card__name">{name}</div>
        <div className="product-card__code">{codeText}</div>
        <ProductAddToCartButton
          image={image}
          cartId={cartId}
          cartName={cartName}
          cartCode={cartCode}
          cartSize={cartSize}
          cartSku={cartSku}
          cartPrice={cartPrice}
        />
      </div>
    </article>
  );
}

export default SimpleProductCard;
