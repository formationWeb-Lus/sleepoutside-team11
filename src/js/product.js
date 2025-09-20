// product.js
import ProductData from "./ProductData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const dataSource = new ProductData("tents");

// Fonction pour afficher les détails du produit
async function renderProductDetails() {
  // Récupérer l'ID du produit depuis l'URL
  const productId = new URLSearchParams(window.location.search).get("product");

  const container = document.getElementById("product-details");
  if (!productId) {
    container.innerHTML = "<p>❌ Aucun produit sélectionné.</p>";
    return;
  }

  // Récupérer le produit correspondant
  const product = await dataSource.findProductById(productId);

  if (!product) {
    container.innerHTML = `<p>❌ Produit ${productId} introuvable.</p>`;
    return;
  }

  // Générer le HTML dynamique
  container.innerHTML = `
    <section class="product-detail">
      <h2>${product.Name}</h2>
      <img src="${product.Image}" alt="${product.Name}">
      <p>${product.Description}</p>
      <p><strong>${product.FinalPrice} €</strong></p>
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </section>
  `;

  // Attacher l’événement du bouton
  const btn = document.getElementById("addToCart");
  btn.addEventListener("click", () => addProductToCart(product));
}

// Fonction pour ajouter le produit au panier
function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  const existingItem = cartItems.find(item => item.Id === product.Id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);
  alert(`${product.Name} ajouté au panier ✅`);
}

// Lancer le rendu du produit
renderProductDetails();
