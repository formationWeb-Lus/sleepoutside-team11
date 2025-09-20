// server.js
import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Servir le contenu statique du build Vite
app.use(express.static(path.resolve("./dist")));

// Rediriger toutes les routes vers index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
