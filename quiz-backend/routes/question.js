const authenticate = require("../middleware/authenticateToken");
const modelQuestion = require("../prisma/CRUD/question");
const express = require("express");

const questionRouter = express.Router();

// Créer une question
questionRouter.post("/", async (req, res) => {
  try {
    const { question_title, question_level, question_duration, module_id } =
      req.body;

    const question = await modelQuestion.createQuestion({
      question_title,
      question_level,
      question_duration,
      module_id,
    });

    console.log(question);
    res.json(question);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la question." });
  }
});

// Récupérer 50 questions aléatoires d’un module et niveau
questionRouter.get("/random-50", authenticate, async (req, res) => {
  try {
    const { module, level, excludedIds } = req.query;
    // excludedIds est une liste d'IDs de questions déjà posées

    // Convertir excludedIds en tableau d'entiers si nécessaire
    let exclude = [];
    if (excludedIds) {
      exclude = excludedIds.split(",").map((id) => parseInt(id));
    }

    // Récupérer toutes les questions correspondantes
    let questions = await modelQuestion.getQuestionsByModuleAndLevel(
      module,
      level
    );

    // Filtrer celles déjà passées
    questions = questions.filter((q) => !exclude.includes(q.id));

    // Mélanger aléatoirement
    questions.sort(() => Math.random() - 0.5);

    // Limiter à 50
    const selectedQuestions = questions.slice(0, 50);

    res.json(selectedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la génération du quiz." });
  }
});

module.exports = questionRouter;
