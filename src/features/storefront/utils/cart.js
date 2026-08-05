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

    lines.push(`*${index + 1}. ${item.name}*`);
    lines.push(`   • Cantidad: ${qty}`);
    if (item.size) lines.push(`   • Talla: ${item.size}`);
    if (item.variant) lines.push(`   • Versión: ${item.variant}`);

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

export function formatCartItemMeta(item) {
  const parts = [];

  if (item.qty > 1) parts.push(`Cant. ${item.qty}`);
  if (item.size) parts.push(`Talla ${item.size}`);
  if (item.price) parts.push(formatMoney(item.price));

  const code = item.sku || item.code;
  if (code) parts.push(`Ref. ${code}`);

  if (parts.length) return parts.join(" · ");

  return code ? `Ref. ${code} · Consultar precio` : "Consultar precio";
}
