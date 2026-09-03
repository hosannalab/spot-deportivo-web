import { brandConfig } from "../data/brandConfig";
import useSiteChrome, {
  formatMoney,
  getCartItemTitle,
} from "../features/storefront/hooks/useSiteChrome";
import CartItemDetails from "../features/storefront/components/CartItemDetails";
import ProductImageSlot from "../features/storefront/components/ProductImageSlot";

function navClass(activeNav, navKey) {
  return activeNav === navKey ? "is-deal" : "";
}

function submitNewsletter(event) {
  event.preventDefault();
  const row = event.currentTarget.querySelector(".newsletter-row");
  const success = event.currentTarget.querySelector(".newsletter-success");
  if (row) row.hidden = true;
  if (success) success.hidden = false;
}

function SiteChrome({ activeNav, children }) {
  const {
    menuOpen,
    setMenuOpen,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    query,
    setQuery,
    cart,
    setCart,
    isCondensed,
    totalQty,
    subtotal,
    checkoutHref,
    whatsappCatalogHref,
    filteredResults,
    searchLoading,
    updateCartQty,
    removeCartItem,
  } = useSiteChrome(children);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <div className="announce-bar" data-announce-bar>
        Paga por transferencia bancaria o <strong>WhatsApp</strong>
      </div>

      <header
        className={`site-header ${isCondensed ? "is-condensed" : ""}`}
        data-site-header
      >
        <a className="brand" href="/" aria-label="Spot Deportivo Pro - inicio">
          <span className="brand-mark">
            <img src="/assets/img/logo-mark.png" alt="" />
          </span>
          <span className="brand-name">
            SPOT DEPORTIVO <em>PRO</em>
          </span>
        </a>

        <nav className="main-nav" aria-label="Navegacion principal">
          <a href="/hombre" className={navClass(activeNav, "hombre")}>
            Hombre
          </a>
          <a href="/mujer" className={navClass(activeNav, "mujer")}>
            Mujer
          </a>
          <a href="/calzado" className={navClass(activeNav, "calzado")}>
            Calzado
          </a>
          <a href="/accesorios" className={navClass(activeNav, "accesorios")}>
            Accesorios
          </a>
          <a href="/jerseys" className={navClass(activeNav, "jerseys")}>
            Jerseys
          </a>
          <a
            href="/nuevas-colecciones"
            className={navClass(activeNav, "nuevas-colecciones")}
          >
            Nuevas colecciones
          </a>
          <a href="/#ofertas" className="is-deal">
            Ofertas
          </a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            type="button"
            aria-label="Buscar productos"
            onClick={() => setSearchOpen(true)}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#121417"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.2" y2="16.2"></line>
            </svg>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button
            className="icon-btn"
            type="button"
            aria-label="Ver carrito"
            onClick={() => setCartOpen(true)}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#121417"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span
              className={`cart-badge ${totalQty ? "is-bump" : ""}`}
              hidden={!totalQty}
            >
              {totalQty}
            </span>
          </button>
        </div>
      </header>

      <button
        className={`mobile-overlay ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label="Cerrar menu"
        onClick={() => setMenuOpen(false)}
      ></button>
      <nav
        className={`mobile-panel ${menuOpen ? "is-open" : ""}`}
        aria-label="Navegacion movil"
      >
        <a
          href="/hombre"
          className={navClass(activeNav, "hombre")}
          onClick={() => setMenuOpen(false)}
        >
          Hombre
        </a>
        <a
          href="/mujer"
          className={navClass(activeNav, "mujer")}
          onClick={() => setMenuOpen(false)}
        >
          Mujer
        </a>
        <a
          href="/calzado"
          className={navClass(activeNav, "calzado")}
          onClick={() => setMenuOpen(false)}
        >
          Calzado
        </a>
        <a
          href="/accesorios"
          className={navClass(activeNav, "accesorios")}
          onClick={() => setMenuOpen(false)}
        >
          Accesorios
        </a>
        <a
          href="/jerseys"
          className={navClass(activeNav, "jerseys")}
          onClick={() => setMenuOpen(false)}
        >
          Jerseys
        </a>
        <a
          href="/nuevas-colecciones"
          className={navClass(activeNav, "nuevas-colecciones")}
          onClick={() => setMenuOpen(false)}
        >
          Nuevas colecciones
        </a>
        <a
          href="/#ofertas"
          className="is-deal"
          onClick={() => setMenuOpen(false)}
        >
          Ofertas
        </a>
        <a href="#contacto" onClick={() => setMenuOpen(false)}>
          Contacto
        </a>
      </nav>

      <button
        className={`cart-overlay ${cartOpen ? "is-open" : ""}`}
        type="button"
        aria-label="Cerrar carrito"
        onClick={() => setCartOpen(false)}
      ></button>
      <aside
        className={`cart-drawer ${cartOpen ? "is-open" : ""}`}
        aria-label="Carrito de compras"
      >
        <div className="cart-drawer__head">
          <span>Tu carrito</span>
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="cart-drawer__body">
          {!cart.length && (
            <p className="cart-drawer__empty">
              Tu carrito esta vacio.
              <br />
              Agrega productos desde el catalogo.
            </p>
          )}
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item__thumb">
                <ProductImageSlot src={item.image} alt="" compact />
              </div>
              <div className="cart-item__info">
                <div className="cart-item__name">{getCartItemTitle(item)}</div>
                <CartItemDetails item={item} />
                <div className="cart-item__row">
                  <div className="cart-item__stepper">
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="cart-item__qty">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => removeCartItem(item.id)}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-drawer__foot">
          {cart.length > 0 && (
            <>
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <span>
                  {subtotal.total > 0
                    ? formatMoney(subtotal.total)
                    : "Se confirma por WhatsApp"}
                  {subtotal.total > 0 && subtotal.hasUnknown && (
                    <small>+ productos a confirmar por WhatsApp</small>
                  )}
                </span>
              </div>
              <a
                className="btn-whatsapp"
                href={checkoutHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Enviar pedido por WhatsApp
              </a>
              <button
                className="cart-drawer__clear"
                type="button"
                onClick={() => setCart([])}
              >
                Vaciar carrito
              </button>
            </>
          )}
        </div>
      </aside>

      <button
        className={`search-overlay ${searchOpen ? "is-open" : ""}`}
        type="button"
        aria-label="Cerrar busqueda"
        onClick={() => setSearchOpen(false)}
      ></button>
      <div
        className={`search-panel ${searchOpen ? "is-open" : ""}`}
        aria-label="Buscar productos"
      >
        <div className="search-panel__head">
          <label className="sr-only" htmlFor="search-input">
            Buscar productos
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Buscar productos..."
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="button"
            aria-label="Cerrar busqueda"
            onClick={() => setSearchOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="search-results">
          {searchLoading && (
            <p className="search-empty">Buscando productos...</p>
          )}
          {!searchLoading && filteredResults.length === 0 && query.trim() && (
            <p className="search-empty">
              Sin resultados. Prueba con otro nombre.
            </p>
          )}
          {!searchLoading &&
            filteredResults.map((item) => (
            <a
              key={`${item.url}-${item.match}`}
              className="search-result"
              href={item.url}
              onClick={() => setSearchOpen(false)}
            >
              <ProductImageSlot
                className="search-result__img"
                src={item.image}
                alt=""
              />
              <span className="search-result__info">
                <span className="search-result__name">{item.name}</span>
                <span className="search-result__price">
                  {item.price
                    ? formatMoney(item.price)
                    : "Consultar por WhatsApp"}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <main id="contenido" className="is-ready">
        {children}
      </main>

      <footer className="footer" id="contacto">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <span className="brand-mark">
                  <img src="/assets/img/logo-mark.png" alt="" />
                </span>
                <span className="brand-name" style={{ color: "var(--paper)" }}>
                  SPOT DEPORTIVO PRO
                </span>
              </div>
              <p className="footer-legal">{brandConfig.legalName}</p>
              <p className="footer-contact">
                Correo electronico:{" "}
                <a href={`mailto:${brandConfig.email}`}>{brandConfig.email}</a>
              </p>
              <p className="footer-location">
                Santo Domingo, Republica Dominicana
              </p>
              <div className="social-row">
                <a className="social-chip" href="/" aria-label="Instagram">
                  IG
                </a>
                <a className="social-chip" href="/" aria-label="Facebook">
                  FB
                </a>
                <a className="social-chip" href="/" aria-label="TikTok">
                  TT
                </a>
              </div>
            </div>
            <div>
              <span className="footer-col-title">Tienda</span>
              <div className="footer-links">
                <a href="/hombre">Hombre</a>
                <a href="/mujer">Mujer</a>
                <a href="/calzado">Calzado</a>
                <a href="/accesorios">Accesorios</a>
                <a href="/jerseys">Jerseys</a>
              </div>
            </div>
            <div>
              <span className="footer-col-title">Ayuda</span>
              <div className="footer-links">
                <a href="/#contacto">Politicas de compra</a>
                <a href="/#contacto">Cambios y devoluciones</a>
                <a href="/#contacto">Terminos y condiciones</a>
                <a
                  data-whatsapp-link
                  href={whatsappCatalogHref}
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp: {brandConfig.phoneDisplay}
                </a>
              </div>
            </div>
            <div>
              <span className="footer-col-title">Newsletter</span>
              <p style={{ marginBottom: "12px" }}>
                Ofertas y lanzamientos antes que nadie.
              </p>
              <form noValidate onSubmit={submitNewsletter}>
                <div className="newsletter-row">
                  <label className="sr-only" htmlFor="newsletter-email">
                    Correo electronico
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    autoComplete="email"
                  />
                  <button
                    className="btn btn-primary"
                    style={{ padding: "10px 16px" }}
                    type="submit"
                    aria-label="Suscribirse"
                  >
                    →
                  </button>
                </div>
                <p className="newsletter-success" hidden>
                  Gracias! Te avisaremos de las ofertas
                </p>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            © <span id="year">{new Date().getFullYear()}</span>{" "}
            {brandConfig.legalName}. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-fab"
        data-whatsapp-link
        href={whatsappCatalogHref}
        target="_blank"
        rel="noopener"
        aria-label="Escribenos por WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}

export default SiteChrome;
