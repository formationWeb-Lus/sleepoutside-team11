import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // dossier racine contenant index.html

  base: "/", // base URL pour Render (si le site est sur un sous-dossier, mettre '/nom-sous-dossier/')

  build: {
    outDir: "../dist", // dossier de sortie après build
    emptyOutDir: true, // vide dist à chaque build
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
      },
      output: {
        // Conserve les assets dans des sous-dossiers pour images, JSON et JS
        assetFileNames: (assetInfo) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(assetInfo.name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.css$/.test(assetInfo.name)) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (/\.json$/.test(assetInfo.name)) {
            return "json/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },

  server: {
    port: 5500, // port local
  },
});
