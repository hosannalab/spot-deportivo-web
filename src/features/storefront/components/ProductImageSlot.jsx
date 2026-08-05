import { useEffect, useState } from "react";

function ProductImageSlot({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  decoding = "async",
}) {
  const [failed, setFailed] = useState(false);
  const imageSrc = typeof src === "string" ? src.trim() : "";
  const hasImage = Boolean(imageSrc) && !failed;

  useEffect(() => {
    setFailed(false);
  }, [imageSrc]);

  if (hasImage) {
    return (
      <img
        className={className || undefined}
        src={imageSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`${className ? `${className} ` : ""}image-empty-state`}
      role="img"
      aria-label="Sin imagen"
    >
      <span className="image-empty-state__mark" aria-hidden="true"></span>
      <span>Sin imagen</span>
    </div>
  );
}

export default ProductImageSlot;
