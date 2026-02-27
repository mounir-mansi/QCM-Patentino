'use client';
import { Button } from "flowbite-react";

interface ModuleCardProps {
  module: string;
  level: string;
  image?: string;
}

export default function ModuleCard(props: ModuleCardProps) {
  return (
    <div className="w-80">
      <div className="flex flex-col h-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img
            src={props.image}
            alt={props.module}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Quiz {props.module} Niveau {props.level}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 flex-1">
            Testez vos connaissances de base en {props.module} avec ce quiz niveau {props.level}
          </p>
          <a className="flex justify-around" href={`/start?module=${props.module}&level=${props.level}`}>
            <Button color="failure" pill>Lancer le quiz</Button>
          </a>
        </div>
      </div>
    </div>
  );
}