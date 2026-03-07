import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Card } from "flowbite-react";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import AnimatedBackground from "@/components/Background";

interface QuizData {
  finalScore?: number;
  success?: boolean;
  moduleId?: number;
  userId?: number;
  levelModule?: string;
}

const EndScore = () => {
  const { push } = useRouter();
  const [quizData, setQuizData] = useState<QuizData>({});
  const [animatedScore, setAnimatedScore] = useState(0);

  const goToMyScores = () => {
    push("/myscores");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("endQuizData") ?? "{}");
    setQuizData(data);
    if (data?.finalScore) {
      animateScore(data.finalScore);
    }
  }, []);

  const animateScore = (finalScore: number) => {
    let currentScore = 0;
    const step = Math.ceil(finalScore / 50);
    const interval = setInterval(() => {
      currentScore += step;
      if (currentScore >= finalScore) {
        currentScore = finalScore;
        clearInterval(interval);
      }
      setAnimatedScore(currentScore);
    }, 20);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center flex-1 px-4">
        <Card className="w-full max-w-md">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {quizData?.success
              ? "Bravo ! Vous avez réussi le quiz."
              : "Dommage... Vous y étiez presque."}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
            Vous avez obtenu un score de:
          </p>
          <span className={`${
            quizData?.success ? "text-green-700" : "text-red-700"
          } text-center text-6xl font-bold`}>
            {isNaN(animatedScore) ? 0 : Math.round(animatedScore)}%
          </span>
          <Button onClick={goToMyScores} color="failure" pill>Voir mes scores</Button>
        </Card>
      </div>
      <PiedDePage />
    </div>
  );
};

export const getServerSideProps = async () => {
  return { props: {} };
};

export default EndScore;