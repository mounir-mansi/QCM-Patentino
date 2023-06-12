'use client';
import Menu from "../components/Menu";
import PiedDePage from '@/components/Footer';
import { useRouter } from "next/router";
import "../app/globals.css"
import { Button } from 'flowbite-react';



export default function StartQuiz() {

    const {query} = useRouter();

  return (
    <div className="bg-beige">
          <Menu/>
          
      <div className="container w-[50%] my-10 ml-[25%] rounded-lg">
            <div className='container bg-white rounded-lg text-center p-5'>
              <div>
                <p>
                Vous allez démarrer le quiz {query.module} niveau {query.level}.
                </p>
                <p>Ce quiz comporte 20 questions.</p>
                <p>Vous disposez de 30 secondes par questions.</p>
                <p>Etes-vous prêt ?</p>
                <a className="flex justify-around mt-5" >
                  <Button  color="failure" pill>Démarrer le quiz</Button>
                </a>
              </div>
            </div>

      </div>
          <PiedDePage/>
    </div>
  )
}