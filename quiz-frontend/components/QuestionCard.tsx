import React, { useEffect, useState } from "react";
import { Answer, Question } from "./types";
import AnswerButton from "./AnswerButton";
import Timer from "./Timer";
import { Button } from "flowbite-react";

type QuestionCardProps = {
  currentQuestionIndex: number;
  questions: Question[];
  onSubmit: (selectedAnswer: number | null) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ currentQuestionIndex, questions, onSubmit }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    const loadAnswers = async () => {
      const values = await getAnswers(questions[currentQuestionIndex].id);
      setAnswers(Array.isArray(values) ? values : []);
    };
    loadAnswers();
    setSelectedAnswer(null);
    setValidated(false);
  }, [questions, currentQuestionIndex]);

  const handleAnswerClick = (answerId: number) => {
    if (!validated) setSelectedAnswer(answerId);
  };

  const handleValidateClick = () => {
    if (!selectedAnswer) return;
    setValidated(true);
    setTimeout(() => {
      onSubmit(selectedAnswer);
      setValidated(false);
      setSelectedAnswer(null);
    }, 2000);
  };

  const handleTerminated = () => {
    setValidated(true);
    setTimeout(() => {
      onSubmit(selectedAnswer);
      setValidated(false);
      setSelectedAnswer(null);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Timer */}
      <div className="bg-white rounded-lg shadow-md px-4 py-3 mb-4">
        <div className="text-center text-black text-xl">
          <Timer onTerminated={handleTerminated} questionId={questions[currentQuestionIndex].id} />
        </div>
      </div>

      {/* Badge question */}
      <div className="flex justify-center -mb-5 relative z-10">
        <button className="bg-gray-dark rounded-full px-6 cursor-default shadow">
          <div className="py-2 text-white text-sm sm:text-xl">
            Question {currentQuestionIndex + 1}/{questions.length}
          </div>
        </button>
      </div>

      {/* Question + réponses */}
      <div className="bg-white rounded-lg shadow-md px-4 pt-10 pb-6">
        <p className="text-center text-base sm:text-xl text-black font-medium mb-6">
          {questions[currentQuestionIndex].question_title}
        </p>
        <div className="flex flex-col items-center gap-2">
          {answers.map((answer: Answer) => (
            <AnswerButton
              key={answer.id}
              answer={answer}
              isClicked={selectedAnswer === answer.id}
              validated={validated}
              onClick={setSelectedAnswer}
            />
          ))}
        </div>
      </div>

      {/* Bouton valider */}
      <div className="flex justify-center mt-4 mb-6">
        <Button color="success" pill className="shadow-md w-3/4 sm:w-1/2" onClick={handleValidateClick}>
          Valider
        </Button>
      </div>
    </div>
  );
};

const getAnswers = async (questionId: number): Promise<Answer[]> => {
  try {
    const url = `/api/answer/question/${questionId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const answersData = await response.json();
    return Array.isArray(answersData) ? answersData : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default QuestionCard;