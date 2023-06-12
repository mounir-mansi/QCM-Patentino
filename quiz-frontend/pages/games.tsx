import "../app/globals.css";
import PiedDePage from '@/components/Footer';
import Menu from '@/components/Menu';
import QuestionCard from "@/components/QuestionCard";

export default function Game()

{
    return (
        <div className="bg-beige">
        <Menu/>
        <QuestionCard/>
        <PiedDePage/>
        </div>
    )

}