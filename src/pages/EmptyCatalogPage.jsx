import SiteChrome from "../components/SiteChrome";
import useSitePageBoot from "../app/useSitePageBoot";
import CatalogHero from "../features/storefront/components/CatalogHero";

function EmptyCatalogPage({
  activeNav,
  title,
  crumb,
  subtitle,
  whatsappProduct,
}) {
  useSitePageBoot(`${title} — Catalogo | Spot Deportivo Pro`);

  return (
    <SiteChrome activeNav={activeNav}>
      <CatalogHero crumb={crumb} title={title} subtitle={subtitle} />

      <section className="section section--white">
        <div className="container">
          <div className="empty-catalog" data-reveal>
            <strong>Catalogo en preparacion</strong>
            Muy pronto vas a ver aqui las novedades. Si buscas algo especifico,
            escribenos por WhatsApp y te ayudamos al momento.
            <div style={{ marginTop: "20px" }}>
              <a
                className="btn-whatsapp"
                style={{
                  display: "inline-flex",
                  width: "auto",
                  padding: "13px 26px",
                }}
                href="https://wa.me/18097020938"
                data-whatsapp-product={whatsappProduct}
                target="_blank"
                rel="noopener"
              >
                <span aria-hidden="true">💬</span> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}

export default EmptyCatalogPage;
