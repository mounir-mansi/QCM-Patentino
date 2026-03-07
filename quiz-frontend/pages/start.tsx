import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Card } from "flowbite-react";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import AnimatedBackground from "@/components/Background";

const StartQuiz = () => {
  const { query, push } = useRouter();
  const [nbQuestions, setNbQuestions] = useState(0);
  const [isTokenValid, setTokenValid] = useState(false);
  const [message, setMessage] = useState("");

  const startQuiz = () => {
    if (isTokenValid && nbQuestions > 0) {
      push("/games");
    } else {
      push("/");
    }
  };

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const storedQuestions = localStorage.getItem("usedQuestions");
        const exclude = storedQuestions ? JSON.parse(storedQuestions) : [];

        const token = localStorage.getItem("token");
        const url = `/api/question/random-50?module=${query.module}&level=${query.level}&exclude=${exclude.join(",")}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setNbQuestions(data.length);
          setMessage("");
          // Stocker les questions dans localStorage
          localStorage.setItem("questions", JSON.stringify(data));

          // Ajouter les IDs vus à la liste
          const allUsed = [...exclude, ...data.map(q => q.id)];
          localStorage.setItem("usedQuestions", JSON.stringify(allUsed));

          setTokenValid(true);
        } else if (data.message === "Toutes les questions ont déjà été vues.") {
          setNbQuestions(0);
          setMessage("Toutes les questions ont déjà été vues. Vous pouvez réinitialiser le quiz.");
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error(error);
        setTokenValid(false);
      }
    };

    if (query.module && query.level) {
      loadQuiz();
    }
  }, [query.module, query.level, push]);

  const resetQuestions = () => {
    localStorage.removeItem("usedQuestions");
    setMessage("");
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <AnimatedBackground />

      <div className="relative z-10 flex items-center justify-center flex-1 px-4">
        <Card className="w-full max-w-md">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Quiz {query.module} – Niveau {query.level}
          </h5>

          {message ? (
            <p className="text-red-500 text-center">{message}</p>
          ) : (
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Ce quiz comporte {nbQuestions} questions.<br />
              Vous disposez de 30 secondes par question.<br />
              Êtes-vous prêt ?
            </p>
          )}

          <div className="flex justify-center gap-3 mt-4">
            {message ? (
              <Button color="gray" pill onClick={resetQuestions}>
                Réinitialiser les questions
              </Button>
            ) : (
              <Button onClick={startQuiz} color="failure" pill>
                Démarrer le quiz
              </Button>
            )}
          </div>
        </Card>
      </div>

      <PiedDePage />
    </div>
  );
};

export default StartQuiz;
