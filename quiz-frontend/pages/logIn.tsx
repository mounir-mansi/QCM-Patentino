import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import LogInForm from "@/components/LogInForm";
import Menu from '@/components/Menu';


export default function logIn() {
    return (
      <div className="bg-beige ">
            <Menu/>
            
            <div className="container flex justify-center w-screen">
  
            <LogInForm/>
  
            </div>
  
            <PiedDePage/>
      </div>
    )
  }