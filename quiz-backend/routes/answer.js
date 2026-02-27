import express from "express";
import { z } from "zod";
import modelAnswer from "../prisma/CRUD/answer.js";

const answerRouter = express.Router();

const answerSchema = z.object({
  questionId: z.number({ required_error: "questionId requis" }),
  selectedOption: z.string().min(1, "selectedOption requis"),
});

answerRouter.post("/", async (req, res) => {
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
    res.json(answer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la réponse." });
  }
});

answerRouter.get("/question/:id", async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);
    const answers = await modelAnswer.getAnswersByQuestionId(questionId);
    res.json(answers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des réponses." });
  }
});

answerRouter.get("/:id", async (req, res) => {
  try {
    const answerId = parseInt(req.params.id);
    const answer = await modelAnswer.getSelectedAnswer(answerId);
    res.json(answer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la réponse." });
  }
});

export default answerRouter;
