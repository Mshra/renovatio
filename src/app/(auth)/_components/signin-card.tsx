"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { PasswordInput } from "./password-input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleLogo from "../../../../public/logos/google-logo";

const SignInCard = () => {
  const [currentPassword, setCurrentPassword] = useState("");

  return (
    <>
      <Card className="w-[350px] md:w-[450px]">
        <CardHeader>
          <CardTitle>Signin</CardTitle>
          <CardDescription>
            Welcome Back! Please login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="johndoe@example.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={"/"}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button>Submit</Button>
        </CardFooter>
        <CardContent>
          <Separator />

          <div className="text-xs text-muted-foreground flex items-center justify-center mt-2">
            OR
          </div>

          <div className="flex items-center justify-center mt-4">
            <Button variant="outline" onClick={() => signIn("google")}>
              <GoogleLogo />
              Login With Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SignInCard;
