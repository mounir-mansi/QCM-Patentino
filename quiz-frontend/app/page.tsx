'use client';
import AnimatedBackground from "@/components/Background";
import Menu from "../components/Menu";
import ModuleCard from '@/components/Card';
import PiedDePage from '@/components/Footer';
import Title from '@/components/Title';
import { Card } from "flowbite-react";

export default function Home() {


  return (
    <div>
      
      <Menu/>


            <div className="grid place-items-center"><Title title='hello' /></div>
            <AnimatedBackground/>


      <div>
        <Card className="h-128 mb-6 mx-6" />
      </div>

      <PiedDePage/>

    </div>
  )
}
