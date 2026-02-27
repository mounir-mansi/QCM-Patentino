import prisma from "../client.js";

async function createAchievement(moduleId, userId, score, level, success) {
  try {
    return await prisma.achievment.create({
      data: {
        module: { connect: { id: moduleId } },
        user: { connect: { id: userId } },
        score: parseInt(score),
        level: level,
        success: success,
        date: new Date(),
        total_duration: 0,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAchievementById(achievementId) {
  try {
    return await prisma.achievment.findUnique({ where: { id: achievementId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateAchievement(achievementId, data) {
  try {
    return await prisma.achievment.update({
      where: { id: achievementId },
      data,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteAchievement(achievementId) {
  try {
    return await prisma.achievment.delete({ where: { id: achievementId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAchievementsByUserId(userId) {
  try {
    return await prisma.achievment.findMany({
      include: { module: { select: { module_title: true } } },
      where: { user_id: userId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  createAchievement,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  getAchievementsByUserId,
};
