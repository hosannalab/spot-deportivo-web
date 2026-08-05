export function mapVariantToSimpleProduct(item, index = 0) {
  const codeParts = [];
  if (item.reference) codeParts.push(`Ref. ${item.reference}`);
  if (item.model) codeParts.push(item.model);
  if (item.size) codeParts.push(item.size);

  return {
    revealDelay: (index % 6) + 1,
    image: item.imageUrl || "",
    alt: `${item.name}${item.reference ? `, ref. ${item.reference}` : ""}`,
    name: item.name,
    codeText: codeParts.join(" · ") || "Ref. N/D",
    cartId: item.id,
    cartName: `${item.name}${item.size ? ` (${item.size})` : ""}`,
    cartCode: item.reference || item.sku || item.itemNo || "",
    cartSize: item.size || "",
    cartSku: item.sku || item.itemNo || "",
    cartPrice: String(Number(item.salePrice) || 0),
    price: Number(item.salePrice) || 0,
  };
}

export function mapGroupedProductToJerseyItem(product) {
  const variants = (product.variants || []).map((variant) => ({
    talla: variant.size,
    version: variant.type || product.type || "LOCAL",
    precio: variant.salePrice,
    codigo: variant.itemNo || variant.sku || variant.id,
    imagen: variant.imageUrl || product.imageUrl || "",
  }));

  return {
    baseName: product.productId || product.name,
    displayName: product.name,
    image: product.imageUrl || variants[0]?.imagen || "",
    variants,
  };
}

export function mapVariantToFeaturedProduct(item, index = 0) {
  return {
    id: `prod-${item.id}`,
    revealDelay: index + 1,
    image: item.imageUrl || "",
    alt: item.name,
    badge: item.stock <= 3 ? "Ultimas unidades" : undefined,
    name: item.name,
    price: Number(item.salePrice) || 0,
    cartId: item.id,
    cartName: `${item.name}${item.size ? ` (${item.size})` : ""}`,
    cartCode: item.reference || item.sku || item.itemNo || "",
    cartSize: item.size || "",
    cartSku: item.sku || item.itemNo || "",
    cartPrice: String(Number(item.salePrice) || 0),
  };
}

import { categoryRouteList } from "../../../data/categoryRoutes";

function getRouteForCategory(slug) {
  const route = categoryRouteList.find((entry) => entry.slug === slug);
  return route?.path || "/";
}

export function mapSearchResult(item) {
  return {
    name: item.name,
    url: getRouteForCategory(item.categorySlug || item.category),
    match: item.reference || item.itemNo || item.id,
    price: Number(item.salePrice) || 0,
    image: item.imageUrl || "",
    meta: [item.reference, item.size, item.category].filter(Boolean).join(" · "),
  };
}
