"use client";
import React from "react";
import { getTodayTasks } from "@/app/actions/action";
import { useQuery } from "react-query";

import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {};

const page = (props: Props) => {
  const { data, isLoading, isError } = useQuery(
    "todayTasks",
    async () => await getTodayTasks()
  );
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-[#FEF2EA] mr-2">Today</h1>
      <main className="flex  flex-col items-center   ">
        <div className="md:max-w-md  mt-6 w-full ">
          <ScrollArea className="h-[68vh] md:h-[70vh]  mt-4">
            <ul
              className="flex flex-col gap-2 justify-center overflow-auto
        "
            >
              {isLoading && <p className="text-white">Loading...</p>}
              {data?.map((task) => (
                <li className="text-white bg-secondary p-4  rounded-lg hover:bg-secondary/90">
                  {task.title}
                </li>
              ))}
              {isError && <h1 className="text-[#FEF2EA]">error</h1>}
            </ul>
          </ScrollArea>
        </div>
      </main>
    </>
  );
};

export default page;
