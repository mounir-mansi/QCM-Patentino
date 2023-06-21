import React, { useEffect, useState } from "react";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import QuestionCard from "@/components/QuestionCard";
import AnimatedBackground from "@/components/Background";
import router from "next/router";

const Game = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentScoreData, setCurrentScoreData] = useState(0);

  useEffect(() => {
    const questionsData = localStorage.getItem("questions");

    if (questionsData) {
      setQuestions(JSON.parse(questionsData));
    }

    localStorage.setItem("currentScore", `${currentScoreData}`);
  }, [currentScoreData]);

  const handleSubmit = async (selectedAnswerId: number) => {
    try {
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
      // Toutes les questions ont été répondues, rediriger vers "/endscore"
      // Effectuez ici votre logique de redirection vers "/endscore"
    }
  }, [currentQuestionIndex, questions.length]);

  if (questions.length > 0) {
    if (currentQuestionIndex < questions.length) {
      return (
        <div>
          <Menu />
          <QuestionCard
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            onSubmit={handleSubmit}
          />
          <AnimatedBackground />
          <PiedDePage />
        </div>
      );
    } else {
      try {
        const finalScore = localStorage.getItem("currentScore");
        let userId = localStorage.getItem("user");
        if(userId){
          userId= JSON.parse(userId)
        }
        const moduleData = localStorage.getItem("questions");
        let moduleId = null;
        let levelModule = "";
        if (moduleData && typeof moduleData === "string") {
          const moduleObj = JSON.parse(moduleData);
          console.log(moduleObj)
          moduleId = moduleObj[0].module_id;
          levelModule = moduleObj[0].question_level;
          console.log(levelModule);
        }

        let success = false;

        if (currentScoreData / questions.length > 0.5) {
          success = true;
        } else {
          success = false;
        }

        const res = fetch(`/api/achievment/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            moduleId: moduleId,
            userId: userId,
            finalScore: finalScore,
            levelModule: levelModule,
            success: success,
          }),
        });
        console.log(res);
        // if (res.ok) {
        //   router.push('/endscore')
        // } else {
        //   throw new Error("Error during user signup.");
        // }
      } catch (error) {
        console.error(error);
        // Gérer l'erreur de manière appropriée (affichage d'un message d'erreur, etc.)
      }
      // Effectuez ici vos opérations asynchrones, comme l'appel à l'API

      return (
        <div>
          <Menu />
          <h1>Score total: {currentScoreData}/{questions.length}</h1>
          <AnimatedBackground />
          <PiedDePage />
        </div>
      );
      // } catch (error) {
      //   console.error(error);
      // }
    }
  } else {
    return null; // Vous pouvez également afficher un message de chargement ou une indication que les questions sont en cours de chargement
  }
};

export default Game;
