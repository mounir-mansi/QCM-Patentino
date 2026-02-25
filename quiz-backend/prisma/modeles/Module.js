import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Module = {
  questions: (parent) => {
    return prisma.module.findUnique({ where: { id: parent.id } }).questions();
  },
  achievements: (parent) => {
    return prisma.module
      .findUnique({ where: { id: parent.id } })
      .achievements();
  },
};

export default Module;
