const BENEFITS = [
  { icon: "⚡", label: "Compra rapida", revealDelay: "1" },
  { icon: "✓", label: "Productos originales", revealDelay: "2" },
  { icon: "☎", label: "Atencion personalizada", revealDelay: "3" },
  { icon: "🔒", label: "Pagos seguros", revealDelay: "4" },
  { icon: "🚚", label: "Envios a todo el pais" },
];

function BenefitsSection() {
  return (
    <section className="section section--cream">
      <div className="container">
        <div className="benefit-grid">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.label}
              className="benefit"
              data-reveal
              data-reveal-delay={benefit.revealDelay}
            >
              <div className="benefit__icon" aria-hidden="true">
                {benefit.icon}
              </div>
              <span className="benefit__label">{benefit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
