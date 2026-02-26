import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function createUser(data) {
  try {
    const hashedPassword = await argon2.hash(data.password);
    return await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function comparePasswords(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }
    return await argon2.verify(user.password, password);
  } catch (error) {
    console.error("Erreur lors de la comparaison des mots de passe :", error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    return await prisma.user.findUnique({ where: { id: userId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateUser(userId, data) {
  try {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    return await prisma.user.update({ where: { id: userId }, data });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    return await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllUsers() {
  return prisma.user.findMany();
}

export default {
  createUser,
  findUserByEmail,
  comparePasswords,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
