'use client';

import { Card, Button } from "flowbite-react";

interface ModuleCardProps {
  module: string;
  level: string;
  image?: string;
}

export default function ModuleCard(props: ModuleCardProps) {
  return (
    <div className="max-w-sm">
      <Card imgSrc={props.image} className="h-100">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Quiz {props.module} Niveau {props.level}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Testez vos connaissances de base en {props.module} avec ce quiz niveau {props.level}
        </p>
        <a className="flex justify-around" href={`/start?module=${props.module}&level=${props.level}`}>
          <Button color="failure" pill>Lancer le quiz</Button>
        </a>
      </Card>
    </div>
  );
}
