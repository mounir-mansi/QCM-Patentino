'use client';

import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!turnstileToken) {
      setErrorMessage("Vérification CAPTCHA en cours, réessayez.");
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
          "cf-turnstile-response": turnstileToken,
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
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setTurnstileToken(token)}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <Button type="submit" color="failure">
        Register new account
      </Button>
    </form>
  );
}
