const FAQS = [
  {
    question: "Cuanto tarda el envio?",
    answer:
      "Santo Domingo y Santiago: 24-48 horas. Resto del pais: 2-4 dias habiles.",
    open: true,
    revealDelay: "1",
  },
  {
    question: "Puedo cambiar la talla si no me queda?",
    answer:
      "Si, tenes 15 dias para cambios sin costo presentando tu comprobante de compra.",
    revealDelay: "2",
  },
  {
    question: "Que metodos de pago aceptan?",
    answer:
      "Tarjetas de credito/debito, bancos locales, transferencia bancaria y coordinacion por WhatsApp.",
    revealDelay: "3",
  },
  {
    question: "Hacen envios a toda Republica Dominicana?",
    answer:
      "Si, cubrimos las 32 provincias a traves de nuestros aliados logisticos.",
    revealDelay: "4",
  },
];

function FaqSection() {
  return (
    <section className="section section--cream">
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: "28px" }} data-reveal>
          Preguntas frecuentes
        </h2>
        <div className="faq-list">
          {FAQS.map((entry) => (
            <details
              key={entry.question}
              className="faq-item"
              data-faq-item
              open={entry.open}
              data-reveal
              data-reveal-delay={entry.revealDelay}
            >
              <summary>{entry.question}</summary>
              <p>{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
