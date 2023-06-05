const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Question = {
  module: (parent) => {
    return prisma.question.findUnique({ where: { id: parent.id } }).module();
  },
  answers: (parent) => {
    return prisma.question.findUnique({ where: { id: parent.id } }).answers();
  },
};

module.exports = Question;
