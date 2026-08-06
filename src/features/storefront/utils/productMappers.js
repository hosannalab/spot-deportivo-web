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

export function mapGroupedProductToCatalogItem(product, index = 0) {
  const variants = product.variants || [];
  const prices = variants
    .map((variant) => Number(variant.salePrice))
    .filter((price) => price > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  return {
    revealDelay: (index % 6) + 1,
    productId: product.productId,
    name: product.name,
    image: product.imageUrl || variants[0]?.imageUrl || "",
    brand: product.brand,
    model: product.model,
    type: product.type,
    minPrice,
    maxPrice,
    sizeCount: variants.length,
    hasStock: variants.some((variant) => variant.stock > 0),
  };
}

export function mapGroupedProductToJerseyItem(product) {
  const variants = (product.variants || []).map((variant) => ({
    id: variant.id,
    talla: variant.size,
    version: variant.type || product.type || "LOCAL",
    precio: variant.salePrice,
    stock: variant.stock,
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
  const categoryPath = getRouteForCategory(item.categorySlug || item.category);

  return {
    name: item.name,
    url: item.productId ? `/producto/${item.productId}` : categoryPath,
    match: item.reference || item.itemNo || item.id,
    price: Number(item.salePrice) || 0,
    image: item.imageUrl || "",
    meta: [item.reference, item.size, item.category].filter(Boolean).join(" · "),
  };
}
