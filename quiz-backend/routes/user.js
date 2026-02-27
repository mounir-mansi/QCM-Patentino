import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import modelUser from "../prisma/CRUD/user.js";

const userRouter = express.Router();

const signupSchema = z.object({
  firstname: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await modelUser.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    const validated = signupSchema.safeParse(req.body);
    if (!validated.success) {
      return res
        .status(400)
        .json({ errors: validated.error.flatten().fieldErrors });
    }
    const existingUser = await modelUser.findUserByEmail(validated.data.email);
    if (existingUser) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }
    const user = await modelUser.createUser(validated.data);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const validated = loginSchema.safeParse(req.body);
    if (!validated.success) {
      return res
        .status(400)
        .json({ errors: validated.error.flatten().fieldErrors });
    }
    const { email, password } = validated.data;
    const compare = await modelUser.comparePasswords(email, password);

    function generateToken(user) {
      const payload = { id: user.id, email: user.email };
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    }

    if (compare === true) {
      const user = await modelUser.findUserByEmail(email);
      if (user) {
        const { id, email, firstname, lastname } = user;
        res.json({
          token: generateToken(user),
          user: id,
          email,
          firstname,
          lastname,
        });
      } else {
        res.status(404).json({ message: "Utilisateur introuvable" });
      }
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur de login.", error });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID invalide." });
    }
    const user = await modelUser.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'utilisateur." });
  }
});

export default userRouter;
