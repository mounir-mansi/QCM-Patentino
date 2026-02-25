import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Answer = {
  question: (parent) => {
    return prisma.answer.findUnique({ where: { id: parent.id } }).question();
  },
};

export default Answer;
