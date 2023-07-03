'use client';
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import Logo from "../public/assets/logo_Quizine.png"
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

export default function Menu() {

  // const router = useRouter()

  // const goToLogIn = () => {
  //   router.push('/pages/logIn')
  // }
const { push } = useRouter();
 const [email, setEmail]= useState("");
 const [name, setName]= useState("");
 const [id, setId]= useState(0);
 useEffect(()=>{ 
  setEmail( localStorage.getItem("email")??"");
  setName( localStorage.getItem("name")??"");
  // setId( localStorage.getItem("user")??"0");
},[])

const logOut =() =>{
  localStorage.removeItem("email")
  localStorage.removeItem("name")
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  push("/logIn");
}


  const pathName =usePathname();
  const userDropdown = email?.length? (
  <Dropdown
  disabled={false}
  arrowIcon={false}
  inline={true}
  label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
>
  <Dropdown.Header>
    <span className="block text-sm">
      {name}
    </span>
    <span className="block truncate text-sm font-medium">
      {email}
    </span>
  </Dropdown.Header>

  <Dropdown.Item onClick={logOut}>
    Sign out
  </Dropdown.Item>
</Dropdown>
):null

  const logButton = !email?.length?(
    <>
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
  </>
  ):null

  const mesScores = email?.length?(
    <Navbar.Link href="/myscores" active={pathName==="/myscores"}>
    Mes scores
  </Navbar.Link>
    ):null

return (
<div   className="dark bg-black">
<Navbar

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
    <div className="flex flex-row gap-4">
    {userDropdown}
    {logButton}
    </div>
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
      <Navbar.Link
        href="/"
        active={pathName==="/"}
      >
        Home
      </Navbar.Link>
      <Navbar.Link href="/quiz" active={pathName==="/quiz"}>
        Quiz
      </Navbar.Link>
      {mesScores}
      {/* <Navbar.Link href="/">
        Ajouter un Quiz
      </Navbar.Link> */}
    </Navbar.Collapse>

  </Navbar>
  </div>)
}
