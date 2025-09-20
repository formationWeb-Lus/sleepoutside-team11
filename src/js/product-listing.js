import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Récupérer la catégorie depuis l'URL (?category=...)
const category = getParam('category') || 'tents';

// Modifier le titre de la page
document.getElementById('category-title').textContent = `Top Products: ${category}`;

// Créer la source de données
const dataSource = new ProductData();

// Sélectionner la liste UL
const listElement = document.querySelector('.product-list');

// Créer l’instance ProductList
const myList = new ProductList(category, dataSource, listElement);

// Afficher les produits
myList.init();

