function CatalogHero({ crumb, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb" data-hero-anim>
          <a href="/">Inicio</a> <span>/</span> <span>{crumb}</span>
        </div>
        <h1 className="page-hero__title" data-hero-anim>
          {title}
        </h1>
        <p className="page-hero__sub" data-hero-anim>
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default CatalogHero;
