const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Créer une nouvelle réponse pour une question
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
  } finally {
    await prisma.$disconnect();
  }
}

// Mettre à jour une réponse
async function updateAnswer(answerId, data) {
  try {
    return await prisma.answer.update({ where: { id: answerId }, data });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Supprimer une réponse
async function deleteAnswer(answerId) {
  try {
    return await prisma.answer.delete({ where: { id: answerId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer toutes les réponses d'une question
async function getAnswersByQuestionId(questionId) {
  try {
    return await prisma.answer.findMany({
      where: { question_id: parseInt(questionId) },
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswersByQuestionId,
};
