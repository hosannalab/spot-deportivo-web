import { useEffect, useRef } from "react";

function CatalogLoadMore({
  hasMore,
  loadingMore,
  onLoadMore,
  loaded = 0,
  total = 0,
}) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loadingMore) return undefined;

    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onLoadMore();
        }
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, onLoadMore]);

  if (!hasMore && !loadingMore) return null;

  return (
    <div className="catalog-load-more">
      <div ref={sentinelRef} className="catalog-load-more__sentinel" aria-hidden="true" />
      {total > 0 && (
        <p className="catalog-load-more__meta">
          Mostrando {loaded} de {total}
        </p>
      )}
      <button
        type="button"
        className="btn btn-primary"
        disabled={loadingMore}
        onClick={onLoadMore}
      >
        {loadingMore ? "Cargando..." : "Ver más"}
      </button>
    </div>
  );
}

export default CatalogLoadMore;
