import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticate from "../middleware/authenticateToken.js";

const prisma = new PrismaClient();
const questionRouter = express.Router();

questionRouter.post("/", async (req, res) => {
  try {
    const { question_title, question_level, question_duration, module_id } =
      req.body;
    const question = await prisma.question.create({
      data: { question_title, question_level, question_duration, module_id },
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

questionRouter.get("/", authenticate, async (req, res) => {
  try {
    const { module, level } = req.query;
    let questions = await prisma.question.findMany({
      where: {
        module: { module_title: module },
        question_level: level,
      },
      include: { Answer: true },
    });
    questions = questions.sort(() => Math.random() - 0.5).slice(0, 50);
    questions = questions.map((q) => ({
      ...q,
      Answer: q.Answer.sort(() => Math.random() - 0.5),
    }));
    res.json(questions);
  } catch (error) {
    console.error("Erreur récupération questions:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des questions." });
  }
});

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

export default questionRouter;
