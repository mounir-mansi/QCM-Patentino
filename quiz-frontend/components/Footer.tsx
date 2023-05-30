'use client';

import {Footer} from "flowbite-react";
import Logo from "../public/assets/logo_Quizine.png"



export default function PiedDePage() {
return (



<Footer container>
  <Footer.Copyright
    by="Quizine™"
    href="#"
    year={2022}
  />
  <Footer.LinkGroup>
    <Footer.Link href="https://www.linkedin.com/in/emilie-di-palma-b8b63a264/">
      Emily
    </Footer.Link>
    <Footer.Link href="https://www.linkedin.com/in/briac-gauthier-lefeuvre-460004263/">
      Briac
    </Footer.Link>
    <Footer.Link href="#">
      Mounir
    </Footer.Link>
    <Footer.Link href="https://www.linkedin.com/in/yannchavret/">
      Yann
    </Footer.Link>
  </Footer.LinkGroup>
</Footer>)
}