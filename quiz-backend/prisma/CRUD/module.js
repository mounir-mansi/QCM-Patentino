import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllModules() {
  try {
    return await prisma.module.findMany();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createModule(data) {
  try {
    return await prisma.module.create({ data });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getModuleById(moduleId) {
  try {
    return await prisma.module.findUnique({ where: { id: moduleId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateModule(moduleId, data) {
  try {
    return await prisma.module.update({ where: { id: moduleId }, data });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteModule(moduleId) {
  try {
    return await prisma.module.delete({ where: { id: moduleId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  getAllModules,
  createModule,
  getModuleById,
  updateModule,
  deleteModule,
};
