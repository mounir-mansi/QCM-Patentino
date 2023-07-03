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

      <div className="my-6 min-content-height ">
        <div className="grid place-items-center ">
          <Title title="Welcome to the Quizine" />

          <div>
              <Card className="container h-128 mb-6 mx-24 bg-[url(https://media.tenor.com/U0Ny_4eBUM4AAAAd/cuisine-femme.gif)] bg-cover bg-no-repeat rounded-4xl">
                <div className="mx-24 text-center text-[#DC3C35] bg-beige bg-opacity-60 rounded-2xl p-10">
                  <h5 className="text-4xl font-extrabold tracking-wide text-shadow-white">
                    Bienvenue sur la web app de quiz ULTIME !
                  </h5>
                  <p className="text-center text-[#1F2937] font-bold text-xl py-4">
                    Tu veux tester tes connaissances et te mettre au défi ? Tu penses savoir où est ta place ? Tu es au bon endroit jeune quiziniste ! Seras-tu vraiment prêt à devenir...
                  </p>
                  <p className="text-4xl font-extrabold tracking-wide rounded-lg">
                    LE.A CHEF.FE DE LA QUIZINE ???
                  </p>
                </div>
              </Card>
            </div>
        </div>
        <AnimatedBackground />
      </div>

      <PiedDePage />
    </div>
  );
}
