const modelQuestion = require("../prisma/CRUD/question");
const express = require("express");

const questionRouter = express.Router();

questionRouter.get("/", async (req, res) => {
  res.status(200).json({ msg: "success" });
});

questionRouter.post("/", async (req, res) => {
  try {
    const { question_title, question_level, question_duration } = req.body;
    // Récupérer tous les utilisateurs depuis la base de données avec Prisma
    const question = await modelQuestion.createQuestion({
      question_title: question_title,
      question_level: question_level,
      question_duration: question_duration,
    });
    console.log(question);

    // Envoyer la liste des questions en tant que réponse JSON
    res.json(question);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la question." });
  }
});

questionRouter.get("/newquiz", async (req, res) => {
  try {
    const { question_title, question_level, question_duration } = req.body;
    const question = await modelQuestion.getQuestionsByModuleAndLevel({
      question_title: question_title,
      question_level: question_level,
      question_duration: question_duration,
    });
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la génération du quiz." });
  }
});

questionRouter.get("/:id", async (req, res) => {
  try {
    const questionId = req.params.id;

    // Récupérer tous les questions depuis la base de données avec Prisma
    const question = await prisma.question.findFirst({
      where: {
        id: parseInt(questionId),
      },
    });
    // Envoyer la liste des questions en tant que réponse JSON
    res.json(question);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des questions." });
  }
});

module.exports = questionRouter;
