import { brandConfig, cartStorageKey } from "../../../data/brandConfig";

export function formatMoney(value) {
  return `RD$ ${value.toLocaleString("es-DO")}`;
}

export function loadCart() {
  try {
    const raw = localStorage.getItem(cartStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  } catch {
    // noop
  }
}

export function computeSubtotal(cart) {
  let total = 0;
  let hasUnknown = false;

  cart.forEach((item) => {
    if (item.price) total += item.price * item.qty;
    else hasUnknown = true;
  });

  return { total, hasUnknown };
}

export function addProductToCart(previousCart, product) {
  const exists = previousCart.some((item) => item.id === product.id);
  if (exists) {
    return previousCart.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
    );
  }
  return [...previousCart, { ...product, qty: 1 }];
}

export function buildWhatsAppOrderMessage(
  cart,
  storeName = brandConfig.name,
) {
  if (!cart.length) return "";

  const lines = [
    `🛒 *Nuevo pedido — ${storeName}*`,
    "",
  ];

  let total = 0;
  let totalQty = 0;
  let hasUnknown = false;

  cart.forEach((item, index) => {
    const qty = item.qty || 1;
    totalQty += qty;
    const unitPrice = Number(item.price) || 0;
    const lineTotal = unitPrice ? unitPrice * qty : 0;

    if (unitPrice) total += lineTotal;
    else hasUnknown = true;

    const title = getCartItemTitle(item);
    const color = getCartItemColor(item);

    lines.push(`*${index + 1}. ${title}*`);
    lines.push(`   • Cantidad: ${qty}`);
    if (color) lines.push(`   • Color: ${color}`);
    if (item.size) lines.push(`   • Talla: ${item.size}`);

    const code = item.sku || item.code;
    if (code) lines.push(`   • Código: ${code}`);

    if (unitPrice) {
      lines.push(`   • Precio unitario: ${formatMoney(unitPrice)}`);
      lines.push(`   • Subtotal línea: ${formatMoney(lineTotal)}`);
    } else {
      lines.push("   • Precio: A confirmar");
    }

    lines.push("");
  });

  lines.push("─────────────────");
  lines.push(`*Total de artículos:* ${totalQty}`);

  if (total > 0) {
    const extra = hasUnknown ? " (+ otros a confirmar)" : "";
    lines.push(`*Subtotal estimado:* ${formatMoney(total)}${extra}`);
  } else {
    lines.push("*Subtotal:* A confirmar por WhatsApp");
  }

  lines.push("");
  lines.push(
    "Hola, quisiera confirmar disponibilidad, forma de pago y entrega. ¡Gracias!",
  );

  return lines.join("\n");
}

export function buildCheckoutHref(
  cart,
  fallbackHref,
  whatsappNumber,
  storeName = brandConfig.name,
) {
  if (!cart.length) return fallbackHref;

  const message = buildWhatsAppOrderMessage(cart, storeName);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppCheckout(cart, whatsappNumber, storeName = brandConfig.name) {
  const href = buildCheckoutHref(cart, "", whatsappNumber, storeName);
  if (!href) return;
  window.open(href, "_blank", "noopener,noreferrer");
}

export function getCartItemTitle(item) {
  return item.title || item.name || "Producto";
}

export function getCartItemColor(item) {
  return item.color || item.variant || "";
}

export function getCartItemSpecs(item) {
  const specs = [];
  const color = getCartItemColor(item);

  if (color) specs.push({ label: "Color", value: color });
  if (item.size) specs.push({ label: "Talla", value: item.size });

  const code = item.sku || item.code;
  if (code) specs.push({ label: "Código", value: code });

  return specs;
}

export function formatCartItemMeta(item) {
  const specs = getCartItemSpecs(item);
  const parts = specs.map((spec) => `${spec.label} ${spec.value}`);

  if (item.price) parts.push(formatMoney(item.price));
  if (item.qty > 1) parts.unshift(`Cant. ${item.qty}`);

  if (parts.length) return parts.join(" · ");

  return item.sku || item.code
    ? `Ref. ${item.sku || item.code} · Consultar precio`
    : "Consultar precio";
}
