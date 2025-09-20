import ProductData from "./ProductData.mjs";
import Alerts from "./alerts.mjs";  // si alerts.mjs est dans src/js/

// --- Charger le CSS dynamiquement ---
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = "./css/tents.css";  // chemin relatif depuis dist/index.html
document.head.appendChild(link);

// --- Produits ---
const dataSource = new ProductData("./json/tents.json");  // chemin relatif vers le JSON
const element = document.querySelector(".product-list");

// On affiche simplement les produits dans la liste
dataSource.init().then(products => {
  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price}`;
    element.appendChild(li);
  });
}).catch(err => console.error("Erreur chargement produits :", err));

// --- Alertes ---
const alerts = new Alerts("./json/alerts.json", "#alerts");  // chemin relatif vers le JSON
alerts.init();
