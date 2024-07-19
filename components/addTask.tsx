import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { create } from "@/app/actions/action";
type DialogBoxProps = {
  setTasks: React.Dispatch<React.SetStateAction<any>>;
  projectId: string;
};

export default function DialogBox({ projectId, setTasks }: DialogBoxProps) {
  const [isFormLoading, setFormIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [Task, setTask] = useState<string>("");
  const [dueDate, setDueDate] = useState("");
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormIsLoading(true);

    const res: any = await create(Task, projectId, new Date(dueDate));

    setFormIsLoading(false);

    setTasks((prev: any) => [...prev, res]);

    setTask("");
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="">
        <Button onClick={() => setIsOpen(true)}>
          <Plus />
          <span className="px-1 hidden md:block">Add Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-secondary border-none text-white ">
        <DialogHeader>
          <DialogTitle>Task</DialogTitle>
          <DialogDescription>Add your Task here</DialogDescription>
        </DialogHeader>
        <div className=" flex  flex-col gap-4 py-4">
          <div className="  gap-4">
            <Label htmlFor="name" className="text-right">
              ToDo
            </Label>
            <Input
              id="name"
              value={Task}
              className="col-span-3 "
              placeholder="Enter Task"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className=" w-[40%] self-end gap-4">
            <Label htmlFor="date" className="text-right">
              DueDate
            </Label>
            <Input
              id="date"
              type="date"
              className="col-span-3 "
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              type="submit"
              onClick={submitHandler}
              disabled={isFormLoading}
            >
              {isFormLoading ? <LoadingSpinner /> : "Add"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
