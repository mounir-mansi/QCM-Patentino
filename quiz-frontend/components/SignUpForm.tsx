import { Button, Label, TextInput } from "flowbite-react";
import router from "next/router";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          firstname: firstName,
          lastname: lastName,
        }),
      });

      if (res.ok) {
        router.push('/login')
      } else {
        throw new Error("Error during user signup.");
      }
    } catch (error) {
      console.error(error);
      // Gérer l'erreur de manière appropriée (affichage d'un message d'erreur, etc.)
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 border-2 rounded-lg p-4 m-12 w-full bg-gray-light"
      onSubmit={handleSignup}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your email" />
        </div>
        <TextInput
          id="email2"
          placeholder="name@flowbite.com"
          required
          shadow
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="First name" />
        </div>
        <TextInput
          id="FirstName"
          placeholder="First name"
          required
          shadow
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Last name" />
        </div>
        <TextInput
          id="LastName"
          placeholder="Last name"
          required
          shadow
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Your password" />
        </div>
        <TextInput
          id="password2"
          required
          shadow
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Repeat password" />
        </div>
        <TextInput
          id="repeat-password"
          required
          shadow
          type="password"
        />
      </div>
      <Button type="submit">Register new account</Button>
    </form>
  );
}
