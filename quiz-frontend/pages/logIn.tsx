import AnimatedBackground from "@/components/Background";
import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import LogInForm from "@/components/LogInForm";
import Menu from '@/components/Menu';

export default function logIn() {
  return (
    <div>
      <Menu />
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center min-content-height px-4">
        <LogInForm />
      </div>
      <PiedDePage />
    </div>
  )
}