const express = require("express");
const achievementRouter = express.Router();
const achievementModel = require("../prisma/CRUD/achievement");

// Créer une nouvelle réalisation (achievement)
achievementRouter.post("/", async (req, res) => {
  try {
    const { moduleId, userId, data } = req.body;
    const achievement = await achievementModel.createAchievement(
      moduleId,
      userId,
      data
    );
    res.json(achievement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la réalisation." });
  }
});

// Obtenir une réalisation (achievement) par ID
achievementRouter.get("/:id", async (req, res) => {
  try {
    const achievementId = req.params.id;
    const achievement = await achievementModel.getAchievementById(
      achievementId
    );
    res.json(achievement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la réalisation." });
  }
});

// Mettre à jour une réalisation (achievement)
achievementRouter.put("/:id", async (req, res) => {
  try {
    const achievementId = req.params.id;
    const data = req.body;
    const updatedAchievement = await achievementModel.updateAchievement(
      achievementId,
      data
    );
    res.json(updatedAchievement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la réalisation." });
  }
});

// Supprimer une réalisation (achievement)
achievementRouter.delete("/:id", async (req, res) => {
  try {
    const achievementId = req.params.id;
    await achievementModel.deleteAchievement(achievementId);
    res.json({ message: "Réalisation supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la réalisation." });
  }
});

// Récupérer toutes les réalisations (achievements) d'un utilisateur
achievementRouter.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const achievements = await achievementModel.getAchievementsByUserId(userId);
    res.json(achievements);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des réalisations." });
  }
});

module.exports = achievementRouter;
