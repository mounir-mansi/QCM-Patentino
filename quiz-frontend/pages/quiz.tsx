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
          image="https://www.audit-conseil-formation.com/formations/uploads/glossaire_image_30.webp"/>
              
          <ModuleCard module="PHP" level="difficile" 
          image="https://kinsta.com/fr/wp-content/uploads/sites/4/2020/03/tutoriels-php.png"/>

          <ModuleCard module="OM" level="facile" 
          image="https://www.sportbuzzbusiness.fr/wp-content/uploads/2016/11/maillots-olympique-de-marseille-2015-2016-logo-1050x700.jpg"/>

        </div>

      <PiedDePage/>
    </div>
    )
  }