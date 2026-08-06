import { formatMoney } from "./cart";

export function buildStyleTitle(brand, model, category) {
  if (brand && model) return `${brand} ${model}`.trim();
  if (model) return model;
  if (brand) return brand;
  return category || "Producto";
}

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

export function pickDefaultColor(colors = []) {
  return (
    colors.find((color) => getColorAvailability(color).isAvailable) ||
    colors[0] ||
    null
  );
}

export function getColorAvailability(color) {
  const variants = color?.variants || [];
  const availableVariants = variants.filter((variant) => variant.stock > 0);
  const totalStock = variants.reduce((sum, variant) => sum + (variant.stock || 0), 0);

  return {
    isAvailable: availableVariants.length > 0,
    totalStock,
    availableSizes: availableVariants.length,
    totalSizes: variants.length,
  };
}

export function getVariantAvailability(variant) {
  const stock = variant?.stock || 0;

  if (stock <= 0) {
    return {
      isAvailable: false,
      isLowStock: false,
      label: "Agotado",
    };
  }

  if (stock <= 3) {
    return {
      isAvailable: true,
      isLowStock: true,
      label: `Quedan ${stock}`,
    };
  }

  return {
    isAvailable: true,
    isLowStock: false,
    label: "Disponible",
  };
}

export function formatColorAvailabilitySummary(color) {
  const availability = getColorAvailability(color);

  if (!availability.isAvailable) {
    return "Agotado";
  }

  if (availability.availableSizes === availability.totalSizes) {
    return "Disponible";
  }

  return `${availability.availableSizes} de ${availability.totalSizes} tallas disponibles`;
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
  const nameParts = [styleTitle || "Producto"];

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

export function formatStyleAvailabilityHint({ colorCount, sizeCount, hasStock }) {
  const parts = [];

  if (colorCount > 1) {
    parts.push(`${colorCount} colores`);
  } else if (colorCount === 1) {
    parts.push("1 color");
  }

  if (sizeCount > 1) {
    parts.push(`${sizeCount} tallas`);
  } else if (sizeCount === 1) {
    parts.push("1 talla");
  }

  if (!parts.length) {
    return "Ver opciones disponibles";
  }

  return `${parts.join(" · ")}${hasStock ? "" : " · Consultar stock"}`;
}
