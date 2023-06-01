import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import Logo from "../public/assets/logo_Quizine.png"
import Image from 'next/image'
// import { useRouter } from "next/router";

export default function Menu() {

  // const router = useRouter()

  // const goToLogIn = () => {
  //   router.push('/pages/logIn')
  // }

return (
<Navbar
  className="dark bg-dark"
    fluid={true}
    rounded={true}
  >
    <Navbar.Brand>
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
        disabled={false}
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
      >
        <Dropdown.Header>
          <span className="block text-sm">
            Joe LaMouk
          </span>
          <span className="block truncate text-sm font-medium">
            name@joelamouk.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          Mon Profil
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
    <div className="flex flex-row gap-4">
    <Button
      color="failure"
      size="sm"
      pill
      href="/logIn">
      <p>
        Log In 
      </p>
    </Button>
    <Button
      color="failure"
      size="sm"
      pill
      outline
      href="/signUp">
      <p>
        Sign Up 
      </p>
    </Button>
    </div>
  </Navbar>)
}
