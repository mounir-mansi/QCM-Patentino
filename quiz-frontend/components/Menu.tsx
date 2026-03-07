'use client';
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import Logo from "../public/assets/logo_Quizine.png"
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAutoLogout from "@/hooks/useAutoLogout";

export default function Menu() {
  useAutoLogout();
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email") ?? "");
    setName(localStorage.getItem("name") ?? "");
  }, [])

  const logOut = () => {
    localStorage.removeItem("email")
    localStorage.removeItem("name")
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.setItem("logoutMessage", "Vous avez été déconnecté.")
    window.location.href = "/logIn";
  }

  const pathName = usePathname();

  const userDropdown = email?.length ? (
    <Dropdown
      disabled={false}
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
    >
      <Dropdown.Header>
        <span className="block text-sm">{name}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      <Dropdown.Item onClick={logOut}>Sign out</Dropdown.Item>
    </Dropdown>
  ) : null

  return (
    <div className="dark bg-black relative z-50">
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <Image
            src={Logo}
            className="mr-3 h-16 w-40 sm:h-9"
            alt="Quizine Logo"
          />
        </Navbar.Brand>

        <div className="flex items-center gap-3 md:order-2">
          {userDropdown}
          {!email?.length && (
            <div className="hidden md:flex items-center gap-2">
              <a href="/logIn">
                <Button color="light" pill size="sm">Log In</Button>
              </a>
              <a href="/signUp">
                <Button color="failure" pill size="sm">Sign Up</Button>
              </a>
            </div>
          )}
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link href="/" active={pathName === "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/quiz" active={pathName === "/quiz"}>
            Quiz
          </Navbar.Link>
          {email?.length ? (
            <Navbar.Link href="/myscores" active={pathName === "/myscores"}>
              Mes scores
            </Navbar.Link>
          ) : null}
          {!email?.length ? (
            <div className="md:hidden">
              <Navbar.Link href="/logIn" active={pathName === "/logIn"}>
                Log In
              </Navbar.Link>
              <Navbar.Link href="/signUp" active={pathName === "/signUp"}>
                Sign Up
              </Navbar.Link>
            </div>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}