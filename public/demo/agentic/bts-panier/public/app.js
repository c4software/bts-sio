import { products, findProduct } from "/src/catalogue.js";
import {
  createCart,
  addItem,
  removeItem,
  itemCount,
  subtotal,
  formatPrice,
} from "/src/panier.js";

const cart = createCart();

function renderCatalogue() {
  const list = document.getElementById("catalogue");
  for (const product of products) {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = product.name;
    const price = document.createElement("em");
    price.textContent = formatPrice(product.price);
    const button = document.createElement("button");
    button.textContent = "Ajouter";
    button.addEventListener("click", () => {
      addItem(cart, findProduct(product.id));
      renderCart();
    });
    li.append(name, price, button);
    list.append(li);
  }
}

function renderCart() {
  const body = document.getElementById("lignes");
  body.replaceChildren();
  for (const line of cart.lines) {
    const tr = document.createElement("tr");
    const cells = [
      line.product.name,
      String(line.quantity),
      formatPrice(line.product.price * line.quantity),
    ];
    for (const text of cells) {
      const td = document.createElement("td");
      td.textContent = text;
      tr.append(td);
    }
    const td = document.createElement("td");
    const button = document.createElement("button");
    button.className = "retirer";
    button.textContent = "Retirer";
    button.addEventListener("click", () => {
      removeItem(cart, line.product.id);
      renderCart();
    });
    td.append(button);
    tr.append(td);
    body.append(tr);
  }
  document.getElementById("nombre").textContent = itemCount(cart);
  document.getElementById("vide").hidden = cart.lines.length > 0;
  document.getElementById("sous-total").textContent = formatPrice(subtotal(cart));
}

renderCatalogue();
renderCart();
