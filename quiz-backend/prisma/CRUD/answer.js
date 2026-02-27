import prisma from "../client.js";

async function createAnswer(questionId, data) {
  try {
    return await prisma.answer.create({
      data: {
        ...data,
        question: { connect: { id: questionId } },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateAnswer(answerId, data) {
  try {
    return await prisma.answer.update({ where: { id: answerId }, data });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteAnswer(answerId) {
  try {
    return await prisma.answer.delete({ where: { id: answerId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAnswersByQuestionId(questionId) {
  try {
    return await prisma.answer.findMany({
      where: { question_id: parseInt(questionId) },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getSelectedAnswer(selectedAnswerId) {
  try {
    return await prisma.answer.findFirst({
      where: { id: parseInt(selectedAnswerId) },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswersByQuestionId,
  getSelectedAnswer,
};
