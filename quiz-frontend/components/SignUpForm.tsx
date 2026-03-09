'use client';

import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation"; // ✅ App Router
import { useState } from "react";

export default function SignUp() {
  const router = useRouter(); // ✅ hook, pas un import direct
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstname: firstName,
          lastname: lastName,
        }),
        credentials: "include",
      });

      if (res.ok) {
        router.push('/logIn');
      } else {
        const { message } = await res.json();
        setErrorMessage(message ?? "Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Erreur réseau.");
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 border border-gray-200 rounded-2xl p-6 w-full bg-white shadow-lg"
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
          <Label htmlFor="FirstName" value="First name" />
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
          <Label htmlFor="LastName" value="Last name" />
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // ✅ était non contrôlé
        />
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <Button type="submit" color="failure">
        Register new account
      </Button>
    </form>
  );
}