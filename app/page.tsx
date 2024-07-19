import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/navBar";
import Image from "next/image";

export default function Component() {
  return (
    <div className="min-h-screen overflow-auto w-full h-screen scroll-smooth">
      <div className="flex flex-col  text-white ">
        <NavBar />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 ">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Stay on top of your tasks with our Todo App
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Effortlessly manage your to-do lists, set reminders, and
                      collaborate with your team. Get things done with our
                      intuitive and feature-rich todo application.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      href="/register"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/login"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      SignIn
                    </Link>
                  </div>
                </div>
                <Image
                  src="/original.png"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last lg:aspect-square object-contain"
                />
              </div>
            </div>
          </section>
          <section
            className="w-full py-12 md:py-24 lg:py-32 bg-secondary"
            id="services"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Our Services
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Choose from a variety of services to help you stay organized
                  </p>
                </div>
              </div>
              <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Card className="bg-black border-none  ">
                  <Image
                    src="/Task.jpg"
                    alt="service"
                    width="550"
                    height="550"
                    className="rounded-t-lg object-cover bg-secondary"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-white">Quick Add</h3>
                    <p className="text-muted-foreground">
                      Quick add will quickly become your superpower. Capture and
                      organize tasks the moment they come to you with
                      easy-flowing, natural language. Recurring due dat
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black border-none">
                  <Image
                    src="/project.jpg"
                    alt="service"
                    width="550"
                    height="550"
                    className="rounded-t-lg object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-white">Projects</h3>
                    <p className="text-muted-foreground">
                      Projects give you a space to plan out your goals and keep
                      track of all areas of your work and life.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black border-none">
                  <Image
                    src="/filter.png"
                    width="550"
                    height="550"
                    alt="service"
                    className="rounded-t-lg object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-white">Filters</h3>
                    <p className="text-muted-foreground">
                      Filters let you create any view you like. For example, all
                      your p1 tasks due today or all the tasks labeled @waiting
                      in your “Work” project.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black border-none">
                  <Image
                    src="/today.jpg"
                    alt="service"
                    width="550"
                    height="550"
                    className="rounded-t-lg object-cover h-[57%]"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-white">Today</h3>
                    <p className="text-muted-foreground">
                      Today keeps you focused on just what&apos;s due today.
                      Enjoy the sweet satisfaction of hitting #TodoistZero when
                      the day done.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32" id="contact">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Get in Touch
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Have a question or want to learn more about our coaching
                    services? Fill out the form below and we&apos;ll get back to
                    you as soon as possible.
                  </p>
                </div>
                <form className="mx-auto w-full max-w-md space-y-4">
                  <Input type="text" placeholder="Name" className="w-full" />
                  <Input type="email" placeholder="Email" className="w-full" />
                  <Textarea placeholder="Message" className="w-full" />
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-secondary">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 Task Manager. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}

function GamepadIcon(props: any) {
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
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
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
