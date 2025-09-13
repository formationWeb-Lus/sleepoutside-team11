import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // dossier racine de ton projet

  build: {
    outDir: "../dist", // dossier de sortie après build
    emptyOutDir: true, // vide dist à chaque build
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },

  server: {
    port: 5500, // port local
  },
});

