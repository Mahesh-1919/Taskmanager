import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./LoadingSpinner";
import { Trash2, X, CheckCheck } from "lucide-react";
type Props = {
  name: string;
  id: string;
  deleteHandler: (id: string) => void;
  updateHandler: (id: string, isDone: boolean) => void;
  isDone: boolean;
  dueDate: Date;
};
export default function MyCard({
  name,
  id,
  deleteHandler,
  updateHandler,
  isDone,
  dueDate,
}: Props) {
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    setIsDelete(!isDelete);
    await deleteHandler(id);
    setIsDelete(!isDelete);
    console.log(id);
  };

  const handleUpdate = async (isDone: boolean, id: string) => {
    const res = await updateHandler(id, isDone);
  };
  return (
    <Card className="bg-[#262626]  border-none text-wrap  ">
      <CardContent className="py-2 flex justify-between  items-center gap-2">
        <div className="flex gap-2 items-center">
          <div
            onClick={() => handleUpdate(isDone, id)}
            className={cn({
              "text-green-500  cursor-pointer": isDone,
              "text-red-500 cursor-pointer": !isDone,
            })}
          >
            {isDone ? <CheckCheck /> : <X />}
          </div>
          <div className=" text-wrap   flex justify-between items-center  ">
            <p className="text-[#FEF2EA] ">{name}</p>

            {dueDate
              ? (() => {
                  const currentDate = new Date().toLocaleDateString();

                  const due = new Date(dueDate).toLocaleDateString();

                  if (currentDate > due) {
                    return (
                      <p className="bg-primary px-2 rounded-md text-center text-white mx-2  ">
                        Overdue
                      </p>
                    );
                  }
                })()
              : ""}
          </div>
        </div>

        <Button variant="outline" onClick={() => handleDelete(id)}>
          {isDelete ? <LoadingSpinner /> : <Trash2 size={20} />}
        </Button>
      </CardContent>
    </Card>
  );
}
