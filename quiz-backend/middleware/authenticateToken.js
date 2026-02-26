import "dotenv/config";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  console.log("Middleware authenticateToken déclenché");
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token inexistant ou invalide" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.id, email: decodedToken.email };
    console.log(req.userData);
    next();
  } catch (error) {
    console.error("Erreur auth:", error);
    res.status(401).json({ message: "Authentification échouée" });
  }
};

export default authenticate;
