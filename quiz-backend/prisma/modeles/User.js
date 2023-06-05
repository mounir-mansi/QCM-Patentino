const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const User = {
  achievements: (parent) => {
    return prisma.user.findUnique({ where: { id: parent.id } }).achievements();
  },
};

module.exports = User;
