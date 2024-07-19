import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { getProjects } from "@/app/actions/action";
import Link from "next/link";
import { useQuery } from "react-query";
import { PanelsTopLeft, CalendarDays, Star, NotebookPen } from "lucide-react";

export default function AccordionDemo() {
  const [resData, setResData] = useState<any[]>([]);
  const [isOpened, setIsOpened] = useState(false);

  const { data, isLoading } = useQuery("projects", async () => {
    const response = await getProjects();
    return response;
  });

  useEffect(() => {
    if (data && isOpened) {
      setResData(data);
    }
  }, [data, isOpened]);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="" onClick={() => setIsOpened(!isOpened)}>
          <div className="flex gap-2 items-center">
            <PanelsTopLeft size={20} />
            <span>Projects</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {isLoading && <div>loading...</div>}
          {resData.map((data) => (
            <Link
              href="/UserDashboard/[projectId]"
              as={`/UserDashboard/${data.id}`}
              className="text-[#FEF2EA]"
              key={data.id}
            >
              <li
                key={data.id}
                className="list-none px-8 py-2  bg-[#262626] rounded-lg hover:bg-[#333333] text-wrap overflow-hidden  cursor-pointer  text-[#FEF2EA] "
              >
                {data.name}
              </li>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <div className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline ">
          <div className="flex gap-2 items-center">
            <Star size={20} />
            <Link href="/UserDashboard/Today">Today</Link>
          </div>
        </div>
      </AccordionItem>
      <AccordionItem value="item-3">
        <div className=" items-center justify-between py-4 font-medium transition-all hover:underline ">
          <div className="flex gap-2 items-center">
            <CalendarDays size={20} />
            <span>Calender</span>
          </div>
        </div>
      </AccordionItem>
      <AccordionItem value="item-3">
        <div className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline ">
          <Link href="/UserDashboard/Notes">
            <div className="flex gap-2 items-center">
              <NotebookPen size={20} />
              <span>Notes</span>
            </div>
          </Link>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
