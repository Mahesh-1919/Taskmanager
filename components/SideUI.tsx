import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";
import { useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Accordion from "@/components/accordian";

export default function Sidebar() {
  const { data: session, status } = useSession();

  const signOutHandler = async () => {
    const res: any = await signOut();
  };
  return (
    <Sheet key={"left"}>
      <SheetTrigger asChild>
        <Button className=" md:hidden block bg-inherit hover:bg-inherit">
          <Avatar />
          <span className="px-2 hidden md:block">Profile</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="border-none text-white flex flex-col bg-secondary"
      >
        <SheetHeader className="text-white ">
          <SheetTitle className="text-white text-md">
            {session?.user?.email}
          </SheetTitle>
        </SheetHeader>
        <Accordion />
        <Button onClick={signOutHandler}>LogOut</Button>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="text-white">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
