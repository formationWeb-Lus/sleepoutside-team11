// product.js
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Créer une source de données pour la catégorie "tents"
const dataSource = new ProductData("tents");

// Fonction : ajouter un produit au panier
export function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");

  // ✅ Forcer à être un tableau pour éviter l’erreur "find is not a function"
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // Vérifie si le produit existe déjà dans le panier
  const existingItem = cartItems.find((item) => item.Id === product.Id);

  if (existingItem) {
    // Si déjà présent, on incrémente la quantité
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // Sinon on ajoute le produit avec une quantité de 1
    product.quantity = 1;
    cartItems.push(product);
  }

  // Sauvegarde du panier
  setLocalStorage("so-cart", cartItems);
  alert(`${product.Name} added to cart !`);
}

// Gestionnaire du clic sur "Add to Cart"
async function addToCartHandler(e) {
  const productId = e.target.dataset.id; // ID récupéré depuis l'attribut data-id
  const product = await dataSource.findProductById(productId);

  addProductToCart(product);
}

// Ajouter l’écouteur d’événement au bouton
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
