const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Answer = {
  question: (parent) => {
    return prisma.answer.findUnique({ where: { id: parent.id } }).question();
  },
};

module.exports = Answer;
