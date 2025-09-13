import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alerts from "./alerts.mjs";

// Produits
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);
productList.init();

// Alertes
const alerts = new Alerts("./public/json/alerts.json", "#alerts");
alerts.init();
