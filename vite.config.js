import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "cart/index.html"),
        checkout: resolve(__dirname, "checkout/index.html"),
        product_listing: resolve(__dirname, "product_listing/index.html"),
      },
    },
  },
});
