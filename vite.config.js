import { defineConfig } from "vite";

export default defineConfig({
  root: "src",        // dossier racine contenant index.html
  base: "/sleepoutside-team11/",          // Netlify "/" ou GitHub Pages "/sleepoutside-team11/"
  build: {
    outDir: "../dist",      // dossier de sortie
    emptyOutDir: true,      // vide dist avant build
    rollupOptions: {
      input: "src/index.html",   // une seule entrée
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(assetInfo.name)) return "assets/images/[name]-[hash][extname]";
          if (/\.css$/.test(assetInfo.name)) return "assets/css/[name]-[hash][extname]";
          if (/\.json$/.test(assetInfo.name)) return "json/[name][extname]";
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
  server: {
    port: 5500,
  },
});
