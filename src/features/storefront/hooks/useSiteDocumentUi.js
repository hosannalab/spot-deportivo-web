import { useEffect } from "react";

function useSiteDocumentUi({ menuOpen, cartOpen, searchOpen, setMenuOpen, setCartOpen, setSearchOpen, setIsCondensed }) {
  useEffect(() => {
    if (menuOpen || cartOpen || searchOpen)
      document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
  }, [menuOpen, cartOpen, searchOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setCartOpen(false);
      setSearchOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [setMenuOpen, setCartOpen, setSearchOpen]);

  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setIsCondensed]);

  useEffect(() => {
    const onAnchorClick = (event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 84,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", onAnchorClick);
    return () => document.removeEventListener("click", onAnchorClick);
  }, []);
}

export default useSiteDocumentUi;
