// const express = require("express");
// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Token d'authentification manquant" });
//   }

//   jwt.verify(token, "l4Qu1z1n3!", (err, user) => {
//     if (err) {
//       return res
//         .status(403)
//         .json({ message: "Token d'authentification invalide" });
//     }

//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;

// authenticateToken.js

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Vérifier la présence du token dans l'en-tête de la requête
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, "your_secret_key");

    // Ajouter les données décodées à l'objet de requête
    req.user = decoded;

    // Passer au prochain middleware
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalide" });
  }
};

module.exports = authenticateToken;
