import express from "express";
import { PrismaClient } from "@prisma/client";

import "dotenv/config";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const moduleRouter = express.Router();

moduleRouter.get("/", async (req, res) => {
  res.status(200).json({ msg: "success" });
});

moduleRouter.get("/:id", async (req, res) => {
  try {
    const moduleId = req.params.id;
    const module = await prisma.module.findFirst({
      where: {
        id: parseInt(moduleId),
      },
    });
    res.json(module);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du module." });
  }
});

export default moduleRouter;
