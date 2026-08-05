import { useEffect, useRef, useState } from "react";
import { fetchPublicProducts } from "../api/publicProductsApi";

const EMPTY_FALLBACK_ITEMS = [];

function usePublicProducts(query, options = {}) {
  const fallbackItems = options.fallbackItems ?? EMPTY_FALLBACK_ITEMS;
  const fallbackRef = useRef(fallbackItems);
  fallbackRef.current = fallbackItems;

  const [items, setItems] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const queryKey = JSON.stringify(query ?? {});

  useEffect(() => {
    let active = true;
    const parsedQuery = JSON.parse(queryKey);

    async function run() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchPublicProducts(parsedQuery);
        if (!active) return;
        setItems(result.items || []);
        setCompany(result.company || null);
      } catch (err) {
        if (!active) return;
        setItems(fallbackRef.current);
        setCompany(null);
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        if (active) setLoading(false);
      }
    }

    run();

    return () => {
      active = false;
    };
  }, [queryKey]);

  return { items, company, loading, error };
}

export default usePublicProducts;
