'use client';
import Image from 'next/image'
import Menu from "../components/Menu";
import ModuleCard from '@/components/Card';
import PiedDePage from '@/components/Footer';
import SignUp from '@/components/SignUpForm';
import LogIn from '@/components/LogInForm';

export default function Home() {
  return (
    <div >
          <Menu/>

          <ModuleCard/>

        {/* <div className='flex justify-center space-x-12'>
          <div className="md:container md:mx-auto">
          <SignUp />
          </div>
          <div className="md:container md:mx-auto">
          <LogIn />
          </div>
        </div> */}

          <PiedDePage/>
    </div>
  )
}
