export const categoryRoutes = {
  hombre: {
    path: "/hombre",
    slug: "HOMBRE",
    navKey: "hombre",
    title: "Hombre",
    crumb: "Hombre",
    subtitle:
      "Polos y camisetas deportivas. Elige color y talla en la pagina del producto.",
    image: "assets/img/cat-hombre.jpeg",
    imageAlt: "Ropa deportiva para hombre",
    whatsappProduct: "Catalogo Hombre",
  },
  mujer: {
    path: "/mujer",
    slug: "MUJER",
    navKey: "mujer",
    title: "Mujer",
    crumb: "Mujer",
    subtitle:
      "Ropa deportiva para mujer. Elige color y talla en la pagina del producto.",
    image: "assets/img/cat-mujer.jpeg",
    imageAlt: "Ropa deportiva para mujer",
    whatsappProduct: "Catalogo Mujer",
  },
  calzado: {
    path: "/calzado",
    slug: "CALZADO",
    navKey: "calzado",
    title: "Calzado",
    crumb: "Calzado",
    subtitle:
      "Zapatillas y calzado deportivo. Elige color y talla en la pagina del producto.",
    image: "assets/img/cat-calzado.png",
    imageAlt: "Calzado deportivo",
    whatsappProduct: "Catalogo Calzado",
  },
  accesorios: {
    path: "/accesorios",
    slug: "ACCESORIOS",
    navKey: "accesorios",
    title: "Accesorios",
    crumb: "Accesorios",
    subtitle:
      "Accesorios deportivos. Escribenos por WhatsApp para consultas.",
    image: "assets/img/cat-accesorios.jpeg",
    imageAlt: "Accesorios deportivos",
    whatsappProduct: "Catalogo Accesorios",
  },
  jerseys: {
    path: "/jerseys",
    slug: "JERSEY",
    navKey: "jerseys",
    title: "Jerseys",
    homeLabel: "Subliminados",
    crumb: "Jerseys",
    subtitle: "MLB y LIDOM. Elige version, color y talla en la pagina del producto.",
    image: "assets/img/cat-jerseys.png",
    imageAlt: "Jerseys deportivos",
    whatsappProduct: "Catalogo Jerseys",
    grouped: true,
  },
  nuevasColecciones: {
    path: "/nuevas-colecciones",
    slug: "NUEVAS COLECCIONES",
    navKey: "nuevas-colecciones",
    title: "Nuevas Colecciones",
    crumb: "Nuevas Colecciones",
    subtitle:
      "Lo mas reciente del catalogo. Escribenos por WhatsApp para consultas.",
    image: "assets/img/cat-nuevas-colecciones.png",
    imageAlt: "Nuevas colecciones",
    whatsappProduct: "Nuevas Colecciones",
    featured: true,
  },
};

export const categoryRouteList = Object.values(categoryRoutes);

export function getCategoryRoute(key) {
  return categoryRoutes[key] || null;
}

export function getCategoryRouteByPath(pathname) {
  return categoryRouteList.find((entry) => entry.path === pathname) || null;
}
