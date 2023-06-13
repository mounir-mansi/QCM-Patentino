'use client';
import AnimatedBackground from "@/components/Background";
import Menu from "../components/Menu";
import ModuleCard from '@/components/Card';
import PiedDePage from '@/components/Footer';
import Title from '@/components/Title';

export default function Home() {


  return (

    <div>
          <Menu/>
            
      <div className="container w-[50%] my-10 ml-[25%]">
        <Title />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <ModuleCard module="PHP" level="Facile"/>
              <ModuleCard module="PHP" level="Intermédiaire"/>
              <ModuleCard module="PHP" level="Difficile"/>
            </div>
      </div>
      <AnimatedBackground/>
          <PiedDePage/>
    </div>
    
  )
}
