import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
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
import { createProject } from "@/app/actions/action";
type DialogBoxProps = {
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};
interface Project {
  id: string;
  name: string;
  userId: string;
}

export default function DialogBox({ setProjects }: DialogBoxProps) {
  const [name, setName] = useState("");
  const [isFormLoading, setFormIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormIsLoading(true);
    const res: any = await createProject(name);

    setFormIsLoading(false);
    setIsOpen(false);

    setProjects((prev: any) => [...prev, res]);

    setName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="">
        <Button
          variant="outline"
          className="p-8 bg-white text-black rounded-lg border-none "
          onClick={() => setIsOpen(true)}
        >
          +Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-none text-white">
        <DialogHeader>
          <DialogTitle>Project</DialogTitle>
          <DialogDescription>Add your Project here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              className="col-span-3 "
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={submitHandler}>
              {isFormLoading ? <LoadingSpinner /> : "Add"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
