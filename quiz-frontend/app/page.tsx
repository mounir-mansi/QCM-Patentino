'use client';
import Image from 'next/image'
import Menu from "../components/Menu";
import ModuleCard from '@/components/Card';
import PiedDePage from '@/components/Footer';
import SignUp from '@/components/SignUpForm';
import LogIn from '@/components/LogInForm';
import Title from '@/components/Title';

export default function Home() {
  return (
    <div className="bg-beige">
          <Menu/>
          
      <div className="container w-[50%] my-10 ml-[25%]">
        <Title />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <ModuleCard module="PHP" level="Facile"/>
              <ModuleCard module="PHP" level="Intermédiaire"/>
              <ModuleCard module="PHP" level="Difficile"/>
            </div>
      </div>
          <PiedDePage/>
    </div>
  )
}
