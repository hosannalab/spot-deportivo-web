function ProductAddToCartButton({
  image,
  cartId,
  cartName,
  cartPrice,
  cartCode,
  cartSize,
  cartSku,
  cartVariant,
}) {
  return (
    <button
      className="btn-dark"
      type="button"
      data-add-to-cart
      data-id={cartId}
      data-name={cartName}
      data-price={cartPrice ?? ""}
      data-code={cartCode ?? ""}
      data-image={image ?? ""}
      data-size={cartSize ?? ""}
      data-sku={cartSku ?? ""}
      data-variant={cartVariant ?? ""}
    >
      Agregar al carrito
    </button>
  );
}

export default ProductAddToCartButton;
