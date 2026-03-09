import React, { useEffect, useState } from "react";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import QuestionCard from "@/components/QuestionCard";
import AnimatedBackground from "@/components/Background";
import { useRouter } from "next/router";

const Game = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentScoreData, setCurrentScoreData] = useState(0);
  const { query, push } = useRouter();

  useEffect(() => {
    const questionsData = localStorage.getItem("questions");
    if (questionsData) {
      setQuestions(JSON.parse(questionsData));
    }
    localStorage.setItem("currentScore", `${currentScoreData}`);
  }, [currentScoreData]);

  const handleSubmit = async (selectedAnswerId: number | null) => {
  try {
    if (selectedAnswerId === null) {
      // pas de réponse sélectionnée, on passe à la question suivante
      return;
    }
    const url = `/api/answer/${selectedAnswerId}`;
    const response = await fetch(url);
    const answer = await response.json();
    if (answer.result_answer === true) {
      setCurrentScoreData(currentScoreData + 1);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
};

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      // Toutes les questions ont été répondues
    }
  }, [currentQuestionIndex, questions.length]);

  if (questions.length > 0) {
    if (currentQuestionIndex < questions.length) {
      return (
        <div>
          <Menu />
          <AnimatedBackground />
          <div className="flex justify-center my-6 min-content-height">
            <QuestionCard
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
              onSubmit={handleSubmit}
            />
          </div>
          <PiedDePage />
        </div>
      );
    } else {
      try {
        const finalScore = localStorage.getItem("currentScore");
        let userId = localStorage.getItem("user");
        if (userId) {
          userId = JSON.parse(userId);
        }
        const moduleData = localStorage.getItem("questions");
        let moduleId = null;
        let levelModule = "";
        if (moduleData && typeof moduleData === "string") {
          const moduleObj = JSON.parse(moduleData);
          moduleId = moduleObj[0].module_id;
          levelModule = moduleObj[0].question_level;
        }

        const success = currentScoreData / questions.length > 0.5;

        const payload = {
          moduleId: moduleId,
          userId: userId,
          finalScore: parseInt(finalScore ?? "0") / questions.length * 100,
          levelModule: levelModule,
          success: success,
        };

        (async () => {
          try {
            await fetch(`/api/achievment/`, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
          } catch (e) {
            console.error(e);
          }
        })();

        localStorage.setItem("endQuizData", JSON.stringify(payload));

        push("/endscore");
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    return null;
  }
};

export default Game;