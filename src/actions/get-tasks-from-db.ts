"use server";
import { prisma } from "@/utils/prisma";

export const getTasksFromDB = async () => {
  try {
    const tasks = await prisma.tasks.findMany();

    if (!tasks) {
      return;
    }
    return tasks;
  } catch (error) {
    throw error;
  }
};
