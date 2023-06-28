import "../app/globals.css"
import PiedDePage from '@/components/Footer';
import Menu from '@/components/Menu';
import Title from "@/components/Title";
import ModuleCard from "@/components/Card";
import AnimatedBackground from "@/components/Background";

export default function QuizSelect() {
    return (
      <div>
      <Menu/> 


            <div className="grid place-items-center"><Title title='Deviendras-tu le chef de la Quizine ?' /></div>
            <AnimatedBackground/>
  

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 place-items-center mb-6">
          <ModuleCard module="PHP" level="facile" 
          image="https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA"/>

          <ModuleCard module="PHP" level="intermediaire" 
          image="https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA"/>
              
          <ModuleCard module="PHP" level="difficile" 
          image="https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA"/>

          <ModuleCard module="OM" level="facile" 
          image="https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA"/>

        </div>

      <PiedDePage/>
    </div>
    )
  }