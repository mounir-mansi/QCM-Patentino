import "../app/globals.css";
import PiedDePage from '@/components/Footer';
import Menu from '@/components/Menu';
import Title from "@/components/Title";
import ModuleCard from "@/components/Card";
import AnimatedBackground from "@/components/Background";

const LEVELS = ["facile", "intermediaire", "difficile"] as const;

const IMAGES = {
  facile: "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA",
  intermediaire: "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA",
  difficile: "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720213/Web_Assets/blog/php_upload_cover_blog/php_upload_cover_blog-jpg?_i=AA",
};

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:5500/module");
    const modules = await res.json();
    return { props: { modules } };
  } catch (error) {
    console.error("Erreur fetch modules:", error);
    return { props: { modules: [] } };
  }
}

type Module = {
  id: number;
  module_title: string;
};

export default function QuizSelect({ modules }: { modules: Module[] }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <AnimatedBackground />
      <div className="relative z-10 mt-2 flex flex-col flex-1">
        <div className="grid place-items-center">
          <Title title='Deviendras-tu le chef de la Quizine ?' />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center mb-6 px-4">
          {modules.map((module) =>
            LEVELS.map((level) => (
              <ModuleCard
                key={`${module.id}-${level}`}
                module={module.module_title}
                level={level}
                image={IMAGES[level]}
              />
            ))
          )}
        </div>
      </div>
      <PiedDePage />
    </div>
  );
}

