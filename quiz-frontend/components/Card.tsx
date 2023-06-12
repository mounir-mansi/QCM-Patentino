import { Card } from "flowbite-react/lib/esm/components/Card/Card";

export default function ModuleCard(props: any) {
  {props.module} {props.level}
    return (

<div className="max-w-sm">
  <Card imgSrc="https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA">
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Quiz {props.module}  Niveau {props.level}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      Testez vos connaissances de base en {props.level} avec ce quiz niveau {props.level}
    </p>
  </Card>
</div>
    )}