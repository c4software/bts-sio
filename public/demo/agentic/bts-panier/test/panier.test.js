import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createCart,
  addItem,
  removeItem,
  itemCount,
  subtotal,
  formatPrice,
} from "../src/panier.js";

const usb = { id: "usb64", name: "Clé USB 64 Go", price: 1290 };
const cable = { id: "rj45", name: "Câble RJ45 3 m", price: 490 };

test("un panier neuf est vide", () => {
  const cart = createCart();
  assert.equal(itemCount(cart), 0);
  assert.equal(subtotal(cart), 0);
});

test("ajouter deux fois le même produit cumule la quantité", () => {
  const cart = createCart();
  addItem(cart, usb);
  addItem(cart, usb, 2);
  assert.equal(cart.lines.length, 1);
  assert.equal(itemCount(cart), 3);
});

test("une quantité nulle, négative ou décimale est refusée", () => {
  const cart = createCart();
  assert.throws(() => addItem(cart, usb, 0));
  assert.throws(() => addItem(cart, usb, -1));
  assert.throws(() => addItem(cart, usb, 1.5));
});

test("le sous-total additionne prix × quantité", () => {
  const cart = createCart();
  addItem(cart, usb, 2);
  addItem(cart, cable);
  assert.equal(subtotal(cart), 2 * 1290 + 490);
});

test("retirer un produit supprime sa ligne", () => {
  const cart = createCart();
  addItem(cart, usb);
  addItem(cart, cable);
  removeItem(cart, "usb64");
  assert.deepEqual(
    cart.lines.map((l) => l.product.id),
    ["rj45"],
  );
});

test("formatPrice écrit un prix à la française", () => {
  assert.equal(formatPrice(1290), "12,90 €");
  assert.equal(formatPrice(5), "0,05 €");
  assert.equal(formatPrice(0), "0,00 €");
});
