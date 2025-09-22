const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/candidatures", require("./routes/candidatures"));
app.use("/contact", require("./routes/contact"));

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Serveur sur http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ Erreur MongoDB:", err));
