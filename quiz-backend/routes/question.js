import express from "express";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import modelQuestion from "../prisma/CRUD/question.js";
import authenticate from "../middleware/authenticateToken.js";
import prisma from "../prisma/client.js";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Trop de requêtes, réessayez dans 15 minutes." },
});

const questionRouter = express.Router();

const questionSchema = z.object({
  question_title: z.string().min(1, "Titre requis"),
  question_level: z.enum(["facile", "intermediaire", "difficile"], {
    errorMap: () => ({ message: "Niveau invalide" }),
  }),
  question_duration: z.number().int().positive("Durée invalide"),
  module_id: z.number().int().positive("module_id invalide"),
});

const randomSchema = z.object({
  module: z.string().min(1, "module requis"),
  level: z.enum(["facile", "intermediaire", "difficile"], {
    errorMap: () => ({ message: "Niveau invalide" }),
  }),
});

questionRouter.post("/", authenticate, async (req, res) => {
  try {
    const validated = questionSchema.safeParse(req.body);
    if (!validated.success) {
      return res
        .status(400)
        .json({ errors: validated.error.flatten().fieldErrors });
    }
    const question = await modelQuestion.createQuestion(validated.data);
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la question." });
  }
});

questionRouter.get("/random-50", apiLimiter, authenticate, async (req, res) => {
  try {
    const validated = randomSchema.safeParse(req.query);
    if (!validated.success) {
      return res
        .status(400)
        .json({ errors: validated.error.flatten().fieldErrors });
    }
    const { module, level } = validated.data;
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

export default questionRouter;
