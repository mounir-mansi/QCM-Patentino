'use client';
import Image from 'next/image'
import Menu from "../components/Menu";
import ModuleCard from '@/components/Card';
import PiedDePage from '@/components/Footer';

export default function Home() {
  return (
    <>
          <Menu />

          <ModuleCard/>

          <PiedDePage/>
    </>
  );
}
