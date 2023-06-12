import Timer from "./Timer";
import { Button } from 'flowbite-react';

const QuestionCard = () => {
    return (       
        <div className="container w-[50%] my-10 ml-[25%]">

            <div className="container bg-white h-full px-3 py-1 rounded-md shadow-md">
                <div className="text-center">
                    <div className="mx-3 my-3 rounded-3xl w-full">
                        <div className=" text-black text-2xl">
                        <Timer />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container -mb-10 h-full p-3">
                <div className="text-center">
                    <button className=" bg-gray-dark mx-3 my-3 rounded-3xl lg:w-[40%] cursor-default shadow sm:w-[50%] ">
                        <div className="my-3 text-white lg:text-2xl sm:text-xl">
                            Question 1/30
                        </div>
                    </button>
                </div>
            </div>
            
            <div className="container bg-white h-full p-3 rounded-md shadow-md">
                <ul className="text-center mb-14">
                    <li className="my-5 text-2xl text-black">Ceci est l intitulé de la question</li>
                    <button className="bg-red-600 w-[80%] my-2 rounded-3xl shadow"><li className="py-2 ml-5 text-left text-lg">1. reponse 1</li></button>
                    <button className="bg-red-600 w-[80%] my-2 rounded-3xl shadow"><li className="py-2 ml-5 text-left text-lg">2. reponse 2</li></button>
                    <button className="bg-red-600 w-[80%] my-2 rounded-3xl shadow"><li className="py-2 ml-5 text-left text-lg">3. reponse 3</li></button>
                    <button className="bg-red-600 w-[80%] my-2 rounded-3xl shadow"><li className="py-2 ml-5 text-left text-lg">4. reponse 4</li></button>
                </ul>
            </div>

            <div className="container h-full p-3">
                <div className="flex flex-row items-center">
                    <Button color="success" pill className="shadow-md my-3 text-2xl w-[70%] ">Valider</Button>
                </div>
            </div>
            
        </div>
    );
};

export default QuestionCard;