const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  try {
    // Récupérer le jeton JWT du header Authorization
    const token = req.headers.authorization.split(" ")[1];
    // Vérifier et décoder le jeton JWT
    const decodedToken = jwt.verify(token, "your-secret-key");
    // Ajouter les informations utilisateur au corps de la requête
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentification échouée" });
  }
};

module.exports = authenticate;
