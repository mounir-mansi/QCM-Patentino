import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import QuestionCard from "@/components/QuestionCard";
import AnimatedBackground from "@/components/Background";

const Game = () => {
  const [questions, setQuestions] = useState<any[]>([]); // État pour stocker les questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)


  useEffect(() => {
    // Récupère les données des questions depuis localStorage
    const questionsData = localStorage.getItem("questions");

    if (questionsData) {
      setQuestions(JSON.parse(questionsData)); // Met à jour l'état des questions avec les données récupérées
    }

    const currentScoreData = localStorage.setItem("currentScore","0")

    
  }, []);

  const handleSubmit = () => {
    setCurrentQuestionIndex(currentQuestionIndex+1)
    //Mettre en parametre selectedAnswerId (number) et le comparer avec la bonne valeur pour vérifier si la réponse est bonne ou pas (faire une requete API).
  }

if (questions.length > 0) {
  return (
    <div>
      <Menu />
      <QuestionCard currentQuestionIndex={currentQuestionIndex} questions={questions} onSubmit={handleSubmit}/>
      <AnimatedBackground/>
      <PiedDePage />
    </div>
  );}
};

export default Game;
