import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPublicProducts } from "../api/publicProductsApi";

const EMPTY_FALLBACK_ITEMS = [];

function usePublicProducts(query, options = {}) {
  const paginate = Boolean(options.paginate);
  const fallbackItems = options.fallbackItems ?? EMPTY_FALLBACK_ITEMS;
  const fallbackRef = useRef(fallbackItems);
  fallbackRef.current = fallbackItems;

  const [items, setItems] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const queryKey = JSON.stringify({ ...(query ?? {}), all: undefined, page: undefined });
  const queryRef = useRef(query);
  queryRef.current = query;

  const pageRef = useRef(1);
  const hasMoreRef = useRef(false);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    let active = true;
        const parsedQuery = JSON.parse(queryKey);
        delete parsedQuery.all;
        delete parsedQuery.page;
    pageRef.current = 1;
    hasMoreRef.current = false;
    loadingMoreRef.current = false;

    async function run() {
      setLoading(true);
      setLoadingMore(false);
      setError("");
      setHasMore(false);

      try {
        const result = await fetchPublicProducts({
          ...parsedQuery,
          page: 1,
        });
        if (!active) return;
        const batch = result.items || [];
        const totalCount = Number(result.total ?? batch.length);
        setItems(batch);
        setCompany(result.company || null);
        setTotal(totalCount);
        const more = paginate && batch.length > 0 && batch.length < totalCount;
        hasMoreRef.current = more;
        setHasMore(more);
      } catch (err) {
        if (!active) return;
        setItems(fallbackRef.current);
        setCompany(null);
        setTotal(0);
        hasMoreRef.current = false;
        setHasMore(false);
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        if (active) setLoading(false);
      }
    }

    run();

    return () => {
      active = false;
    };
  }, [queryKey, paginate]);

  const loadMore = useCallback(async () => {
    if (!paginate || !hasMoreRef.current || loadingMoreRef.current) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);
    const nextPage = pageRef.current + 1;

    try {
      const nextQuery = { ...(queryRef.current ?? {}) };
      delete nextQuery.all;
      const result = await fetchPublicProducts({
        ...nextQuery,
        page: nextPage,
      });
      const batch = result.items || [];
      setItems((current) => {
        const seen = new Set(
          current.map((item) => item.styleKey || item.id || item.productId),
        );
        const merged = current.concat(
          batch.filter((item) => !seen.has(item.styleKey || item.id || item.productId)),
        );
        const totalCount = Number(result.total ?? merged.length);
        setTotal(totalCount);
        const more = batch.length > 0 && merged.length < totalCount;
        hasMoreRef.current = more;
        setHasMore(more);
        return merged;
      });
      pageRef.current = nextPage;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [paginate]);

  return {
    items,
    company,
    loading,
    loadingMore,
    error,
    hasMore,
    total,
    loadMore,
  };
}

export default usePublicProducts;
