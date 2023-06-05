const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Achievement = {
  module: (parent) => {
    return prisma.achievement.findUnique({ where: { id: parent.id } }).module();
  },
  user: (parent) => {
    return prisma.achievement.findUnique({ where: { id: parent.id } }).user();
  },
};

module.exports = Achievement;
