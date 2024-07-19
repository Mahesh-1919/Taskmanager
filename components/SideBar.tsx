"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import SideUi from "@/components/SideUI";
import Accordion from "@/components/accordian";
import Link from "next/link";

type Props = {};

const SideBar = (props: Props) => {
  const signOutHandler = async () => {
    console.log("signing out");

    await signOut();
  };
  return (
    <div className=" bg-secondary text-[#FEF2EA] md:w-64 flex flex-row md:flex-col justify-between p-4 shadow-lg w-full items-center md:items-start">
      <div className="flex flex-col  justify-between  ">
        <Link href="/UserDashboard" className="text-2xl font-bold md:mb-4">
          TaskManager
        </Link>
        <ul className=" md:block hidden">
          <Accordion />
        </ul>
      </div>
      <div className=" md:block hidden">
        <Button size={"sm"} onClick={signOutHandler}>
          LogOut
        </Button>
      </div>
      <SideUi />
    </div>
  );
};

export default SideBar;
