import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function createModule(data) {
  try {
    return await prisma.module.create({ data });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getModuleById(moduleId) {
  try {
    return await prisma.module.findUnique({ where: { id: moduleId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function updateModule(moduleId, data) {
  try {
    return await prisma.module.update({ where: { id: moduleId }, data });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteModule(moduleId) {
  try {
    return await prisma.module.delete({ where: { id: moduleId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default {
  createModule,
  getModuleById,
  updateModule,
  deleteModule,
};
