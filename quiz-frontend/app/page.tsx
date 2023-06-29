'use client';
import AnimatedBackground from "@/components/Background";
import Menu from "../components/Menu";
import PiedDePage from '@/components/Footer';
import Title from '@/components/Title';
import 'animate.css/animate.min.css';


export default function Home() {
  return (
    <div>
      <Menu />

      <div className="my-6 min-content-height">
        <div className="grid place-items-center">
          <Title title="hello" />
          <div className="welcome-animation bg-gray-100 p-6 rounded-md">
            <h1 className="text-3xl font-bold mb-4">Bienvenue dans la Quizine.</h1>
            <h2 className="text-xl">Deviendras-tu le chef de la Quizine en réussissant tous nos quiz ?</h2>
          </div>
        </div>
        <AnimatedBackground />
      </div>

      <PiedDePage />
    </div>
  );
}
