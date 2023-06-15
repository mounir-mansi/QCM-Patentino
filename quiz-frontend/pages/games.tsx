import React, { useEffect, useState } from "react";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import QuestionCard from "@/components/QuestionCard";
import AnimatedBackground from "@/components/Background";

const Game = () => {
  const [questions, setQuestions] = useState<any[]>([]); // État pour stocker les questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentScoreData, setCurrentScoreData] = useState(0);


  useEffect(() => {
    // Récupère les données des questions depuis localStorage
    const questionsData = localStorage.getItem("questions");

    if (questionsData) {
      setQuestions(JSON.parse(questionsData)); // Met à jour l'état des questions avec les données récupérées
    }
    localStorage.setItem("currentScore",`${currentScoreData}`);


    
  }, [currentScoreData]);


  const handleSubmit = async (selectedAnswerId: number) => {
    
    //Mettre en parametre selectedAnswerId (number) et le comparer avec la bonne valeur pour vérifier si la réponse est bonne ou pas (faire une requete API).
    try {
      const url = `/api/answer/${selectedAnswerId}`;
      const response = await fetch(url);
      const answer = await response.json();
      console.log(answer.result_answer);
      if (answer.result_answer==true) {
        setCurrentScoreData(currentScoreData+1) ;
      };
      console.log(currentScoreData);
    } catch (error) {
      console.error(error);
    } finally {
      setCurrentQuestionIndex(currentQuestionIndex+1)
    }
  };
  

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
