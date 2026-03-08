import "dotenv/config";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Token inexistant ou invalide" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.id, email: decodedToken.email };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentification échouée" });
  }
};

export default authenticate;
