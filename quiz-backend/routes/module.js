import express from "express";
import { z } from "zod";
import moduleModel from "../prisma/CRUD/module.js";

const moduleRouter = express.Router();

const idSchema = z.number().int().positive();

moduleRouter.get("/", async (req, res) => {
  try {
    const modules = await moduleModel.getAllModules();
    res.json(modules);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des modules." });
  }
});

moduleRouter.get("/:id", async (req, res) => {
  try {
    const moduleId = idSchema.safeParse(parseInt(req.params.id));
    if (!moduleId.success) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const module = await moduleModel.getModuleById(moduleId.data);
    if (!module) {
      return res.status(404).json({ message: "Module non trouvé" });
    }
    res.json(module);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du module." });
  }
});

export default moduleRouter;
