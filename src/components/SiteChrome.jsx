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
        ENVIO GRATIS en pedidos desde RD$2,000 · Paga por transferencia bancaria o{" "}
        <strong>WhatsApp</strong>
      </div>

      <header
        className={`site-header ${isCondensed ? "is-condensed" : ""}`}
        data-site-header
      >
        <a className="brand" href="/" aria-label="Spot Deportivo Pro - inicio">
          <span className="brand-mark">
            <span>S</span>
            <em>D</em>
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
                  <span>S</span>
                  <em>D</em>
                </span>
                <span className="brand-name" style={{ color: "var(--paper)" }}>
                  SPOT DEPORTIVO PRO
                </span>
              </div>
              <p style={{ maxWidth: "280px", marginBottom: "14px" }}>
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
            © <span id="year">{new Date().getFullYear()}</span> Spot Deportivo
            Pro. Todos los derechos reservados.
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
        💬
      </a>
    </>
  );
}

export default SiteChrome;
