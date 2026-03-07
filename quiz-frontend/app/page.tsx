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
              <Card className="w-full bg-[url(https://media.tenor.com/U0Ny_4eBUM4AAAAd/cuisine-femme.gif)] bg-cover bg-center bg-no-repeat [&>div]:min-h-80 md:[&>div]:min-h-[500px]">              
              <div className="text-center text-[#DC3C35] bg-white bg-opacity-60 rounded-2xl p-6 md:p-10 mx-0 md:mx-12">
                <h5 className="text-2xl md:text-4xl font-extrabold tracking-wide">
                  Bienvenue sur la web app de quiz ULTIME !
                </h5>
                <p className="text-center text-[#1F2937] font-bold text-lg md:text-xl py-4">
                  Tu veux tester tes connaissances et te mettre au défi ? Tu penses savoir où est ta place ? Tu es au bon endroit jeune quiziniste ! Seras-tu vraiment prêt à devenir...
                </p>
                <p className="text-2xl md:text-4xl font-extrabold tracking-wide rounded-lg">
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