"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { useTheme } from "next-themes";

export default function SignupForm() {
  //   const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex py-8 items-center justify-center ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
            {/* Social Login */}
            <div className="mt-4 space-y-2">
            <p className="text-center text-sm text-muted-foreground">Or continue with</p>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="flex cursor-pointer items-center gap-2 w-full">
                  Continue with Google
              </Button>
              <Button variant="outline" className="flex cursor-pointer items-center gap-2 w-full">
                 Continue with Apple
              </Button>
              <Button variant="outline" className="flex cursor-pointer items-center gap-2 w-full">
                 Continue with Meta
              </Button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm">Toggle Theme</span>
            {/* <Switch
              checked={theme === "dark"}
              onCheckedChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
