import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import Menu from '@/components/Menu';
import Title from "@/components/Title";
import ModuleCard from "@/components/Card";



export default function test() {
    return (
      <div className="bg-beige ">
            <Menu/>
            
            <div className="container flex justify-center w-screen">
            <Title />

            <ModuleCard />
            </div>
  
            <PiedDePage/>
      </div>
    )
  }