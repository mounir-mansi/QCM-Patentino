'use client';
import Menu from "../components/Menu";
import PiedDePage from '@/components/Footer';
import { useRouter } from "next/router";
import "../app/globals.css"



export default function StartQuiz() {

    const {query} = useRouter();

  return (
    <div className="bg-beige">
          <Menu/>
          
      <div className="container w-[50%] my-10 ml-[25%]">
            <div className='container bg-white'>
Vous allez démarrer le quiz {query.module} niveau {query.level}
            </div>
      </div>
          <PiedDePage/>
    </div>
  )
}