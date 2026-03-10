'use client';
import { Label, TextInput, Button, Checkbox, Alert } from "flowbite-react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HiInformationCircle } from 'react-icons/hi';
import { Turnstile } from "@marsidev/react-turnstile";

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [logoutMessage, setLogoutMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const msg = localStorage.getItem("logoutMessage");
    if (msg) {
      setLogoutMessage(msg);
      localStorage.removeItem("logoutMessage");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setErrorMessage("Vérification CAPTCHA en cours, réessayez.");
      return;
    }
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, "cf-turnstile-response": turnstileToken }),
        credentials: "include",
      });
      const { message, user, email: usermail, firstname, lastname } = await res.json();
      if (res.ok && user) {
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
      className="flex max-w-md flex-col gap-4 border border-gray-200 rounded-2xl p-6 w-full bg-white shadow-lg"
      onSubmit={handleLogin}
    >
      {logoutMessage && (
        <Alert color="warning" icon={HiInformationCircle}>
          <p>{logoutMessage}</p>
        </Alert>
      )}
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
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setTurnstileToken(token)}
      />
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
