'use client';

import { Card } from "flowbite-react";
import { Button } from 'flowbite-react';

export default function ModuleCard(props: any) {
  {props.module} {props.level}
    return (

<div className="max-w-sm">
  <Card imgSrc="https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA">
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Quiz {props.module}  Niveau {props.level}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      Testez vos connaissances de base en {props.module} avec ce quiz niveau {props.level}
    </p>
    <a className="flex justify-around" href={`/start?module=${props.module}&level=${props.level}`}>
    <Button  color="failure" pill>Lancer le quiz</Button>
    </a>
  </Card>
</div>
    )}