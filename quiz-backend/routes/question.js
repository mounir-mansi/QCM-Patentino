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
    const { module, level } = req.query;

    const questions = await modelQuestion.getQuestionsByModuleAndLevel(
      module,
      level
    );

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "Aucune question trouvée." });
    }

    // Mélanger et prendre 50 questions
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const random50 = shuffled.slice(0, 50);

    res.json(random50);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des questions." });
  }
});

// Récupérer toutes les questions d'un module et niveau (toutes)
questionRouter.get("/", authenticate, async (req, res) => {
  try {
    const { module, level } = req.query;

    const questions = await modelQuestion.getQuestionsByModuleAndLevel(
      module,
      level
    );

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la génération du quiz." });
  }
});

// Récupérer une question par ID
questionRouter.get("/:id", async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);

    const question = await modelQuestion.getQuestionById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question non trouvée." });
    }

    res.json(question);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la question." });
  }
});

module.exports = questionRouter;
