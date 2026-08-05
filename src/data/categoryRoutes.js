export const categoryRoutes = {
  hombre: {
    path: "/hombre",
    slug: "HOMBRE",
    navKey: "hombre",
    title: "Hombre",
    crumb: "Hombre",
    subtitle:
      "Polos y camisetas deportivas. Escribenos por WhatsApp para tallas y precio.",
    image: "assets/img/cat-hombre.jpg",
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
      "Ropa deportiva para mujer. Escribenos por WhatsApp para tallas y precio.",
    image: "assets/img/cat-mujer.jpg",
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
      "Zapatillas y calzado deportivo. Escribenos por WhatsApp para tallas y precio.",
    image: "assets/img/cat-calzado.jpg",
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
    image: "assets/img/cat-accesorios.jpg",
    imageAlt: "Accesorios deportivos",
    whatsappProduct: "Catalogo Accesorios",
  },
  jerseys: {
    path: "/jerseys",
    slug: "JERSEY",
    navKey: "jerseys",
    title: "Jerseys",
    crumb: "Jerseys",
    subtitle: "MLB y LIDOM. Elige talla y version antes de agregar al carrito.",
    image: "",
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
    image: "assets/img/cat-nuevas-colecciones.jpg",
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
