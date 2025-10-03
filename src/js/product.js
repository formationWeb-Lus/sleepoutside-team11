import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./Productdetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productID = getParam("product"); // ?product=344YJ dans l'URL

const product = new ProductDetails(productID, dataSource);
product.init();
