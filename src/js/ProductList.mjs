// src/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      this.renderList(list);
    } catch (err) {
      console.error("Erreur chargement produits:", err.message);
      this.listElement.innerHTML = `<li>Erreur chargement produits: ${err.message}</li>`;
    }
  }

  renderList(list) {
  this.listElement.innerHTML = "";
  list.forEach(product => {
    if (!product || !product.Images || !product.Images.PrimaryMedium) {
      console.warn("Produit manquant ou sans image :", product);
      return; // ignore ce produit
    }

    const li = document.createElement("li");
    li.classList.add("product-card");

    li.innerHTML = `
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium || 'assets/default-product.jpg'}" alt="${product.Name}" />
        <h3>${product.Name}</h3>
        <p class="price">$${product.FinalPrice}</p>
      </a>
    `;

    this.listElement.appendChild(li);
  });
}
}
