import SiteChrome from "../components/SiteChrome";
import useSitePageBoot from "../app/useSitePageBoot";
import { useMemo } from "react";
import FeaturedProductCard from "../features/storefront/components/FeaturedProductCard";
import ProductCardSkeleton from "../features/storefront/components/ProductCardSkeleton";
import PromoSection from "../features/storefront/components/PromoSection";
import BenefitsSection from "../features/storefront/components/BenefitsSection";
import PaymentMethodsSection from "../features/storefront/components/PaymentMethodsSection";
import TestimonialsSection from "../features/storefront/components/TestimonialsSection";
import FaqSection from "../features/storefront/components/FaqSection";
import usePublicProducts from "../features/storefront/hooks/usePublicProducts";
import { categoryRouteList } from "../data/categoryRoutes";
import { mapVariantToFeaturedProduct } from "../features/storefront/utils/productMappers";

function HomeNativePage() {
  useSitePageBoot(
    "Spot Deportivo Pro — Ropa y calzado deportivo en Republica Dominicana",
  );

  const { items: apiItems, loading, error } = usePublicProducts({
    page: 1,
    pageSize: 8,
    status: "ACTIVE",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const featuredProducts = useMemo(
    () =>
      apiItems
        .slice(0, 8)
        .map((item, index) => mapVariantToFeaturedProduct(item, index)),
    [apiItems],
  );

  return (
    <SiteChrome activeNav="home">
      <section className="hero" data-hero>
        <img
          className="hero-bg"
          data-hero-img
          src="assets/img/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        <div className="hero-scrim"></div>
        <div className="hero-blob hero-blob--a" aria-hidden="true"></div>
        <div className="hero-blob hero-blob--b" aria-hidden="true"></div>
        <div className="hero-inner">
          <span className="eyebrow hero-eyebrow" data-hero-anim>
            NUEVA COLECCION AERO-FUEL
          </span>
          <h1 className="hero-title" data-hero-anim>
            Entrena
            <br />
            <em>sin limites</em>
          </h1>
          <p className="hero-copy" data-hero-anim>
            Ropa y calzado deportivo pensado para el ritmo dominicano.
            Rendimiento real, estilo que se nota.
          </p>
          <div className="hero-ctas" data-hero-anim>
            <a className="btn btn-primary" href="#productos">
              Comprar ahora
            </a>
            <a className="btn btn-outline" href="#categorias">
              Ver catalogo
            </a>
          </div>
        </div>
      </section>

      <section className="section section--cream" id="categorias">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2 className="section-title">Compra por categoria</h2>
            <p className="section-sub">Encuentra tu equipo ideal en segundos</p>
          </div>
          <div className="category-grid">
            {categoryRouteList.map((category, index) => (
              <a
                key={category.path}
                className={`category-card${category.featured ? " category-card--feature" : ""}`}
                href={category.path}
                data-reveal
                data-reveal-delay={category.featured ? undefined : String((index % 5) + 1)}
              >
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="category-card__scrim"></div>
                <span className="category-card__label">
                  {category.featured ? (
                    <>
                      Nuevas
                      <br />
                      Colecciones
                    </>
                  ) : (
                    category.title
                  )}
                </span>
                {category.featured && (
                  <span className="category-card__tag">Ver todo →</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white" id="productos">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <h2 className="section-title">Productos destacados</h2>
              <p className="section-sub">Lo mas buscado esta semana</p>
            </div>
            <a className="link-arrow" href="#categorias">
              Ver todo el catalogo →
            </a>
          </div>

          {error && (
            <div className="catalog-status catalog-status--error" data-reveal>
              No pudimos cargar los productos destacados.
            </div>
          )}

          <div className="product-grid">
            {loading ? (
              <ProductCardSkeleton count={4} />
            ) : featuredProducts.length ? (
              featuredProducts.map((product) => (
                <FeaturedProductCard key={product.cartId} {...product} />
              ))
            ) : (
              <div className="empty-catalog" data-reveal>
                <strong>Catalogo en preparacion</strong>
                Muy pronto vas a ver aqui los productos destacados.
              </div>
            )}
          </div>
        </div>
      </section>

      <PromoSection />
      <BenefitsSection />
      <PaymentMethodsSection />
      <TestimonialsSection />
      <FaqSection />
    </SiteChrome>
  );
}

export default HomeNativePage;
