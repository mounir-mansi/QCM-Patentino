import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import QuestionCard from "@/components/QuestionCard";

const Game = () => {
  const { query } = useRouter();
  const [questions, setQuestions] = useState<any[]>([]); // État pour stocker les questions

  useEffect(() => {
    // Récupère les données des questions depuis localStorage
    const questionsData = localStorage.getItem("questions");

    if (questionsData) {
      setQuestions(JSON.parse(questionsData)); // Met à jour l'état des questions avec les données récupérées
    }
  }, []);

  const currentQuestionIndex = 0; // Remplacez cette valeur par l'index de la question en cours
if (questions.length > 0) {
  return (
    <div className="bg-beige">
      <Menu />
      <QuestionCard currentQuestionIndex={currentQuestionIndex} questions={questions} />
      <PiedDePage />
    </div>
  );}
};

export default Game;
