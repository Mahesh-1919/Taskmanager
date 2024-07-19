"use client";
import React, { useEffect, useState } from "react";
import {
  getData,
  deleteData,
  updateData,
  deleteProject,
} from "@/app/actions/action";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import DropDoown from "@/components/dropDown";
import ItemCard from "@/components/ItemCard";
import AddTask from "@/components/addTask";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "react-query";
import { Trash } from "lucide-react";

const ProjectTasks = () => {
  const { projectId }: any = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("NotCompleted");
  const [filterData, setFilterData] = useState<any[]>([]);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery(
    ["tasks", projectId],
    async () => {
      const response = await getData(projectId);
      return response;
    }
  );

  useEffect(() => {
    if (data) {
      setTasks(data);
      setFilterData(data);
    }
  }, [data]);

  const deleteHandler = async (id: string) => {
    await deleteData(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteProjects = async (projectId: string) => {
    await deleteProject(projectId);
    router.push("/UserDashboard");
  };

  const updateHandler = async (id: string, isDone: boolean) => {
    await updateData(id, isDone);
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const filterTasks = () => {
    let newTasks;
    if (filter === "All") {
      newTasks = tasks;
    } else if (filter === "Completed") {
      newTasks = tasks?.filter((task) => task.isDone === true);
    } else {
      newTasks = tasks?.filter((task) => task.isDone === false);
    }

    setFilterData(newTasks);
  };

  useEffect(() => {
    filterTasks();
  }, [tasks, filter]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4 text-[#FEF2EA] mr-2">Project</h1>

        <div className="gap-4 flex justify-between">
          <AddTask setTasks={setTasks} projectId={projectId} />
          <Button
            variant="destructive"
            onClick={() => deleteProjects(projectId)}
            className=""
          >
            <Trash size={20} />
            <span className="px-1 hidden md:block">DeleteProject</span>
          </Button>
        </div>
      </div>

      <main className="flex  flex-col items-center   ">
        <div className="md:max-w-md  mt-6 w-full ">
          <div className="flex justify-between">
            <h1 className="text-[#FEF2EA] text-center font-bold">TASKS</h1>
            <div className="text-white flex gap-4">
              <DropDoown filter={filter} setFilter={setFilter} />
            </div>
          </div>

          <ScrollArea className="h-[68vh] md:h-[70vh]  mt-4">
            <ul
              className="flex flex-col gap-2 justify-center overflow-auto
        "
            >
              {isLoading ? (
                <h1 className="text-[#FEF2EA]">loading...</h1>
              ) : (
                filterData?.map((task) => (
                  <ItemCard
                    key={task?.id}
                    name={task?.title}
                    id={task?.id}
                    deleteHandler={() => deleteHandler(task?.id)}
                    updateHandler={() => updateHandler(task.id, task?.isDone)}
                    isDone={task?.isDone}
                    dueDate={task?.dueDate}
                  />
                ))
              )}
              {isError && <h1 className="text-[#FEF2EA]">error</h1>}
            </ul>
          </ScrollArea>
        </div>
      </main>
    </>
  );
};

export default ProjectTasks;
