const METHODS = ["Transferencia bancaria", "WhatsApp"];

function PaymentMethodsSection() {
  return (
    <section
      className="section section--tight section--white"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container">
        <span
          className="eyebrow"
          style={{
            color: "var(--ink-mute)",
            display: "block",
            marginBottom: "20px",
          }}
        >
          METODOS DE PAGO ACEPTADOS
        </span>
        <div className="payment-row" data-reveal>
          {METHODS.map((method) => (
            <span key={method} className="payment-chip">
              {method}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PaymentMethodsSection;
