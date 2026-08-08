import { useEffect, useState } from "react";

function ProductImageSlot({
  src,
  alt = "",
  className = "",
  fit = "cover",
  loading = "lazy",
  decoding = "async",
  compact = false,
}) {
  const [failed, setFailed] = useState(false);
  const imageSrc = typeof src === "string" ? src.trim() : "";
  const hasImage = Boolean(imageSrc) && !failed;
  const classes = [
    "product-image-slot",
    fit === "contain" ? "product-image-slot--contain" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    setFailed(false);
  }, [imageSrc]);

  if (hasImage) {
    return (
      <img
        className={classes}
        src={imageSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        width={compact ? 52 : 400}
        height={compact ? 52 : 400}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={`${classes} image-empty-state`} role="img" aria-label="Sin imagen">
      <span className="image-empty-state__mark" aria-hidden="true"></span>
      <span>Sin imagen</span>
    </div>
  );
}

export default ProductImageSlot;
