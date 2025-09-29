import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.container = document.getElementById("product-details");
  }

  async init() {
    if (!this.productId) {
      this.container.innerHTML = "<p>❌ Aucun produit sélectionné.</p>";
      return;
    }

    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      this.container.innerHTML = `<p>❌ Produit ${this.productId} introuvable.</p>`;
      return;
    }

    this.renderProductDetails();

    const btn = document.getElementById("add-to-cart");
    if (btn) {
      btn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alert(`${this.product.Name || 'Produit'} ajouté au panier ✅`);
  }

  renderProductDetails() {
    const product = this.product;

    // fallback pour images et autres propriétés
    const imgSrc = product?.Images?.PrimaryExtraLarge || 'assets/default-product.jpg';
    const brand = product?.Brand?.Name || 'Marque inconnue';
    const name = product?.NameWithoutBrand || product?.Name || 'Produit sans nom';
    const price = product?.FinalPrice != null ? product.FinalPrice : 0;
    const color = product?.Colors?.[0]?.ColorName || 'Couleur indisponible';
    const description = product?.DescriptionHtmlSimple || 'Description indisponible';

    this.container.innerHTML = `
      <h2>${product.Category ? product.Category.charAt(0).toUpperCase() + product.Category.slice(1) : 'Catégorie inconnue'}</h2>
      <p id="p-brand">${brand}</p>
      <p id="p-name">${name}</p>
      <img id="p-image" src="${imgSrc}" alt="${name}">
      <p id="p-price">${new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price * 0.85)}</p>
      <p id="p-color">${color}</p>
      <div id="p-description">${description}</div>
      <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    `;
  }
}
