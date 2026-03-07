import { Footer } from "flowbite-react";

export default function PiedDePage() {
  return (
    <div className="dark bg-black">
      <Footer container>
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <Footer.Copyright
            by="Quizine™"
            href="#"
            year={2023}
          />
          <Footer.LinkGroup className="flex flex-wrap gap-x-4 gap-y-1">
            <Footer.Link href="https://www.linkedin.com/in/emilie-di-palma-b8b63a264/">Emilie</Footer.Link>
            <Footer.Link href="https://www.linkedin.com/in/briac-gauthier-lefeuvre-460004263/">Briac</Footer.Link>
            <Footer.Link href="#">Mounir</Footer.Link>
            <Footer.Link href="https://www.linkedin.com/in/yannchavret/">Yann</Footer.Link>
            <Footer.Link href="https://chat.openai.com/">Chat GPT</Footer.Link>
          </Footer.LinkGroup>
        </div>
      </Footer>
    </div>
  )
}