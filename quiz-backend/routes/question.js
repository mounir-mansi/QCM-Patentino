const express = require("express");
const questionRouter = express.Router();
const modelQuestion = require("../prisma/CRUD/question");
const authenticate = require("../middleware/authenticateToken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    console.log("Question créée:", question);
    res.json(question);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la question." });
  }
});

questionRouter.get("/random-50", authenticate, async (req, res) => {
  try {
    const { module, level } = req.query;
    const userId = req.userData?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const questions = await modelQuestion.getQuestionsByModuleAndLevel(
      module,
      level,
    );
    console.log("module:", module, "level:", level);
    console.log("questions trouvées:", questions?.length);

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "Aucune question trouvée." });
    }

    const allSessions = await prisma.quizsession.findMany({
      where: { user_id: userId },
    });

    const excludeIds = allSessions.flatMap((s) =>
      JSON.parse(s.questionIds || "[]"),
    );
    const uniqueExcludeIds = [...new Set(excludeIds)];

    let available = questions.filter((q) => !uniqueExcludeIds.includes(q.id));
    console.log("excludeIds count:", uniqueExcludeIds.length);
    console.log("available count:", available.length);

    if (available.length === 0) {
      console.info(
        `Toutes les questions ont été vues, remise à zéro pour ${userId}.`,
      );
      await prisma.quizsession.deleteMany({ where: { user_id: userId } });
      available = [...questions];
    }

    const shuffled = available.sort(() => Math.random() - 0.5);
    const random50 = shuffled.slice(0, 25);

    await prisma.quizsession.create({
      data: {
        user_id: userId,
        questionIds: JSON.stringify(random50.map((q) => q.id)),
        wrongAnswerIds: "[]",
        score: 0,
        totalQuestions: random50.length,
        updatedAt: new Date(),
      },
    });

    res.json(random50);
  } catch (error) {
    console.error("Erreur /random-50 :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des questions." });
  }
});

module.exports = questionRouter;
