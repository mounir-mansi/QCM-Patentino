import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Card } from "flowbite-react";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import AnimatedBackground from "@/components/Background";




const StartQuiz = () => {
  const { query, push } = useRouter();
  const [nbQuestions, setNbQuestions] =useState(0);

  const startQuiz=()=>{
          // Navigue vers la page Game
          push("/games");
  }


  useEffect(() => {
    // Vérifiez si les paramètres module et level sont présents dans la query string
    const loadQuiz = async () => {
      try {
        const url = `/api/question?module=${query.module}&level=${query.level}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const questionsData = await response.json();
        setNbQuestions(questionsData.length);
        // Stocke les données des questions dans localStorage
        localStorage.setItem("questions", JSON.stringify(questionsData));
    

      } catch (error) {
        console.error(error);
      }
    };
    loadQuiz();
  }, [query.module, query.level, push, nbQuestions]);

  return (
    <div>
      <Menu />
      <AnimatedBackground/>

      <div className="grid place-items-center my-6 min-content-height">
          <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Vous allez démarrer le quiz {query.module} niveau {query.level}.
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Ce quiz comporte {nbQuestions} questions.<br/>
              Vous disposez de 30 secondes par question.<br/>
              Etes-vous prêt ?
            </p>

            <Button onClick={startQuiz} color="failure" pill>Démarrer le quiz</Button>

          </Card>
      </div>

      <PiedDePage />
    </div>
  );
}

export default StartQuiz;
