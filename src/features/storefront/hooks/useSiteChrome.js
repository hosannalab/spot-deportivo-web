import { useEffect, useMemo, useState } from "react";
import { brandConfig } from "../../../data/brandConfig";
import { fetchPublicProducts } from "../api/publicProductsApi";
import { mapSearchResult } from "../utils/productMappers";
import {
  addProductToCart,
  buildCheckoutHref,
  computeSubtotal,
  formatCartItemMeta,
  formatMoney,
  loadCart,
  saveCart,
} from "../utils/cart";
import { setupContentInteractiveEffects } from "../effects/siteEffects";
import useSiteDocumentUi from "./useSiteDocumentUi";

export { formatCartItemMeta, formatMoney };

function useSiteChrome(children) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [cart, setCart] = useState(() => loadCart());
  const [isCondensed, setIsCondensed] = useState(false);

  const totalQty = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  );
  const subtotal = useMemo(() => computeSubtotal(cart), [cart]);
  const whatsappCatalogHref = useMemo(
    () =>
      `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(brandConfig.whatsappMessage)}`,
    [],
  );
  const checkoutHref = useMemo(
    () =>
      buildCheckoutHref(
        cart,
        whatsappCatalogHref,
        brandConfig.whatsappNumber,
        brandConfig.name,
      ),
    [cart, whatsappCatalogHref],
  );

  const filteredResults = useMemo(() => {
    if (!query.trim()) return searchResults.slice(0, 8);
    return searchResults;
  }, [query, searchResults]);

  function addProduct(product) {
    setCart((prev) => addProductToCart(prev, product));
  }

  function updateCartQty(id, delta) {
    setCart((prev) => {
      const next = prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0);
      return next;
    });
  }

  function removeCartItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    if (!searchOpen) return undefined;

    const trimmed = query.trim();
    if (!trimmed) {
      setSearchResults([]);
      setSearchLoading(false);
      return undefined;
    }

    let ignore = false;
    setSearchLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const result = await fetchPublicProducts({
          search: trimmed,
          page: 1,
          pageSize: 8,
          status: "ACTIVE",
        });
        if (!ignore) {
          setSearchResults((result.items || []).map(mapSearchResult));
        }
      } catch {
        if (!ignore) setSearchResults([]);
      } finally {
        if (!ignore) setSearchLoading(false);
      }
    }, 300);

    return () => {
      ignore = true;
      window.clearTimeout(timer);
    };
  }, [query, searchOpen]);

  useSiteDocumentUi({
    menuOpen,
    cartOpen,
    searchOpen,
    setMenuOpen,
    setCartOpen,
    setSearchOpen,
    setIsCondensed,
  });

  useEffect(() => {
    return setupContentInteractiveEffects(addProduct);
  }, [children]);

  return {
    menuOpen,
    setMenuOpen,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    query,
    setQuery,
    cart,
    setCart,
    isCondensed,
    totalQty,
    subtotal,
    checkoutHref,
    whatsappCatalogHref,
    filteredResults,
    searchLoading,
    updateCartQty,
    removeCartItem,
  };
}

export default useSiteChrome;
