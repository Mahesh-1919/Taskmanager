import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <header className="flex items-center h-16 px-4  text-white md:px-6 bg-secondary justify-between">
      <Link href="/" className="flex items-center gap-2 mr-4" prefetch={false}>
        <SunIcon className="w-5 h-5 fill-current" />
        <span className="font-semibold">Task Manager</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 ">
        <Link
          href="#home"
          className="font-medium text-sm hover:underline underline-offset-4"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="#services"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Services
        </Link>

        <Link
          href="#contact"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
      <div className=" flex gap-4">
        <Link href={"/login"}>
          <Button size="sm">Sign in</Button>
        </Link>
        <Link href={"/register"}>
          <Button size="sm">Sign Up</Button>
        </Link>
      </div>
    </header>
  );
}

function SunIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
