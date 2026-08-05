function CatalogHero({ crumb, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb" data-reveal>
          <a href="/">Inicio</a> <span>/</span> <span>{crumb}</span>
        </div>
        <h1 className="page-hero__title" data-reveal>
          {title}
        </h1>
        <p className="page-hero__sub" data-reveal>
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default CatalogHero;
