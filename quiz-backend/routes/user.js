import express from "express";
import jwt from "jsonwebtoken";
import modelUser from "../prisma/CRUD/user.js";

const userRouter = express.Router();

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
    const { firstname, lastname, email, password } = req.body;
    const user = await modelUser.createUser({
      firstname,
      lastname,
      email,
      password,
    });
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    const compare = await modelUser.comparePasswords(email, password);

    function generateToken(user) {
      const payload = { id: user.id, email: user.email };
      return jwt.sign(payload, "your-secret-key", { expiresIn: "1h" });
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
      res.status(500).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur de login.", error });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await modelUser.getUserById(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
});

export default userRouter;
