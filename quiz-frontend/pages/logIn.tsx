import AnimatedBackground from "@/components/Background";
import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import LogInForm from "@/components/LogInForm";
import Menu from '@/components/Menu';

export default function logIn() {
  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center flex-1 px-4 py-6">
        <LogInForm />
      </div>
      <PiedDePage />
    </div>
  )
}