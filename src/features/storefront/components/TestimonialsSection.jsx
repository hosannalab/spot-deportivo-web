const TESTIMONIALS = [
  {
    stars: "★★★★★",
    quote:
      '"Llego rapidisimo y la calidad es de verdad premium. Ya hice mi segundo pedido."',
    avatar: "CM",
    name: "Carlos M. - Santo Domingo",
    revealDelay: "1",
  },
  {
    stars: "★★★★★",
    quote:
      '"Me encanto la atencion por WhatsApp, me ayudaron a escoger mi talla sin drama."',
    avatar: "YR",
    name: "Yolanda R. - Santiago",
    avatarStyle: { background: "var(--accent)" },
    revealDelay: "2",
  },
  {
    stars: "★★★★☆",
    quote:
      '"Buenos precios y productos originales. El envio a mi zona tardo un poco mas."',
    avatar: "PA",
    name: "Pedro A. - La Romana",
    revealDelay: "3",
  },
];

function TestimonialsSection() {
  return (
    <section className="section section--white">
      <div className="container">
        <h2
          className="section-title"
          style={{ textAlign: "center", marginBottom: "32px" }}
          data-reveal
        >
          Lo que dicen nuestros clientes
        </h2>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((entry) => (
            <div
              key={entry.name}
              className="testimonial-card"
              data-reveal
              data-reveal-delay={entry.revealDelay}
            >
              <div className="stars" aria-hidden="true">
                {entry.stars}
              </div>
              <p className="testimonial-quote">{entry.quote}</p>
              <div className="testimonial-person">
                <div className="avatar" style={entry.avatarStyle}>
                  {entry.avatar}
                </div>
                <span className="testimonial-name">{entry.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
