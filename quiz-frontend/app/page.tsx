'use client';
import "../app/globals.css";
import AnimatedBackground from "@/components/Background";
import Menu from "../components/Menu";
import PiedDePage from '@/components/Footer';
import Title from '@/components/Title';
import { Card } from "flowbite-react";

export default function Home() {
  return (
    <div>
      <Menu />
      <AnimatedBackground />

        <div className="relative z-10 my-2 min-content-height">        
          <div className="flex flex-col items-center px-4">
          <Title title="Welcome to the Quizine" />

            <div className="w-full max-w-6xl mb-6">
              <Card className="w-full bg-[url(/pexels-jitte-davidson-2159038077-35755214.jpg)] bg-[size:100%_auto] bg-top bg-no-repeat [&>div]:h-[calc(100vh-80px)] [&>div]:flex [&>div]:items-center [&>div]:justify-center">              
              <div className="text-[#f0c040] bg-[#0d1b2a] bg-opacity-70 rounded-2xl p-4 md:p-10 mx-0 md:mx-12">
                <h5 className="text-xl md:text-4xl font-extrabold tracking-wide text-center">
                  Bienvenue sur la web app de quiz ULTIME !
                </h5>
                <p className="text-left md:text-center text-white font-bold text-sm md:text-xl py-3">
                  Tu veux tester tes connaissances et te mettre au défi ? Tu penses savoir où est ta place ? Tu es au bon endroit jeune quiziniste ! Seras-tu vraiment prêt à devenir...
                </p>
                <p className="text-xl md:text-4xl font-extrabold tracking-wide rounded-lg text-center">
                  LE.A CHEF.FE DE LA QUIZINE ???
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <PiedDePage />
    </div>
  );
}