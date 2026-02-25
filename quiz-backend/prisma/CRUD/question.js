import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function createQuestion(moduleId, data) {
  try {
    return await prisma.question.create({
      data: {
        ...data,
        module: { connect: { id: moduleId } },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getQuestionById(questionId) {
  try {
    return await prisma.question.findUnique({ where: { id: questionId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function updateQuestion(questionId, data) {
  try {
    return await prisma.question.update({ where: { id: questionId }, data });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteQuestion(questionId) {
  try {
    return await prisma.question.delete({ where: { id: questionId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getQuestionsByModuleAndLevel(moduleTitle, questionLevel) {
  try {
    const module = await prisma.module.findUnique({
      where: { module_title: moduleTitle },
    });
    if (!module) {
      throw new Error("Module not found");
    }
    return await prisma.question.findMany({
      where: { question_level: questionLevel, module_id: module.id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default {
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByModuleAndLevel,
};
