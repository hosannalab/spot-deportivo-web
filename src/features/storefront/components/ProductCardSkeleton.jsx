function ProductCardSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={`product-skeleton-${index}`}
          className="product-card product-card--skeleton"
          aria-hidden="true"
        >
          <div className="product-card__media skeleton-block" />
          <div className="product-card__body">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--short" />
            <div className="skeleton-line skeleton-line--button" />
          </div>
        </article>
      ))}
    </>
  );
}

export default ProductCardSkeleton;
