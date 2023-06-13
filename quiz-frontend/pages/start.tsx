import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Card } from "flowbite-react";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";



const StartQuiz = () => {
  const { query, push } = useRouter();

  const startQuiz = async () => {
    try {
      const url = `/api/question?module=${query.module}&level=${query.level}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const questionsData = await response.json();
  
      // Stocke les données des questions dans localStorage
      localStorage.setItem("questions", JSON.stringify(questionsData));
  
      // Navigue vers la page Game
      push("/games");
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    // Vérifiez si les paramètres module et level sont présents dans la query string
    if (!query.module || !query.level) {
      // Redirigez l'utilisateur vers la page précédente si les paramètres sont manquants
      // push("/");
    }
  }, [query.module, query.level, push]);

  return (
    <div className="bg-beige">
<Menu />

      <div className="container w-[50%] my-10 ml-[25%] rounded-lg">
        <div className='container bg-white rounded-lg text-center p-5'>
          <div className='flex-col gap-x-3 p-3'>
            <p>
              Vous allez démarrer le quiz {query.module} niveau {query.level}.
            </p>
            <p>Ce quiz comporte 20 questions.</p>
            <p>Vous disposez de 30 secondes par question.</p>
            <p>Etes-vous prêt ?</p>
      <div className="flex justify-around mt-5">
        <Button onClick={startQuiz} color="failure" pill>
          Démarrer le quiz
        </Button>
        </div>
          </div>
        </div>
      </div>
      <PiedDePage />
    </div>
  );
}

export default StartQuiz;
