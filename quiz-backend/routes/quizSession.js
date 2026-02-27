import express from "express";
import { z } from "zod";
import prisma from "../prisma/client.js";
import authenticate from "../middleware/authenticateToken.js";

const router = express.Router();

const startSchema = z.object({
  userId: z.number().int().positive("userId invalide"),
});

router.post("/start", authenticate, async (req, res) => {
  try {
    const validated = startSchema.safeParse(req.body);
    if (!validated.success) {
      return res
        .status(400)
        .json({ errors: validated.error.flatten().fieldErrors });
    }
    const { userId } = validated.data;

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
