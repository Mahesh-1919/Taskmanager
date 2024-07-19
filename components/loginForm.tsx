"use client";
import { Input } from "@/components/ui/input";
import Password from "@/components/password";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res: any = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setIsLoading(false);
        return;
      }

      router.push("/UserDashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center md:bg-cover bg-center text-white ">
      <div className="w-full max-w-sm p-4 m-8  md:m-0 rounded-xl shadow sm:p-6 md:p-8 backdrop-blur-sm bg-secondary ">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-center">
            Sign in to our platform
          </h5>
          <div>
            <label htmlFor="number" className="block mb-2 text-sm font-medium ">
              username
            </label>
            <Input
              type="text"
              name="number"
              id="number"
              className="  border border-white/10 bg-white/10 text-sm rounded-xl  block w-full p-2.5 text-white "
              placeholder="name@company.com"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <Password
            password={password}
            setPassword={setPassword}
            labels="Password"
          />
          <div className="flex items-start">
            <Link
              href={"/forgotPassword"}
              className="ms-auto text-sm text-primary hover:underline "
            >
              Forgot Password
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-primary hover:bg-black focus:ring-4 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? "Loading..." : "Login to Your Account"}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <div className="text-sm font-medium text-gray-300">
            Not registered?
            <Link
              href={"/register"}
              className="text-primary hover:underline  px-2"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
