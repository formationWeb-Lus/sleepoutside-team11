function constructor() {}
function init() {}

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
