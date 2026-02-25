import express from "express";
import achievementModel from "../prisma/CRUD/achievment.js";

const achievementRouter = express.Router();

achievementRouter.post("/", async (req, res) => {
  try {
    const { moduleId, userId, finalScore, levelModule, success } = req.body;
    console.log(userId);
    const achievement = await achievementModel.createAchievement(
      moduleId,
      userId,
      finalScore,
      levelModule,
      success,
    );
    res.json(achievement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la réalisation." });
  }
});

achievementRouter.get("/:id", async (req, res) => {
  try {
    const achievementId = req.params.id;
    const achievement =
      await achievementModel.getAchievementById(achievementId);
    res.json(achievement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la réalisation." });
  }
});

achievementRouter.put("/:id", async (req, res) => {
  try {
    const achievementId = req.params.id;
    const data = req.body;
    const updatedAchievement = await achievementModel.updateAchievement(
      achievementId,
      data,
    );
    res.json(updatedAchievement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la réalisation." });
  }
});

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

achievementRouter.get("/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log(req.params);
    const achievements = await achievementModel.getAchievementsByUserId(userId);
    res.json(achievements);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des réalisations." });
  }
});

export default achievementRouter;
