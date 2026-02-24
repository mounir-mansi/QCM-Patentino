const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// POST /quiz-session/start
router.post("/start", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId requis" });
    }

    // 1️⃣ Sélection aléatoire de 50 questions (MySQL → RAND())
    const questions = await prisma.$queryRawUnsafe(`
      SELECT * FROM Question ORDER BY RAND() LIMIT 50;
    `);

    // 2️⃣ Extraire les IDs des questions
    const questionIds = questions.map((q) => q.id);

    // 3️⃣ Créer la session
    const session = await prisma.quizSession.create({
      data: {
        user_id: userId,
        questionIds,
        wrongAnswerIds: [],
        score: 0,
        totalQuestions: 50,
      },
    });

    // 4️⃣ Retourner la session + les questions tirées
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
