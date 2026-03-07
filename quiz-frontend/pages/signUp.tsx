import AnimatedBackground from "@/components/Background";
import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import Menu from '@/components/Menu';
import SignUpForm from '@/components/SignUpForm';

export default function signUp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center flex-1 px-4 py-6">
        <SignUpForm />
      </div>
      <PiedDePage />
    </div>
  )
}