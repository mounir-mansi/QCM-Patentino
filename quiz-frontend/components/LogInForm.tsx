'use client';
import { Label, TextInput, Button, Checkbox, Alert } from "flowbite-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ App Router
import { HiInformationCircle } from 'react-icons/hi';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const { token, message, user, email: usermail, firstname, lastname } = await res.json();

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("email", usermail);
        localStorage.setItem("name", [firstname, lastname].join(" "));
        router.push('/');
      } else {
        setErrorMessage(message ?? "Erreur");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 border-2 rounded-lg p-4 m-12 w-full bg-gray-light"
      onSubmit={handleLogin}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          placeholder="votre email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      {errorMessage && (
        <Alert color="failure" icon={HiInformationCircle}>
          <p>{errorMessage}</p>
        </Alert>
      )}

      <Button type="submit" color="failure">
        Se connecter
      </Button>
    </form>
  );
}