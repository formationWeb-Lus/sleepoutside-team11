import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

// Charger le CSS dynamiquement
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = "./css/produit.css";
document.head.appendChild(link);

// Récupérer la catégorie depuis l'URL (?category=...)
const category = getParam('category') || "tents";

// Modifier le titre de la page
document.getElementById('category-title').textContent = `Top Products: ${category}`;

// Créer la source de données (API)
const dataSource = new ProductData();

// Sélectionner la liste UL
const listElement = document.querySelector(".product-list");

// Créer l’instance ProductList
const myList = new ProductList(category, dataSource, listElement);

// Lancer l’affichage des produits
myList.init();
