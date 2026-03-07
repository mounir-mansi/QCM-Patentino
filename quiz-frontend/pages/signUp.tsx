import AnimatedBackground from "@/components/Background";
import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import Menu from '@/components/Menu';
import SignUpForm from '@/components/SignUpForm';

export default function signUp() {
  return (
    <div>
      <Menu />
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center min-content-height px-4">
        <SignUpForm />
      </div>
      <PiedDePage />
    </div>
  )
}