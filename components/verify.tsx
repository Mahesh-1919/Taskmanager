"use client";
import React, { useState } from "react";
import Password from "@/components/password";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { sendEmail } from "@/app/actions/mail";
import { updatePassword } from "@/app/actions/action";

interface Props {
  type: string;
  description?: string;
}

const Verify = ({ type, description }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<number>();
  const [verifyOtp, setVerifyOtp] = useState<number>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are necessary.");
      return;
    } else if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    } else if (otp != verifyOtp) {
      setError("Otp does not valid.");
      setIsLoading(false);
      return;
    } else if (otp == verifyOtp && type === "register") {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      } else {
        setError("User registration failed.");
        setIsLoading(false);
      }
    } else if (otp == verifyOtp && type === "forgot") {
      const res = await updatePassword(username, password);

      if (res) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      } else {
        setError("Password update failed.");
        setIsLoading(false);
      }
    }
  };

  const verifyHandler = async (e: any) => {
    e.preventDefault();
    try {
      const resUserExists = await fetch("api/UserExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const { user } = await resUserExists.json();
      if (resUserExists.status !== 200) {
        setError("Something Went Wrong");
        setIsLoading(false);
      }

      if (type === "register") {
        if (user) {
          setError("User already exists.");

          return;
        } else if (!user) {
          const otp = Math.floor(100000 + Math.random() * 900000);
          setOtp(otp);
          const res: any = await sendEmail({ username, otp });
          if (res) {
            setError("Otp sent to your email");
          }
        }
      } else if (type === "forgot" && user) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        setOtp(otp);
        const res: any = await sendEmail({ username, otp });

        if (res) {
          setError("Otp sent to your email");
        }
      }
    } catch (error) {
      setError("Error during registration: ");
    }
  };

  return (
    <div className="flex justify-center h-screen items-center md:bg-cover bg-center ">
      <div
        className="w-full max-w-sm p-4  rounded-xl shadow sm:p-6 md:p-8 m-8  md:m-0 backdrop-blur-sm bg-secondary text-white
     "
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-center">{description}</h5>
          <div>
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium"
            >
              username
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                name="userName"
                id="userName"
                className="  border border-white/10 bg-white/10 text-sm rounded-xl text-white block w-full p-2.5"
                placeholder="name@company.com"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button onClick={verifyHandler}>Verify</Button>
            </div>
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium mt-2"
            >
              Enter Otp
            </label>
            <Input
              type="number"
              id="otp"
              placeholder="Enter otp"
              value={verifyOtp || ""}
              onChange={(e: any) => setVerifyOtp(e.target.value)}
              className="border border-white/10 bg-white/10 text-sm rounded-xl text-white block w-full p-2.5 "
            />
          </div>
          <Password
            password={passwordConfirm}
            setPassword={setPasswordConfirm}
            placeholder="Enter Password"
            labels="Password"
          />
          <Password
            password={password}
            setPassword={setPassword}
            placeholder="Conform password"
            labels="Confirm Password"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary hover:bg-black "
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <div className="text-sm font-medium text-gray-300">
            Already Have An Account?
            <Link
              href={"/login"}
              className=" hover:underline text-primary px-2"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
