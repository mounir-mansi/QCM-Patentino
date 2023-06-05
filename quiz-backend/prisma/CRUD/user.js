const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Créer un nouvel utilisateur
async function createUser(data) {
  try {
    return await prisma.user.create({ data });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Obtenir un utilisateur par ID
async function getUserById(userId) {
  try {
    return await prisma.user.findUnique({ where: { id: userId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Mettre à jour un utilisateur
async function updateUser(userId, data) {
  try {
    return await prisma.user.update({ where: { id: userId }, data });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Supprimer un utilisateur
async function deleteUser(userId) {
  try {
    return await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
