import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.container = document.getElementById("product-details");
  }

  async init() {
    if (!this.container) return console.error("Container #product-details introuvable");

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
    const existing = cartItems.find(item => item.Id === this.product.Id);

    if (existing) {
      existing.Quantity = (existing.Quantity || 1) + 1;
    } else {
      this.product.Quantity = 1;
      cartItems.push(this.product);
    }

    setLocalStorage("so-cart", cartItems);

    // ✅ Redirection vers checkout/index.html après ajout au panier
    window.location.href = "../checkout/index.html";
  }

  renderProductDetails() {
    const product = this.product;

    const imgSrc = product?.Images?.PrimaryExtraLarge || 'assets/default-product.jpg';
    const brand = product?.Brand?.Name || 'Marque inconnue';
    const name = product?.NameWithoutBrand || product?.Name || 'Produit sans nom';
    const price = product?.FinalPrice != null ? product.FinalPrice : 0;
    const color = product?.Colors?.[0]?.ColorName || 'Couleur indisponible';
    const description = product?.DescriptionHtmlSimple || 'Description indisponible';

    this.container.innerHTML = `
      <h3>${brand}</h3>
      <h2>${name}</h2>
      <img src="${imgSrc}" alt="${name}" />
      <p class="product-price">$${price}</p>
      <p class="product-color">${color}</p>
      <p class="product-description">${description}</p>
      <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    `;
  }
}
