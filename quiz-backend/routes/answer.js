import express from "express";
import { z } from "zod";
import modelAnswer from "../prisma/CRUD/answer.js";
import authenticate from "../middleware/authenticateToken.js";

const answerRouter = express.Router();

const answerSchema = z.object({
  questionId: z.number({ required_error: "questionId requis" }),
  selectedOption: z.string().min(1, "selectedOption requis"),
});

answerRouter.post("/", authenticate, async (req, res) => {
  try {
    const validated = answerSchema.safeParse(req.body);
    if (!validated.success) {
      return res
        .status(400)
        .json({ errors: validated.error.flatten().fieldErrors });
    }
    const { questionId, selectedOption } = validated.data;
    const answer = await modelAnswer.createAnswer({
      questionId,
      selectedOption,
    });
    res.status(201).json(answer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la réponse." });
  }
});

answerRouter.get("/question/:id", authenticate, async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);
    if (isNaN(questionId)) {
      return res.status(400).json({ message: "ID invalide." });
    }
    const answers = await modelAnswer.getAnswersByQuestionId(questionId);
    if (!answers || answers.length === 0) {
      return res.status(404).json({ message: "Aucune réponse trouvée." });
    }
    res.json(answers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des réponses." });
  }
});

answerRouter.get("/:id", authenticate, async (req, res) => {
  try {
    const answerId = parseInt(req.params.id);
    if (isNaN(answerId)) {
      return res.status(400).json({ message: "ID invalide." });
    }
    const answer = await modelAnswer.getSelectedAnswer(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Réponse introuvable." });
    }
    res.json(answer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la réponse." });
  }
});

export default answerRouter;
