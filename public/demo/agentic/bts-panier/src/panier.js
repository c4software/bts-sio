// Le panier : une liste de lignes { product, quantity }.
// Tous les montants sont en centimes, pour éviter les erreurs d'arrondi
// des nombres à virgule (0.1 + 0.2 !== 0.3 en JavaScript).

export function createCart() {
  return { lines: [] };
}

export function addItem(cart, product, quantity = 1) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("La quantité doit être un entier positif");
  }
  const line = cart.lines.find((l) => l.product.id === product.id);
  if (line) {
    line.quantity += quantity;
  } else {
    cart.lines.push({ product, quantity });
  }
  return cart;
}

export function removeItem(cart, productId) {
  cart.lines = cart.lines.filter((l) => l.product.id !== productId);
  return cart;
}

export function itemCount(cart) {
  return cart.lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function subtotal(cart) {
  return cart.lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
}

export function formatPrice(cents) {
  const euros = Math.floor(cents / 100);
  const rest = String(cents % 100).padStart(2, "0");
  return `${euros},${rest} €`;
}
