import React from 'react';
import { Button } from 'flowbite-react';

type AnswerButtonProps = {
  onClick: (answerId:number) => void;
  isClicked: boolean; 
  validated?: boolean;
answer: {id:number, title_answer:string, result_answer?: boolean};};

const AnswerButton :React.FC<AnswerButtonProps>= ({onClick, isClicked, validated, answer}) => {

  const handleClick = () => onClick(answer.id);

  let color: "success" | "failure" | "blue" | "gray" = "gray";
  let outline: boolean = false;

  if (validated) {
    // Après validation
if (answer.result_answer === true) color = "success";    else if (isClicked) color = "failure"; // mauvaise réponse choisie
    else color = "gray"; // les autres
    outline = false; // jamais d'outline après validation
  } else {
    // Avant validation
    if (isClicked) {
      color = "gray"; // sélection avant validation
      outline = false; // texte visible
    } else {
      color = "gray";
      outline = true; // outline seulement sur les non sélectionnés
    }
  }

  return (
    <Button 
      className="w-[80%] my-2 text-lg font-medium"
      color={color}
      pill
      outline={outline}
      onClick={handleClick}
    >
      {answer.title_answer}
    </Button>
  );
}

export default AnswerButton;
