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

module.exports = answerRouter;
