const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Créer un nouveau module
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

// Obtenir un module par ID
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

// Mettre à jour un module
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

// Supprimer un module
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

module.exports = {
  createModule,
  getModuleById,
  updateModule,
  deleteModule,
};
