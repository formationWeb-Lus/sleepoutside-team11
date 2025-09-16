import ProductData from "./ProductData.mjs";
import Alerts from "./alerts.mjs";  // si alerts.mjs est dans src/js/

// --- Charger le CSS dynamiquement ---
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = "../css/tents.css"; // ou "./css/tents.css" selon structure

document.head.appendChild(link);

// --- Produits ---
const dataSource = new ProductData(import.meta.env.BASE_URL + "json/tents.json");
const element = document.querySelector(".product-list");

// On affiche simplement les produits dans la liste
dataSource.init().then(products => {
  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = product.name + " - $" + product.price;
    element.appendChild(li);
  });
});

// --- Alertes ---
const alerts = new Alerts(import.meta.env.BASE_URL + "json/alerts.json", "#alerts");
alerts.init();
