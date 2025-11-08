"use server";

import { prisma } from "@/utils/prisma";

export const updateTodo = async (idTask: string) => {
  const currentTask = await prisma.tasks.findUnique({
    where: { id: idTask },
  });

  if (!currentTask) {
    return;
  }

  const updateStatus = await prisma.tasks.update({
    where: { id: idTask },
    data: { done: !currentTask.done },
  });

  if (!updateStatus) {
    return;
  }
};
