const express = require("express");
const router = express.Router();
const multer = require("multer");
const Candidature = require("../models/Candidature");

// Configuration du stockage pour le fichier CV
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ➕ POST: Ajouter une candidature
router.post("/", upload.single("cv"), async (req, res) => {
  try {
    const newCandidature = new Candidature({
      ...req.body,
      cv: req.file ? req.file.filename : null,
    });

    const saved = await newCandidature.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 GET: Toutes les candidatures
router.get("/", async (req, res) => {
  try {
    const candidatures = await Candidature.find().sort({ createdAt: -1 });
    res.json(candidatures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 GET: Une candidature
router.get("/:id", async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id);
    if (!candidature) return res.status(404).json({ error: "Non trouvé" });
    res.json(candidature);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 PUT: Modifier
router.put("/:id", upload.single("cv"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.cv = req.file.filename;

    const updated = await Candidature.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE: Supprimer
router.delete("/:id", async (req, res) => {
  try {
    await Candidature.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
