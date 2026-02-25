import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const User = {
  achievements: (parent) => {
    return prisma.user.findUnique({ where: { id: parent.id } }).achievements();
  },
};

export default User;
