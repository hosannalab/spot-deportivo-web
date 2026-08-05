const PROMO_CARDS = [
  {
    className: "promo-card promo-card--hot",
    kicker: "TEMPORADA VERANO",
    title: "Hasta 30% off",
    body: "En calzado running seleccionado. Solo por tiempo limitado.",
  },
  {
    className: "promo-card promo-card--info",
    kicker: "ENVIOS A TODO EL PAIS",
    body: "Santo Domingo y Santiago: 24-48h\nResto del pais: 2-4 dias habiles",
    revealDelay: "1",
  },
];

function PromoSection() {
  return (
    <section className="section section--tight section--ink" id="ofertas">
      <div className="container">
        <div className="promo-grid">
          {PROMO_CARDS.map((card) => (
            <div
              key={card.kicker}
              className={card.className}
              data-reveal
              data-reveal-delay={card.revealDelay}
            >
              <span className="promo-kicker">{card.kicker}</span>
              {card.title && <h3>{card.title}</h3>}
              <p>
                {card.body.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromoSection;
