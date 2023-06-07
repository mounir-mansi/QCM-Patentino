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

// Créer un nouvel utilisateur
async function findUserByEmail(data) {
  try {
    return await prisma.user.findUnique({ where: { email }, data });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Fonction pour comparer les mots de passe
async function comparePasswords(email, password) {
  try {
    // Recherchez l'utilisateur par ID
    const user = await findUserByEmail({ email });

    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    // Comparez les mots de passe
    if (user.password === password) {
      return true; // Le mot de passe correspond
    } else {
      return false; // Le mot de passe ne correspond pas
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la comparaison des mots de passe :",
      error
    );
    throw error;
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
  findUserByEmail,
  comparePasswords,
  getUserById,
  updateUser,
  deleteUser,
};
