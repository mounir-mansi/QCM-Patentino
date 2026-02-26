import express from "express";
import moduleModel from "../prisma/CRUD/module.js";

const moduleRouter = express.Router();

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
    const moduleId = parseInt(req.params.id);
    const module = await moduleModel.getModuleById(moduleId);
    res.json(module);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du module." });
  }
});

export default moduleRouter;
