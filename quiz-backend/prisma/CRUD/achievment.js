const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Créer une nouvelle réalisation (achievement)
async function createAchievement(moduleId, userId, score, level, success) {
  try {
    return await prisma.achievment.create({
      data: {
        module: {
          connect: { id: moduleId },
        },
        user: {
          connect: { id: userId },
        },
        score: parseInt(score),
        level: level,
        success: success,
        date: new Date(), // Utilisez la date actuelle ou la valeur souhaitée
        total_duration: 0, // Utilisez la valeur souhaitée
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Obtenir une réalisation (achievement) par ID
async function getAchievementById(achievementId) {
  try {
    return await prisma.achievment.findUnique({
      where: { id: achievementId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Mettre à jour une réalisation (achievement)
async function updateAchievement(achievementId, data) {
  try {
    return await prisma.achievment.update({
      where: { id: achievementId },
      data,
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Supprimer une réalisation (achievement)
async function deleteAchievement(achievementId) {
  try {
    return await prisma.achievment.delete({ where: { id: achievementId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer toutes les réalisations (achievements) d'un utilisateur
async function getAchievementsByUserId(userId) {
  try {
    return await prisma.achievment.findMany({ where: { user_id: userId } });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  createAchievement,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  getAchievementsByUserId,
};
