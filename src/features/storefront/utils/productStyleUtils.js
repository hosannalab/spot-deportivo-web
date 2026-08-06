import { formatMoney } from "./cart";

export function getPriceLabel(minPrice, maxPrice) {
  if (!minPrice && !maxPrice) return "Consultar precio";
  if (minPrice === maxPrice) return formatMoney(minPrice);
  return `Desde ${formatMoney(minPrice)}`;
}

export function pickDefaultVariant(variants = []) {
  return (
    variants.find((variant) => variant.stock > 0) ||
    variants[0] ||
    null
  );
}

export function formatColorLabel(color) {
  if (!color) return "Estándar";
  return color
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function buildCartMetaFromSelection({ styleTitle, color, variant }) {
  if (!variant) return null;

  const sizeLabel = variant.size || "";
  const colorLabel = formatColorLabel(color?.color);
  const nameParts = [styleTitle || color?.name || "Producto"];

  if (colorLabel && colorLabel !== "Estándar") {
    nameParts.push(colorLabel);
  }
  if (sizeLabel) {
    nameParts.push(`(${sizeLabel})`);
  }

  return {
    id: variant.id,
    name: nameParts.join(" "),
    price: Number(variant.salePrice) || 0,
    code: variant.itemNo || variant.sku || color?.reference || "",
    image: variant.imageUrl || color?.imageUrl || "",
    size: sizeLabel,
    sku: variant.sku || variant.itemNo || "",
    variant: colorLabel !== "Estándar" ? colorLabel : "",
  };
}
