import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { Button } from 'flowbite-react';
import AnswerButton from "./AnswerButton";

type QuestionCardProps = {
  currentQuestionIndex: number;
  questions: {question_title:string; id:number}[];
  onSubmit: (selectedAnswer:number) => void
};

const QuestionCard: React.FC<QuestionCardProps> = ({ currentQuestionIndex, questions, onSubmit }) => {
  const [answers, setAnswers]= useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(0)
  const [timerReset, setTimerReset] = useState(false)
  
  useEffect (() => {
    getAnswers(questions[currentQuestionIndex].id)
    .then((values)=>setAnswers(values))
    setTimerReset(false); // Réinitialiser l'état du timerReset lorsque la question change
  },[questions, currentQuestionIndex])

  const handleAnswerClick = ((answerId: number) => {
    setSelectedAnswer(answerId)
  })

  const handleTerminated = () => {
    onSubmit(selectedAnswer)
    setTimerReset(true); // Définir l'état du timerReset à true lorsque le timer atteint zéro

  }
  return (
    <div className="container w-[50%] my-10 ml-[25%]">
      <div className="container bg-white h-full px-3 py-1 rounded-md shadow-md">
        <div className="text-center">
          <div className="mx-3 my-3 rounded-3xl w-full">
            <div className="text-black text-2xl">
              <Timer onTerminated={handleTerminated} timerReset={timerReset}/>
            </div>
          </div>
        </div>
      </div>

      <div className="container -mb-10 h-full p-3">
        <div className="text-center">
          <button className="bg-gray-dark mx-3 rounded-full lg:w-[40%] cursor-default shadow sm:w-[50%]">
            <div className="my-3 text-white lg:text-2xl sm:text-xl">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
          </button>
        </div>
      </div>

      <div className="container bg-white h-full p-3 rounded-md shadow-md">
        <ul className="text-center my-10">
          <li className="my-5 text-2xl text-black">{questions[currentQuestionIndex].question_title}</li>
          <div className="flex flex-col items-center">
           {answers.map((answer)=>
          (<AnswerButton key={answer.id} answer={answer} isClicked={selectedAnswer==answer.id} onClick={handleAnswerClick}/>))}

          </div>
        </ul>
      </div>

      <div className="container h-full p-3 flex justify-center items-center">
        <Button color="success" pill className="shadow-md my-3 w-[70%]" onClick={()=>onSubmit(selectedAnswer)}>
          Valider
        </Button>
      </div>
    </div>
  );
};

const getAnswers = async (questionId: number): Promise<{id:number, title_answer:string}[]> => {

  try {
    const url = `/api/answer/question/${questionId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const answersData = await response.json();
    console.log({answersData})
      return answersData

  } catch (error) {
    
    console.error(error);
    return []
  }
};

export default QuestionCard;
