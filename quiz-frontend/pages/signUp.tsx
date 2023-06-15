import AnimatedBackground from "@/components/Background";
import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import Menu from '@/components/Menu';
import SignUpForm from '@/components/SignUpForm';


export default function signUp() {
    return (
        <div className="">
            <Menu/>

            <div className="container flex justify-center w-screen">

                <SignUpForm/>
  
            </div>
            <AnimatedBackground/>
            <PiedDePage/>
      </div>
    )
  }