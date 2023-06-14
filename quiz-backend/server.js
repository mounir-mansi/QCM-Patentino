const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const questionRouter = require("./routes/question");

// Créer une instance du routeur Express
const app = express();

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/question", questionRouter);

// Configuration de l'application Express
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});
app.set("port", process.env.PORT || 5500);

// ... Reste de votre code ...
// Démarrer le serveur
app.listen(app.get("port"), () => {
  console.log(
    `Le serveur est en cours d'exécution sur le port ${app.get("port")}`
  );
});
