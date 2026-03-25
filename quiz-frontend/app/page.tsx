'use client';
import "../app/globals.css";
import AnimatedBackground from "@/components/Background";
import Menu from "../components/Menu";
import PiedDePage from '@/components/Footer';
import Title from '@/components/Title';

export default function Home() {
  return (
    <div>
      <Menu />
      <AnimatedBackground />

        <div className="relative z-10 my-2 min-content-height">        
          <div className="flex flex-col items-center px-4">
          <Title title="Welcome to the Quizine" />

            <div className="w-full max-w-6xl mb-6 h-[calc(100vh-220px)] rounded-2xl overflow-hidden shadow-xl flex flex-col">
              {/* Image — 60% de la hauteur */}
              <div
                className="flex-[3] bg-[url(/pexels-jitte-davidson-2159038077-35755214.jpg)] bg-[size:100%_auto] bg-top bg-no-repeat"
              />
              {/* Texte — chevauchement sur l'image */}
              <div className="flex-[2] bg-white text-[#DC3C35] px-5 pt-6 pb-4 -mt-8 rounded-t-2xl relative z-10 flex flex-col justify-center">
                <h5 className="text-lg md:text-3xl font-extrabold tracking-wide text-center mb-2">
                  Bienvenue sur la web app de quiz ULTIME !
                </h5>
                <p className="text-[#1F2937] font-bold text-sm md:text-lg text-left md:text-center py-2">
                  Tu veux tester tes connaissances et te mettre au défi ? Tu penses savoir où est ta place ? Tu es au bon endroit jeune quiziniste ! Seras-tu vraiment prêt à devenir...
                </p>
                <p className="text-lg md:text-3xl font-extrabold tracking-wide text-center">
                  LE.A CHEF.FE DE LA QUIZINE ???
                </p>
              </div>
            </div>
        </div>
      </div>

      <PiedDePage />
    </div>
  );
}