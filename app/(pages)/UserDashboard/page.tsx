"use client";
import React from "react";
import { getProjects } from "@/app/actions/action";
import { useEffect, useState } from "react";
import Link from "next/link";
import InputField from "@/components/InputField";
import { useQuery } from "react-query";

interface Project {
  id: string;
  name: string;
  userId: string;
}

function Projets() {
  const [projects, setProjects] = useState<Project[]>([]);

  const { data, isLoading, isError } = useQuery("projects", async () => {
    const response = await getProjects();

    return response;
  });

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-[#FEF2EA]">Projects</h1>
      <div className=" grid grid-cols-1 md:grid-cols-4 wrap gap-4 overflow-auto h-[80% grid-rows-12] ">
        <InputField setProjects={setProjects} />

        {isLoading ? (
          <h1 className="text-[#FEF2EA]">loading...</h1>
        ) : (
          projects?.map((project) => (
            <Link
              href="/UserDashboard/[projectId]"
              as={`/UserDashboard/${project.id}`}
              className="text-[#FEF2EA]"
              key={project.id}
            >
              <li
                key={project.id}
                className="list-none px-8 py-5  bg-[#262626] rounded-lg hover:bg-[#333333] text-wrap overflow-hidden  cursor-pointer  text-[#FEF2EA] text-center"
              >
                {project.name}
              </li>
            </Link>
          ))
        )}
      </div>
      {isError && (
        <div className=" text-red-500  text-lg py-1 px-3  mt-2">
          {"Network Error"}
        </div>
      )}
    </>
  );
}

export default Projets;
