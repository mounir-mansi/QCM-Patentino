const modelAnswer = require("../prisma/CRUD/answer");
const express = require("express");

const answerRouter = express.Router();

answerRouter.post("/", async (req, res) => {
  try {
    const { questionId, selectedOption } = req.body;
    const answer = await modelAnswer.createAnswer({
      questionId: questionId,
      selectedOption: selectedOption,
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
    const questionId = req.params.id;
    console.log(questionId);
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
    const answerId = req.params.id;
    console.log(answerId);
    const answer = await modelAnswer.getSelectedAnswer(answerId);
    res.json(answer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la réponse." });
  }
});

module.exports = answerRouter;
