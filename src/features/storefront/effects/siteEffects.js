function setupRevealObserver() {
  const targets = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!targets.length) return () => {};

  if (!("IntersectionObserver" in window)) {
    targets.forEach((node) => node.classList.add("is-revealed"));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px -2% 0px" },
  );

  targets.forEach((node) => observer.observe(node));
  return () => observer.disconnect();
}

function setupTiltCards() {
  const cards = Array.from(document.querySelectorAll("[data-tilt]"));
  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  if (!canHover || !cards.length) return () => {};

  const cleanups = cards.map((card) => {
    let raf = null;

    const onMove = (event) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--tilt-x", `${((0.5 - py) * 8).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${((px - 0.5) * 8).toFixed(2)}deg`);
        card.style.setProperty("--glow-x", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--glow-y", `${(py * 100).toFixed(1)}%`);
        raf = null;
      });
    };

    const onEnter = () => card.classList.add("is-hot");
    const onLeave = () => {
      card.classList.remove("is-hot");
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function setupFaqAccordion() {
  const items = Array.from(document.querySelectorAll("[data-faq-item]"));
  if (!items.length) return () => {};

  const handlers = items.map((item) => {
    const onToggle = () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    };

    item.addEventListener("toggle", onToggle);
    return () => item.removeEventListener("toggle", onToggle);
  });

  return () => handlers.forEach((cleanup) => cleanup());
}

function setupHeroParallax() {
  const hero = document.querySelector("[data-hero]");
  const heroImg = document.querySelector("[data-hero-img]");
  if (!hero || !heroImg) return () => {};

  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(
      0,
      Math.min(
        1,
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
      ),
    );
    heroImg.style.transform = `translate3d(0, ${(progress * 14).toFixed(2)}%, 0)`;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

function highlightFromHash() {
  const hash = decodeURIComponent(window.location.hash || "");
  if (!hash.startsWith("#goto-")) return;

  const targetValue = hash.slice(6);
  const button = document.querySelector(
    `[data-add-to-cart][data-id="${CSS.escape(targetValue)}"]`,
  );

  let card = button?.closest(".product-card");
  if (!card) {
    const allCards = Array.from(document.querySelectorAll("[data-base-name]"));
    card = allCards.find((entry) => entry.dataset.baseName === targetValue);
  }

  if (!card) return;

  window.setTimeout(() => {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("is-highlighted");
    window.setTimeout(() => card.classList.remove("is-highlighted"), 2200);
  }, 200);
}

function markButtonAsAdded(button) {
  const original = button.textContent;
  button.classList.add("is-added");
  button.textContent = "✓ AGREGADO";

  const restore = () => {
    button.classList.remove("is-added");
    button.textContent = original;
  };

  window.setTimeout(restore, 1500);
}

export function setupContentInteractiveEffects(addProduct) {
  const revealCleanup = setupRevealObserver();
  const tiltCleanup = setupTiltCards();
  const faqCleanup = setupFaqAccordion();
  const heroCleanup = setupHeroParallax();

  highlightFromHash();
  window.addEventListener("hashchange", highlightFromHash);

  const buttons = Array.from(document.querySelectorAll("[data-add-to-cart]"));
  const listeners = buttons.map((button) => {
    const onClick = () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      if (!id || !name) return;

      const product = {
        id,
        name,
        price: Number(button.dataset.price) || 0,
        code: button.dataset.code || "",
        image: button.dataset.image || "",
        size: button.dataset.size || "",
        sku: button.dataset.sku || "",
        variant: button.dataset.variant || "",
      };

      addProduct(product);
      markButtonAsAdded(button);
    };

    button.addEventListener("click", onClick);
    return () => button.removeEventListener("click", onClick);
  });

  return () => {
    revealCleanup();
    tiltCleanup();
    faqCleanup();
    heroCleanup();
    listeners.forEach((cleanup) => cleanup());
    window.removeEventListener("hashchange", highlightFromHash);
  };
}
