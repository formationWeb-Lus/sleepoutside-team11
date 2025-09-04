import { getLocalStorage, qs } from "./utils.mjs";

// Afficher le contenu du panier
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = qs(".product-list");
  if (!productList) return;

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map(
    (item) => `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
      <p class="cart-card__quantity">Quantité: ${item.quantity || 1}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `,
  );

  productList.innerHTML = htmlItems.join("");
}

renderCartContents();
