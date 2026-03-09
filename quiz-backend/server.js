import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import questionRouter from "./routes/question.js";
import answerRouter from "./routes/answer.js";
import achievementRouter from "./routes/achievment.js";
import quizSessionRouter from "./routes/quizSession.js";
import moduleRouter from "./routes/module.js";

const app = express();

app.use(helmet());
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cookieParser());

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/users", userRouter);
app.use("/question", questionRouter);
app.use("/answer", answerRouter);
app.use("/achievment", achievementRouter);
app.use("/quiz-session", quizSessionRouter);
app.use("/module", moduleRouter);

app.set("port", process.env.PORT || 5500);

app.listen(app.get("port"), () => {
  console.log(
    `Le serveur est en cours d'exécution sur le port ${app.get("port")}`,
  );
});
