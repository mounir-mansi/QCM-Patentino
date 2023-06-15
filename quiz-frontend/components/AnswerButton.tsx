import React from 'react';
import { Button } from 'flowbite-react';

type AnswerButtonProps = {
    onClick: (answerId:number) => void;
    isClicked: boolean; 
    answer: {id:number, title_answer:string}// Remplacez le type 'string[]' par le type approprié pour vos questions
  };

const AnswerButton :React.FC<AnswerButtonProps>= ({onClick, isClicked, answer}) => {

  const handleClick = () => {
    onClick(answer.id)
  };

  return (
    <Button 
      className={`w-[80%] my-2 ${isClicked ? 'clicked' : ''}`}
      color="failure"
      pill
      outline={!isClicked}
      onClick={handleClick}
    >
      {answer.title_answer}
    </Button>
  );
}

export default AnswerButton
