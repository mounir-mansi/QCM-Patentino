'use client';

import { Label, TextInput, Button } from "flowbite-react";


export default function SignUp() {
    return (
<form className="flex max-w-md flex-col gap-4 border-2 rounded-lg p-4 m-12 w-full bg-gray-light">
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email2"
        value="Your email"
      />
    </div>
    <TextInput
      id="email2"
      placeholder="name@flowbite.com"
      required
      shadow
      type="email"
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        value="First name"
      />
    </div>
    <TextInput
      id="FirstName"
      placeholder="First name"
      required
      shadow
      type="FirstName"
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        value="Last name"
      />
    </div>
    <TextInput
      id="LasttName"
      placeholder="Last name"
      required
      shadow
      type="LastName"
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password2"
        value="Your password"
      />
    </div>
    <TextInput
      id="password2"
      required
      shadow
      type="password"
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="repeat-password"
        value="Repeat password"
      />
    </div>
    <TextInput
      id="repeat-password"
      required
      shadow
      type="password"
    />
  </div>
  <Button type="submit">
    Register new account
  </Button>
</form>)}