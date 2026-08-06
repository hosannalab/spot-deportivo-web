const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PUBLIC_API_KEY = import.meta.env.VITE_PUBLIC_API_KEY || "";
const COMPANY_EXTERNAL_ID = import.meta.env.VITE_COMPANY_EXTERNAL_ID || "";

function removeEmptyParams(input) {
  const clean = {};
  Object.entries(input).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    clean[key] = String(value);
  });
  return clean;
}

function getPublicHeaders() {
  if (!PUBLIC_API_KEY || !COMPANY_EXTERNAL_ID) {
    throw new Error(
      "Missing VITE_PUBLIC_API_KEY or VITE_COMPANY_EXTERNAL_ID in web-react env.",
    );
  }

  return {
    "x-api-key": PUBLIC_API_KEY,
    "x-company-external-id": COMPANY_EXTERNAL_ID,
  };
}

async function parsePublicResponse(response) {
  if (response.status === 304) {
    throw new Error("Public API returned 304 Not Modified");
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || data?.error || "Public API request failed";
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  return data;
}

export async function fetchPublicProducts(query = {}) {
  const params = new URLSearchParams(removeEmptyParams(query));
  const response = await fetch(`${API_URL}/public/products?${params.toString()}`, {
    cache: "no-store",
    headers: getPublicHeaders(),
  });

  return parsePublicResponse(response);
}

export async function fetchPublicCategories() {
  const response = await fetch(`${API_URL}/public/categories`, {
    cache: "no-store",
    headers: getPublicHeaders(),
  });

  return parsePublicResponse(response);
}

export async function fetchPublicProductStyle(productId) {
  const response = await fetch(`${API_URL}/public/products/${productId}/style`, {
    cache: "no-store",
    headers: getPublicHeaders(),
  });

  return parsePublicResponse(response);
}

export { API_URL, COMPANY_EXTERNAL_ID, PUBLIC_API_KEY };
