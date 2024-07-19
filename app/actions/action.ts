"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

export async function create(value: string, projectId: string, dueDate: Date) {
  if (!value) {
    return;
  }

  const res = await db.task.create({
    data: {
      title: value,
      isDone: false,
      projectId: projectId,
      dueDate: dueDate,
    },
  });

  revalidatePath("/");
  return res;
}

export async function getData(projectId: string) {
  const tasks = await db.task.findMany({
    where: {
      projectId: projectId,
    },
  });

  return tasks;
}

export async function deleteData(id: string) {
  await db.task.delete({
    where: {
      id: id,
    },
  });
}

export async function updateData(id: string, isDone: boolean) {
  const res = await db.task.update({
    where: {
      id: id,
    },
    data: {
      isDone: !isDone,
    },
  });
  return res;
}

export async function createProject(value: string) {
  const session: any = await getServerSession(authOptions);
  if (!value) {
    return;
  }

  const res: any = await db.project.create({
    data: {
      name: value,
      userId: session.user.id,
    },
  });

  revalidatePath("/");
  return res;
}

export async function getProjects() {
  const session: any = await getServerSession(authOptions);

  const projects = await db.project.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return projects;
}
export async function deleteProject(id: string) {
  await db.task.deleteMany({
    where: {
      projectId: id,
    },
  });

  await db.project.delete({
    where: {
      id: id,
    },
  });
}

export async function getTodayTasks() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00

  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1); // Get the next day

  const tasks = await db.task.findMany({
    where: {
      dueDate: {
        gte: currentDate,
        lt: nextDate,
      },
    },
  });

  return tasks;
}

export async function updatePassword(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const res = await db.user.update({
    where: {
      username: username,
    },
    data: {
      password: hashedPassword,
    },
  });
  return res;
}
