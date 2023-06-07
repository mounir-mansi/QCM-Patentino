'use client';

import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function LogIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      // Rechercher l'utilisateur par e-mail
      const user = await fetch("http://localhost:5500/users/", {
        method:"post", 
        headers:{
          "content-type": "application/json"
        },
        body:JSON.stringify({
          email,
          password,
        })
      });
      console.log(user)

      if (!user) {
        throw new Error('Utilisateur introuvable');
      }

      // Comparer les mots de passe
      const isPasswordCorrect = await comparePasswords(user.id, password);

      if (isPasswordCorrect) {
        // Connexion réussie, rediriger l'utilisateur vers une autre page
        router.push('/dashboard');
      } else {
        console.log('Mot de passe incorrect');
      }
    } catch (error) {
      console.error(error);
    }
  };

return(
<form className="flex max-w-md flex-col gap-4 border-2 rounded-lg p-4 m-12 w-full bg-gray-light" onSubmit={handleLogin}>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Your email"
      />
    </div>
    <TextInput
      id="email1"
      placeholder="name@flowbite.com"
      required
      type="email" value={email} onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password1"
        value="Your password"
      />
    </div>
    <TextInput
      id="password1"
      required
      type="password" value={password} onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="remember" />
    <Label htmlFor="remember">
      Remember me
    </Label>
  </div>
  <Button type="submit">
    Submit
  </Button>
</form>
)
}
