const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/start", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId requis" });
    }

    // Tirer 50 questions aléatoires (MySQL → RAND())
    const questions = await prisma.$queryRawUnsafe(`
      SELECT * FROM Question ORDER BY RAND() LIMIT 50;
    `);

    const questionIds = questions.map((q) => q.id);

    const session = await prisma.quizSession.create({
      data: {
        user_id: userId,
        questionIds,
        wrongAnswerIds: [],
        score: 0,
        totalQuestions: 50,
      },
    });

    res.status(201).json({
      sessionId: session.id,
      questions,
    });
  } catch (error) {
    console.error("Erreur création session :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
