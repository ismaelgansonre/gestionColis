require("dotenv").config(); // Pour charger les variables d'environnement
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json()); // Remplace bodyParser qui est maintenant inclus dans Express

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err.message);
    process.exit(1); // Arrêtez l'application si la base de données ne peut pas se connecter
  }
  console.log("MySQL Connected...");
});

// Route pour ajouter un colis
app.post("/add-colis", (req, res) => {
  const colis = req.body;
  const sql = "INSERT INTO colis SET ?";
  db.query(sql, colis, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du colis:", err);
      return res.status(500).json({ error: "Erreur lors de l'ajout du colis" });
    }
    res
      .status(201)
      .json({ message: "Colis ajouté avec succès", colisId: result.insertId });
  });
});

// Route pour récupérer la liste des colis
app.get("/list-colis", (req, res) => {
  const sql = "SELECT * FROM colis";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des colis:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des colis" });
    }
    res.json(results);
  });
});

// Route pour mettre à jour un colis
app.put("/update-colis/:id", (req, res) => {
  const colisId = req.params.id;
  const updatedColis = req.body;

  const sql = "UPDATE colis SET ? WHERE id = ?";
  db.query(sql, [updatedColis, colisId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du colis:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour du colis" });
    }
    res.json({ message: "Colis mis à jour avec succès" });
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
