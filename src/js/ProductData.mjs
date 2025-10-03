// ProductData.mjs

// Utilise la variable d'environnement VITE_SERVER_URL ou une valeur par défaut
// Assurez-vous que VITE_SERVER_URL est défini dans votre .env
// Exemple: VITE_SERVER_URL=https://wdd330-backend.onrender.com/
const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com";

/**
 * Convertit la réponse fetch en JSON ou lève une erreur si le statut n'est pas OK
 * @param {Response} res
 * @returns {Promise<Object>}
 */
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ProductData {
  constructor() {
    // Constructeur vide pour l'instant
  }

  /**
   * Récupère tous les produits d'une catégorie
   * @param {string} category
   * @returns {Promise<Array>}
   */
  async getData(category) {
    const url = `${baseURL.replace(/\/+$/, "")}/products/search/${category}`;
    console.log("Fetching:", url);

    const response = await fetch(url);
    const data = await convertToJson(response);

    if (!data || !data.Result) {
      throw new Error(`No results for category: ${category}`);
    }

    return data.Result;
  }

  /**
   * Récupère un produit par son ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async findProductById(id) {
    const url = `${baseURL.replace(/\/+$/, "")}/product/${id}`;
    console.log("Fetching:", url);

    const response = await fetch(url);
    const data = await convertToJson(response);

    if (!data || !data.Result) {
      throw new Error(`Product not found for ID: ${id}`);
    }

    console.log("Product found:", data.Result);
    return data.Result;
  }
}
