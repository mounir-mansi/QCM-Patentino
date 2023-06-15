import AnimatedBackground from "@/components/Background";
import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import LogInForm from "@/components/LogInForm";
import Menu from '@/components/Menu';


export default function logIn() {
    return (
      <div className="">
            <Menu/>
            
            <div className="container flex justify-center w-screen">
  
            <LogInForm/>
  
            </div>
            <AnimatedBackground/>
            <PiedDePage/>
      </div>
    )
  }