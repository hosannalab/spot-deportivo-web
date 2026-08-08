function ProductAddToCartButton({
  image,
  cartId,
  cartTitle,
  cartName,
  cartPrice,
  cartCode,
  cartSize,
  cartSku,
  cartColor,
  cartVariant,
}) {
  const title = cartTitle || cartName;
  const color = cartColor || cartVariant || "";

  return (
    <button
      className="btn-dark"
      type="button"
      data-add-to-cart
      data-id={cartId}
      data-title={title ?? ""}
      data-name={title ?? ""}
      data-price={cartPrice ?? ""}
      data-code={cartCode ?? ""}
      data-image={image ?? ""}
      data-size={cartSize ?? ""}
      data-sku={cartSku ?? ""}
      data-color={color}
      data-variant={color}
    >
      Agregar al carrito
    </button>
  );
}

export default ProductAddToCartButton;
