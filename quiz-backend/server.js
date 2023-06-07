const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");

// Créer une instance du routeur Express
const app = express();

app.use(bodyParser.json());
app.use("/users", userRouter);

// Configuration de l'application Express

app.set("port", process.env.PORT || 5500);

// ... Reste de votre code ...
// Démarrer le serveur
app.listen(app.get("port"), () => {
  console.log(
    `Le serveur est en cours d'exécution sur le port ${app.get("port")}`
  );
});
