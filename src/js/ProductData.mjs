// src/js/ProductData.mjs

// Convertit la réponse fetch en JSON ou lance une erreur
function convertToJson(res) {
  if (res.ok) return res.json();
  else throw new Error("Bad Response: " + res.status);
}

export default class ProductData {
  constructor() {
    // Pas besoin de category ici, on le passe à getData
  }

  /**
   * Récupère les produits d'une catégorie
   * @param {string} category - Nom de la catégorie (en minuscules, ex: 'tents')
   * @returns {Promise<Array>} - Tableau de produits
   */
  async getData(category) {
    try {
      // Normaliser la catégorie en minuscules
      const cat = category.toLowerCase();
      const path = `/json/${cat}.json`;
      const response = await fetch(path);
      const data = await convertToJson(response);

      // Vérifie les différentes structures possibles et retourne un tableau
      if (Array.isArray(data)) return data; // si JSON simple
      if (Array.isArray(data.Result)) return data.Result; // si API Sierra
      if (Array.isArray(data.products)) return data.products; // si clé "products"

      // Sinon on lance une erreur
      throw new Error("Format JSON invalide pour la catégorie : " + category);
    } catch (err) {
      console.error("Erreur dans ProductData.getData:", err);
      throw err;
    }
  }

  /**
   * Recherche un produit par son Id dans toutes les catégories
   * @param {string} id - Id du produit
   * @returns {Promise<Object|null>} - Produit trouvé ou null
   */
  async findProductById(id) {
    const allCategories = ['tents', 'backpacks', 'sleeping-bags'];
    for (const category of allCategories) {
      const products = await this.getData(category);
      const product = products.find(p => p.Id === id);
      if (product) return product;
    }
    return null;
  }
}
