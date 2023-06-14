import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import Menu from '@/components/Menu';
import Title from "@/components/Title";
import ModuleCard from "@/components/Card";

export default function QuizSelect() {
    return (
      <div className="bg-beige ">
            <Menu/>
            
            <div className="container flex justify-center w-screen">
  
            <div className="container w-[50%] my-10 ml-[25%]">
        <Title />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <ModuleCard module="PHP" level="Facile"/>
              <ModuleCard module="PHP" level="Intermédiaire"/>
              <ModuleCard module="PHP" level="Difficile"/>
            </div>
      </div>

            </div>
  
            <PiedDePage/>
      </div>
    )
  }