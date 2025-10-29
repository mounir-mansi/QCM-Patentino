const authenticate = require("../middleware/authenticateToken");
const { PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();
const questionRouter = express.Router();

/**
 * Créer une question
 */
questionRouter.post("/", async (req, res) => {
  try {
    const { question_title, question_level, question_duration, module_id } =
      req.body;

    const question = await prisma.question.create({
      data: {
        question_title,
        question_level,
        question_duration,
        module_id,
      },
      include: { Answer: true },
    });

    res.json(question);
  } catch (error) {
    console.error("Erreur création question:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la question." });
  }
});

/**
 * Récupérer les questions d'un module et niveau, mélangées, limitées à 50
 */
questionRouter.get("/", authenticate, async (req, res) => {
  try {
    const { module, level } = req.query;

    // Récupérer toutes les questions filtrées
    let questions = await prisma.question.findMany({
      where: {
        module: { module_title: module },
        question_level: level,
      },
      include: { Answer: true },
    });

    // Mélanger les questions
    questions = questions.sort(() => Math.random() - 0.5);

    // Limiter à 50 questions
    questions = questions.slice(0, 50);

    // Mélanger les réponses de chaque question
    questions = questions.map((q) => {
      const shuffledAnswers = q.Answer.sort(() => Math.random() - 0.5);
      return { ...q, Answer: shuffledAnswers };
    });

    res.json(questions);
  } catch (error) {
    console.error("Erreur récupération questions:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des questions." });
  }
});

/**
 * Récupérer une question par ID
 */
questionRouter.get("/:id", async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);

    const question = await prisma.question.findFirst({
      where: { id: questionId },
      include: { Answer: true },
    });

    if (!question) {
      return res.status(404).json({ message: "Question non trouvée." });
    }

    res.json(question);
  } catch (error) {
    console.error("Erreur récupération question par ID:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la question." });
  }
});

module.exports = questionRouter;
