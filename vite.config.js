import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // dossier source de Vite
  build: {
    outDir: "../dist", // build final à la racine dans dist
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        // Supprime ou commente les lignes si les fichiers n'existent pas
        // cart: resolve(__dirname, "src/cart/index.html"),
        // checkout: resolve(__dirname, "src/checkout/index.html"),
        // product_listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
