// const jwt = require("jsonwebtoken");
// const authenticate = (req, res, next) => {
//   try {
//     // Récupérer le jeton JWT du header Authorization
//     const token = req.headers.authorization.split(" ")[1];
//     // Vérifier et décoder le jeton JWT
//     const decodedToken = jwt.verify(token, "your-secret-key");
//     // Ajouter les informations utilisateur au corps de la requête
//     req.userData = { userId: decodedToken.userId };
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Authentification échouée" });
//   }
// };

// module.exports = authenticate;

// correction mounir //
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  console.log("Middleware authenticateToken déclenché");
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader); // undefined
    // Vérification si le header existe
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token inexistant ou invalide" });
    }

    // Extraire le token
    const token = authHeader.split(" ")[1];

    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, "your-secret-key");

    // Ajouter infos utilisateur à la requête
    req.userData = { userId: decodedToken.id, email: decodedToken.email };
    console.log(req.userData); // <-- c'est ici que tu aurais dû voir les infos
    console.log(req.user); // => undefined, si tu logues req.user, c’est normal
    next();
  } catch (error) {
    console.error("Erreur auth:", error);
    res.status(401).json({ message: "Authentification échouée" });
  }
};

module.exports = authenticate;
