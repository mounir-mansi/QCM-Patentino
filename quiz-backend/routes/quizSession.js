import express from "express";
import { PrismaClient } from "@prisma/client";

import "dotenv/config";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const router = express.Router();
router.post("/start", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId requis" });
    }

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

export default router;
