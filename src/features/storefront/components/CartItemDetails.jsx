import { formatMoney } from "../utils/cart";

function CartItemDetails({ item }) {
  const specs = [];

  const color = item.color || item.variant;
  if (color) specs.push({ label: "Color", value: color });
  if (item.size) specs.push({ label: "Talla", value: item.size });

  const code = item.sku || item.code;
  if (code) specs.push({ label: "Código", value: code });

  const lineTotal = item.price ? item.price * (item.qty || 1) : 0;

  return (
    <>
      {specs.length > 0 && (
        <dl className="cart-item__specs">
          {specs.map((spec) => (
            <div className="cart-item__spec" key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="cart-item__price-line">
        {lineTotal > 0 ? (
          <>
            <span>{formatMoney(lineTotal)}</span>
            {item.qty > 1 && (
              <small>{formatMoney(item.price)} c/u</small>
            )}
          </>
        ) : (
          <span className="cart-item__price-line--pending">Precio a confirmar</span>
        )}
      </div>
    </>
  );
}

export default CartItemDetails;
