'use client';

import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Logo from "../public/assets/logo_Quizine.png"
import Image from 'next/image'

export default function Menu() {
return (
<Navbar
    fluid={true}
    rounded={true}
    className="bg-dark dark"
  >
    <Navbar.Brand >
      <Image
        src={Logo}
        className="mr-3 h-16 w-40 sm:h-9"
        alt="Quizine Logo" 
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      </span>
    </Navbar.Brand>
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
      >
        <Dropdown.Header>
          <span className="block text-sm">
            Bonnie Green
          </span>
          <span className="block truncate text-sm font-medium">
            name@flowbite.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item>
          Settings
        </Dropdown.Item>
        <Dropdown.Item>
          Earnings
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
      <Navbar.Link
        href="/navbars"
        active={true}
      >
        Home
      </Navbar.Link>
      <Navbar.Link href="/navbars">
        Quiz
      </Navbar.Link>
      <Navbar.Link href="/navbars">
        Mes scores
      </Navbar.Link>
      <Navbar.Link href="/navbars">
        Ajouter un Quiz
      </Navbar.Link>
    </Navbar.Collapse>
  </Navbar>)
}
